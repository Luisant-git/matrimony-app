import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [lookingFor, setLookingFor] = useState('');
    const [profileFor, setProfileFor] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captchaStr = '';
        for (let i = 0; i < 5; i++) {
            captchaStr += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptcha(captchaStr);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phone)) {
            toast.error('Please enter a valid 10-digit phone number.');
            return;
        }
        
        if (captchaInput !== captcha) {
            toast.error('Invalid captcha. Please try again.');
            return;
        }
        
        if (!isAgreed) {
            toast.error('You must agree to the terms and conditions.');
            return;
        }
        
        setLoading(true);
        setMessage('');
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    number: phone,
                    email,
                    looking_For: lookingFor,
                    this_profile_for: profileFor,
                }),
            });

            if (response.ok) {
                toast.success('Registration successful!');
                setName('');
                setPhone('');
                setEmail('');
                setLookingFor('');
                setProfileFor('');
                setCaptchaInput('');
                generateCaptcha();
            } else {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.message || 'Registration failed'}`);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl w-full">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary text-center mb-4 sm:mb-6">Quick Registered</h3>

            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name / பெயர்</label>
                    <input 
                        type="text" 
                        placeholder="Enter Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm sm:text-base text-black" 
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number / தொலைபேசி எண்</label>
                    <input 
                        type="tel" 
                        placeholder="Enter phone number" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm sm:text-base text-black" 
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email / மின்னஞ்சல்</label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm sm:text-base text-black" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Looking For</label>
                    <select 
                        value={lookingFor}
                        onChange={(e) => setLookingFor(e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm sm:text-base ${lookingFor ? 'text-black' : 'text-gray-400'}`}
                        required
                    >
                        <option value="" className="text-gray-400">Choose Type</option>
                        <option value="Male" className="text-black">Male</option>
                        <option value="Female" className="text-black">Female</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">This Profile For</label>
                    <select 
                        value={profileFor}
                        onChange={(e) => setProfileFor(e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm sm:text-base ${profileFor ? 'text-black' : 'text-gray-400'}`}
                        required
                    >
                        <option value="" className="text-gray-400">Choose Type</option>
                        <option value="For Me" className="text-black">For Me</option>
                        <option value="For My Son" className="text-black">For My Son</option>
                        <option value="For My Daughter" className="text-black">For My Daughter</option>
                        <option value="For My Brother" className="text-black">For My Brother</option>
                        <option value="For My Sister" className="text-black">For My Sister</option>
                        <option value="For My Friend" className="text-black">For My Friend</option>
                        <option value="For My Relative" className="text-black">For My Relative</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Captcha: <span className="bg-primary text-white px-2 py-1 rounded">{captcha}</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter Captcha / கேப்ட்சாவை உள்ளிடவும்" 
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm sm:text-base text-black" 
                        required
                    />
                </div>
                <div className="flex items-start space-x-2">
                    <input 
                        type="checkbox" 
                        id="terms" 
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                        className="h-4 w-4 rounded text-primary focus:ring-primary border-gray-300 mt-1" 
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the Terms and Conditions
                        <span className="text-red-500 cursor-pointer" onClick={() => setShowModal(true)}>
                            click to view
                        </span>
                    </label>
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-primary text-white font-bold py-3 sm:py-4 rounded-lg hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg disabled:opacity-50 text-sm sm:text-base"
                >
                    {loading ? 'Registering...' : 'Get Started'}
                </button>
            </form>
            
            {/* Terms Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full">
                        <div className="flex justify-between items-center mb-4 p-4 border-b">
                            <h3 className="text-xl text-primary font-bold">Terms and Conditions</h3>
                            <button 
                                onClick={() => setShowModal(false)} 
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <h1 className="text-primary text-2xl font-bold mb-4">
                                Terms and Conditions Governing Membership
                            </h1>
                            <p className="text-black mb-2">
                                [Subject to revision by BMP from time to time]
                            </p>
                            <p className="text-black mb-2">
                                [Applicable for Paid and Free Services]
                            </p>
                            <p className="text-black mb-4">
                                DEAR USER: PLEASE READ THESE TERMS AND CONDITIONS BEFORE REGISTRATION.
                            </p>
                            <p className="text-black mb-4">
                                By registering on{" "}
                                <span className="text-primary font-semibold">Matrimonial.com</span>, you
                                explicitly understand and agree that:
                            </p>
                            <ul className="text-black mb-4 list-disc pl-6">
                                <li className="mb-2">
                                    The minimum age for registering is{" "}
                                    <span className="text-primary font-semibold">18 years for women</span> and{" "}
                                    <span className="text-primary font-semibold">21 years for men</span>.
                                </li>
                                <li className="mb-2">
                                    You are not disabled by any law from entering into a contract.
                                </li>
                                <li className="mb-2">
                                    You have gone through the Terms and Conditions and agree to be
                                    bound by them.
                                </li>
                            </ul>

                            <h2 className="text-primary text-xl font-bold mb-3">Conditions of Use:</h2>
                            <p className="text-black mb-4">
                                Welcome to{" "}
                                <span className="text-primary font-semibold">Matrimonial.com</span>.
                                <span className="text-primary font-semibold">Matrimonial.com</span> and its
                                affiliates provide their services to you subject to the following
                                conditions. If you visit or sign up at{" "}
                                <span className="text-primary font-semibold">Matrimonial.com</span>, you
                                accept these conditions. Please read them carefully.
                            </p>

                            <h2 className="text-primary text-xl font-bold mb-3">Privacy:</h2>
                            <p className="text-black mb-4">
                                Please review our{" "}
                                <span className="text-primary font-semibold">Privacy Notice</span>, which also
                                governs your visit to{" "}
                                <span className="text-primary font-semibold">Matrimonial.com</span>, to
                                understand our practices. Members agree that their profile(s) may
                                be crawled and indexed by search engines, where{" "}
                                <span className="text-primary font-semibold">Matrimonial.com</span> and its
                                network does not have any control over the search engines'
                                behavior.
                            </p>

                            <h2 className="text-primary text-xl font-bold mb-3">Communications</h2>
                            <p className="text-black mb-4">
                                When you visit{" "}
                                <span className="text-primary font-semibold">Matrimonial.com</span> or send
                                e-mails to us, you are communicating with us electronically. You
                                consent to receive communications from us electronically. We will
                                communicate with you by e-mail or by posting notices on this site.
                            </p>

                            <h2 className="text-primary text-xl font-bold mb-3">Your Account</h2>
                            <p className="text-black mb-4">
                                If you use or register on this site, you are responsible for
                                maintaining the confidentiality of your account and password and
                                for restricting access to your computer. You agree to accept
                                responsibility for all activities that occur under your account or
                                password.
                            </p>

                            <h2 className="text-primary text-xl font-bold mb-3">Membership</h2>
                            <p className="text-black mb-2">
                                Membership is not automatic: The right of admission is vested with{" "}
                                <span className="text-primary font-semibold">Matrimonial.com</span>.
                            </p>
                            <p className="text-black mb-4">
                                You become a member upon due acceptance of the Profile/Payment by{" "}
                                <span className="text-primary font-semibold">Matrimonial.com</span>.
                            </p>
                            <ul className="text-black mb-4 list-disc pl-6">
                                <li className="mb-2">
                                    Membership is valid for{" "}
                                    <span className="text-primary font-semibold">45, 90, or 180 days</span> based on
                                    the plan chosen.
                                </li>
                                <li className="mb-2">
                                    Your membership is personal and cannot be assigned, transferred,
                                    or licensed to anyone else.
                                </li>
                            </ul>

                            <h2 className="text-primary text-xl font-bold mb-3">Online Conduct:</h2>
                            <p className="text-black mb-4">
                                You are responsible for the content and information [including
                                profile and photograph] you post or transmit using{" "}
                                <span className="text-primary font-semibold">Matrimonial.com's</span>{" "}
                                services.
                            </p>
                            <p className="text-black mb-4">
                                You will not post or transmit any content that is defamatory,
                                abusive, obscene, or in violation of the rights of any person,
                                including intellectual property rights.
                            </p>
                        </div>
                        <div className="p-4 border-t bg-gray-50">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                            >
                                Close 
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistrationForm;