import React from 'react';
import SearchSection from './SearchSection';

const FilterTestPage = () => {
    const handleNavigateToProfile = () => {
        console.log('Navigate to profile clicked');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Matrimony Profile Filter Demo
                </h1>
                <SearchSection onNavigateToProfile={handleNavigateToProfile} />
            </div>
        </div>
    );
};

export default FilterTestPage;