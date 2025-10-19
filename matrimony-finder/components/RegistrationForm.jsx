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
    const [showModal, setShowModal] = useState(false);
    const [isBlinking, setIsBlinking] = useState(true);

    const BLINK_PERIOD_MS = 10 * 1000; // 10 seconds blinking
    const FAST_BLINK_INTERVAL_MS = 500; // 0.5s blink speed

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

    // Stop blinking after 10 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsBlinking(false);
        }, BLINK_PERIOD_MS);

        return () => clearTimeout(timer);
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

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/registration`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            {/* Inline CSS for fast blinking */}
            <style>{`
                @keyframes fastBlink {
                    0% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .fast-blink {
                    animation: fastBlink ${FAST_BLINK_INTERVAL_MS}ms steps(1, end) infinite;
                }
            `}</style>

            {/* Heading */}
            <div className="text-center mb-4 sm:mb-6">
                <h3
                    className={`text-lg sm:text-xl md:text-2xl font-extrabold transition-transform duration-150 ${
                        isBlinking ? 'fast-blink text-red-600 scale-105' : 'text-primary scale-100'
                    }`}
                >
                    Quick Register in 10 Seconds
                </h3>

                {/* Slightly bolder Tamil text */}
                <div
                    className={`text-sm sm:text-xs md:text-sm mt-1 font-semibold ${
                        isBlinking ? 'fast-blink text-red-600' : 'text-gray-700'
                    }`}
                >
                    10 வினாடிகளில் இங்கே விரைவாகப் பதிவு செய்யுங்கள்
                </div>

                {/* Yellow downward finger icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto mt-2 w-6 h-6 text-yellow-400 animate-bounce"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2C12 1.44772 12.4477 1 13 1C13.5523 1 14 1.44772 14 2V13.5858L16.2929 11.2929C16.6834 10.9024 17.3166 10.9024 17.7071 11.2929C18.0976 11.6834 18.0976 12.3166 17.7071 12.7071L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071L6.29289 12.7071C5.90237 12.3166 5.90237 11.6834 6.29289 11.2929C6.68342 10.9024 7.31658 10.9024 7.70711 11.2929L10 13.5858V2Z"/>
                </svg>
            </div>

            {/* Form */}
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
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm sm:text-base ${
                            lookingFor ? 'text-black' : 'text-gray-400'
                        }`}
                        required
                    >
                        <option value="">Choose Type</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">This Profile For</label>
                    <select
                        value={profileFor}
                        onChange={(e) => setProfileFor(e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm sm:text-base ${
                            profileFor ? 'text-black' : 'text-gray-400'
                        }`}
                        required
                    >
                        <option value="">Choose Type</option>
                        <option value="For Me">For Me</option>
                        <option value="For My Son">For My Son</option>
                        <option value="For My Daughter">For My Daughter</option>
                        <option value="For My Brother">For My Brother</option>
                        <option value="For My Sister">For My Sister</option>
                        <option value="For My Friend">For My Friend</option>
                        <option value="For My Relative">For My Relative</option>
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
                        I agree to the Terms and Conditions{' '}
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
        </div>
    );
};

export default RegistrationForm;
