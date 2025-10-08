import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../utils/api';

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const RasiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const NatchathiramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const WishlistPage = ({ onNavigateToProfile, onNavigateToLogin }) => {
    const [wishlistProfiles, setWishlistProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const wishlistData = await userAPI.getWishlist(user.userId);
                
                // Fetch full profile data for each wishlist item
                const profilePromises = wishlistData.map(async (item) => {
                    try {
                        const profileData = await userAPI.getUser(item.profileId);
                        return { ...profileData, wishlistId: item.id };
                    } catch (error) {
                        console.error(`Failed to fetch profile ${item.profileId}:`, error);
                        return null;
                    }
                });

                const profiles = await Promise.all(profilePromises);
                setWishlistProfiles(profiles.filter(profile => profile !== null));
            } catch (error) {
                console.error('Failed to fetch wishlist:', error);
                setError('Failed to load wishlist');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [user]);

    const removeFromWishlist = async (profileId) => {
        try {
            await userAPI.removeFromWishlist(user.userId, profileId);
            setWishlistProfiles(prev => prev.filter(profile => profile.userId !== profileId));
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
        }
    };

    if (!user) {
        return (
            <div className="bg-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
                    <p className="text-gray-600 mb-6">You need to login to view your wishlist</p>
                    <button 
                        onClick={onNavigateToLogin}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-primary text-lg">Loading your saved list...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-red-600 text-lg">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Saved Profiles</h1>
                
                {wishlistProfiles.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg mb-4">Your wishlist is empty</div>
                        <p className="text-gray-400 mb-6">Start exploring profiles and save the ones you like!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {wishlistProfiles.map((profile) => (
                            <div key={profile.userId} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                                <div className="relative">
                                    <img 
                                        src={profile.userProfile?.[0] || 'https://picsum.photos/400/600'} 
                                        alt={profile.fullName}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="font-bold text-lg">{profile.fullName}</p>
                                        <p className="text-sm opacity-90">{calculateAge(profile.dateOfBirth)} Yr</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromWishlist(profile.userId)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                        title="Remove from wishlist"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-4 space-y-3">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <RasiIcon />
                                        <span>{profile.jathagam?.[0]?.rasi || 'Not specified'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <NatchathiramIcon />
                                        <span>{profile.jathagam?.[0]?.natchathiram || 'Not specified'}</span>
                                    </div>
                                    <button 
                                        onClick={() => onNavigateToProfile(profile.userId)}
                                        className="w-full mt-2 bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition-colors shadow"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;