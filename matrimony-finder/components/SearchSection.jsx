import React, { useState, useEffect } from 'react';
import { userAPI } from '../utils/api';
import { filterAPI } from '../utils/filterAPI';
import FilterComponent from './FilterComponent';

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

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);



const ProfileCard = ({ profile, onNavigate }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
            <div className="relative">
                <img src={profile.img} alt={profile.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-white font-bold text-lg">{profile.name}</p>
            </div>
            <div className="p-4 space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                    <CalendarIcon />
                    <span>{profile.dob}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                    <LocationIcon />
                    <span>{profile.location}</span>
                </div>
                <button 
                    onClick={onNavigate}
                    className="w-full mt-2 bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition-colors shadow"
                >
                    View Profile
                </button>
            </div>
        </div>
    );
};

const SearchSection = ({ onNavigateToProfile }) => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentFilters, setCurrentFilters] = useState({});
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetchProfiles();
    }, [currentFilters]);

    const fetchProfiles = async () => {
        setLoading(true);
        try {
            // Check if any filters are applied
            const hasFilters = Object.values(currentFilters).some(value => 
                value && (Array.isArray(value) ? value.length > 0 : true)
            );
            
            let data;
            if (hasFilters) {
                data = await filterAPI.getFilteredUsers(currentFilters, 1, 6);
            } else {
                data = await userAPI.getAllUsers();
            }
            
            const profileData = Array.isArray(data) ? data : data.users || data;
            setProfiles(profileData);
        } catch (error) {
            console.error('Failed to fetch profiles:', error);
            setProfiles([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filters) => {
        setCurrentFilters(filters);
    };

    if (loading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-primary text-lg">Loading profiles...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold">Search Results your <span className="text-primary">Perfect partner</span> here</h2>
                     <p className="text-gray-500 mt-2">Hand picks that matches your profile</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <FilterComponent onFilterChange={handleFilterChange} />
                    <div className="w-full lg:w-3/4">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {(showAll ? profiles : profiles.slice(0, 6)).map((profile, index) => (
                                <ProfileCard key={profile.userId || index} profile={{
                                    name: profile.fullName,
                                    dob: profile.dateOfBirth,
                                    location: profile.district,
                                    img: profile.userProfile?.[0] || 'https://picsum.photos/400/600'
                                }} onNavigate={() => onNavigateToProfile(profile.userId || profile.id)} />
                            ))}
                        </div>
                        {profiles.length > 6 && (
                            <div className="text-center mt-12">
                                <button 
                                    onClick={() => setShowAll(!showAll)}
                                    className="text-primary font-semibold hover:underline text-lg"
                                >
                                    {showAll ? 'View Less' : 'View More'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchSection;