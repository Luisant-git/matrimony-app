import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const UserRegistrationPage = ({ onNavigateToLogin }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNo: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: 'MALE',
        dateOfBirth: '',
        birthTime: '',
        birthPlace: '',
        education: '',
        job_type: '',
        job: '',
        organization: '',
        height: '',
        weight: '',
        color: '',
        income: '',
        maritalStatus: 'SINGLE',
        ownHouse: 'true',
        communityId: '',
        casteId: '',
        subCasteId: '',
        kulamId: '',
        kothiramId: '',
        address: '',
        district: '',
        state: ''
    });

    const [profileImages, setProfileImages] = useState([]);
    const [communityData, setCommunityData] = useState([]);
    const [casteData, setCasteData] = useState([]);
    const [subCasteData, setSubCasteData] = useState([]);
    const [kulamData, setKulamData] = useState([]);
    const [kothiramData, setKothiramData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
        'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
        'Ladakh', 'Lakshadweep', 'Puducherry', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu'
    ];

    useEffect(() => {
        fetchDropdownData();
    }, []);

    const fetchDropdownData = async () => {
        try {
            const [communities, castes, subCastes, kulams, kothirams] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/community`).then(res => res.json()),
                fetch(`${import.meta.env.VITE_API_URL}/caste`).then(res => res.json()),
                fetch(`${import.meta.env.VITE_API_URL}/sub-caste`).then(res => res.json()),
                fetch(`${import.meta.env.VITE_API_URL}/kulams`).then(res => res.json()),
                fetch(`${import.meta.env.VITE_API_URL}/kothirams`).then(res => res.json())
            ]);
            
            console.log('API Data:', { 
                communities: communities?.length || 'not array', 
                castes: castes?.length || 'not array', 
                subCastes: subCastes?.length || 'not array',
                subCastesStructure: subCastes?.[0] || 'empty',
                kulams: kulams?.length || 'not array', 
                kothirams: kothirams?.length || 'not array' 
            });
            setCommunityData(Array.isArray(communities) ? communities : []);
            setCasteData(Array.isArray(castes) ? castes : []);
            setSubCasteData(Array.isArray(subCastes) ? subCastes : []);
            setKulamData(Array.isArray(kulams) ? kulams : []);
            setKothiramData(Array.isArray(kothirams) ? kothirams : []);
        } catch (error) {
            toast.error('Failed to load dropdown data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            
            // Reset dependent dropdowns when parent changes
            if (name === 'communityId') {
                newData.casteId = '';
                newData.subCasteId = '';
                newData.kulamId = '';
                newData.kothiramId = '';
            } else if (name === 'casteId') {
                newData.subCasteId = '';
                newData.kulamId = '';
                newData.kothiramId = '';
            } else if (name === 'subCasteId') {
                newData.kulamId = '';
                newData.kothiramId = '';
            } else if (name === 'kulamId') {
                newData.kothiramId = '';
            }
            
            return newData;
        });
    };

    const compressImage = (file, maxWidth = 800, quality = 0.7) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            
            img.src = URL.createObjectURL(file);
        });
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        for (const file of files) {
            const compressedImage = await compressImage(file);
            setProfileImages(prev => [...prev, compressedImage]);
        }
    };

    const removeProfileImage = (index) => {
        setProfileImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        
        try {
            // Generate registration number
            const regNo = `R${Math.floor(Math.random() * 9000) + 1000}`;
            
            // Remove confirmPassword and convert data types
            const { confirmPassword, ...dataToSend } = formData;
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...dataToSend,
                    ownHouse: dataToSend.ownHouse === 'true',
                    height: parseFloat(dataToSend.height),
                    weight: parseFloat(dataToSend.weight),
                    userProfile: profileImages,
                    regNo,
                    profile: 'user'
                }),
            });

            if (response.ok) {
                toast.success('Registration successful! Please login to continue.');
                // Reset form
                setFormData({
                    fullName: '', mobileNo: '', email: '', password: '', confirmPassword: '',
                    gender: 'MALE', dateOfBirth: '', birthTime: '', birthPlace: '',
                    education: '', job_type: '', job: '', organization: '',
                    height: '', weight: '', color: '', income: '',
                    maritalStatus: 'SINGLE', ownHouse: 'true',
                    communityId: '', casteId: '', subCasteId: '', kulamId: '', kothiramId: '',
                    address: '', district: '', state: ''
                });
                setProfileImages([]);
                // Redirect to login page after successful registration
                onNavigateToLogin();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Registration failed');
            }
        } catch (error) {
            toast.error('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const filteredCastes = Array.isArray(casteData) ? casteData.filter(caste => caste.communityId === formData.communityId) : [];
    const filteredSubCastes = Array.isArray(subCasteData) ? subCasteData.filter(subCaste => subCaste.CasteId === formData.casteId) : [];
    const filteredKulams = Array.isArray(kulamData) ? kulamData.filter(kulam => kulam.subCasteId === formData.subCasteId) : [];
    const filteredKothirams = Array.isArray(kothiramData) ? kothiramData.filter(kothiram => kothiram.kulamId === formData.kulamId) : [];
    
    console.log('Filtered Data:', {
        selectedCasteId: formData.casteId,
        subCasteDataLength: subCasteData.length,
        subCasteDataSample: subCasteData.slice(0, 2),
        filteredSubCastesLength: filteredSubCastes.length
    });

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-center text-primary mb-8">Create Your Profile</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                                <input
                                    type="tel"
                                    name="mobileNo"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Enter mobile number"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Enter email address"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                                <div className="relative">
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="Enter password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className="absolute right-3 top-3 text-gray-500"
                                    >
                                        {passwordVisible ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                                <div className="relative">
                                    <input
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="Confirm password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                        className="absolute right-3 top-3 text-gray-500"
                                    >
                                        {confirmPasswordVisible ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Profile Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Images</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            {profileImages.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-4">
                                    {profileImages.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image}
                                                alt={`Preview ${index + 1}`}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeProfileImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Birth Details */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Birth Time *</label>
                                <input
                                    type="time"
                                    name="birthTime"
                                    value={formData.birthTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Birth Place *</label>
                                <input
                                    type="text"
                                    name="birthPlace"
                                    value={formData.birthPlace}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Enter birth place"
                                />
                            </div>
                        </div>

                        {/* Education & Career */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Education *</label>
                            <textarea
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Enter your education details"
                            />
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                                <select
                                    name="job_type"
                                    value={formData.job_type}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="">Select Job Type</option>
                                    <option value="Govt">Government</option>
                                    <option value="Private">Private</option>
                                    <option value="Business">Business</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Job *</label>
                                <input
                                    type="text"
                                    name="job"
                                    value={formData.job}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Enter job title"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Organization *</label>
                                <input
                                    type="text"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Enter organization name"
                                />
                            </div>
                        </div>

                        {/* Physical Details */}
                        <div className="grid md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Height (ft) *</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., 5.5"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., 65.5"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
                                <select
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="">Select Color</option>
                                    <option value="fair">Fair</option>
                                    <option value="light_brown">Light Brown</option>
                                    <option value="medium_brown">Medium Brown</option>
                                    <option value="dark_brown">Dark Brown</option>
                                    <option value="black">Black</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Income *</label>
                                <input
                                    type="text"
                                    name="income"
                                    value={formData.income}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Monthly income"
                                />
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status *</label>
                                <select
                                    name="maritalStatus"
                                    value={formData.maritalStatus}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="SINGLE">Single</option>
                                    <option value="MARRIED">Married</option>
                                    <option value="DIVORCED">Divorced</option>
                                    <option value="OTHERS">Others</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Own House *</label>
                                <select
                                    name="ownHouse"
                                    value={formData.ownHouse}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>

                        {/* Community Details */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Community *</label>
                                <select
                                    name="communityId"
                                    value={formData.communityId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="">Select Community</option>
                                    {communityData.map((community) => (
                                        <option key={community.communityId} value={community.communityId}>
                                            {community.communityName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Caste *</label>
                                <select
                                    name="casteId"
                                    value={formData.casteId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="">Select Caste</option>
                                    {filteredCastes.map((caste) => (
                                        <option key={caste.casteId} value={caste.casteId}>
                                            {caste.casteName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Porvikam {subCasteData.length === 0 ? '(No data available)' : '*'}</label>
                                <select
                                    name="subCasteId"
                                    value={formData.subCasteId}
                                    onChange={handleChange}
                                    required={subCasteData.length > 0}
                                    disabled={subCasteData.length === 0}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
                                >
                                    <option value="">{subCasteData.length === 0 ? 'No data available' : 'Select Porvikam'}</option>
                                    {filteredSubCastes.map((subCaste) => (
                                        <option key={subCaste.subCasteId} value={subCaste.subCasteId}>
                                            {subCaste.SubCasteName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kulam {kulamData.length === 0 ? '(No data available)' : '*'}</label>
                                <select
                                    name="kulamId"
                                    value={formData.kulamId}
                                    onChange={handleChange}
                                    required={kulamData.length > 0}
                                    disabled={kulamData.length === 0}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
                                >
                                    <option value="">{kulamData.length === 0 ? 'No data available' : 'Select Kulam'}</option>
                                    {filteredKulams.map((kulam) => (
                                        <option key={kulam.kulamId} value={kulam.kulamId}>
                                            {kulam.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kothiram {kothiramData.length === 0 ? '(No data available)' : '*'}</label>
                                <select
                                    name="kothiramId"
                                    value={formData.kothiramId}
                                    onChange={handleChange}
                                    required={kothiramData.length > 0}
                                    disabled={kothiramData.length === 0}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
                                >
                                    <option value="">{kothiramData.length === 0 ? 'No data available' : 'Select Kothiram'}</option>
                                    {filteredKothirams.map((kothiram) => (
                                        <option key={kothiram.kothiramId} value={kothiram.kothiramId}>
                                            {kothiram.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Enter your address"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Enter district"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="">Select State</option>
                                    {indianStates.map((state, index) => (
                                        <option key={index} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 space-y-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Creating Profile...' : 'Create Profile'}
                            </button>
                            
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={onNavigateToLogin}
                                        className="font-medium text-primary hover:text-primary-dark"
                                    >
                                        Login here
                                    </button>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserRegistrationPage;