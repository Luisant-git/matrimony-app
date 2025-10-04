import React, { useState } from 'react';
import { userAPI } from '../utils/api';
import { encryptToken } from '../utils/auth';
import { useAuth } from '../context/AuthContext';
import LoginPageImage from '../assets/login.png';

const EyeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .847 0 1.673.124 2.468.352M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a9.94 9.94 0 01-1.612 5.21M4 4l16 16" />
    </svg>
);

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await userAPI.login(mobileNo, password);
            localStorage.setItem('token', response.access_token);
            login(response.user, response.access_token);
            window.location.reload();
        } catch (err) {
            setError('Invalid mobile number or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                    {/* Form Section */}
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Login</h2>
                        <form className="space-y-6" onSubmit={handleLogin}>
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                                    Mobile Number
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="mobile"
                                        name="mobile"
                                        type="tel"
                                        autoComplete="tel"
                                        required
                                        value={mobileNo}
                                        onChange={(e) => setMobileNo(e.target.value)}
                                        placeholder="Enter mobile number"
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password"className="text-sm font-medium text-gray-700">
                                    Enter your Password
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={passwordVisible ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Type your password here"
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                    >
                                        {passwordVisible ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me?
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-primary hover:text-primary-dark">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Image Section */}
                    <div className="hidden md:block">
                        <img
                            className="w-full h-full object-cover"
                            src={LoginPageImage}
                            alt="Romantic setting with candles and a rose"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;