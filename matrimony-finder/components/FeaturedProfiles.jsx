import React, { useState, useEffect } from "react";
import { userAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const HeartIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    fill={className?.includes('fill-current') ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

const ChatIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const FeaturedProfiles = ({ onNavigateToProfile }) => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await userAPI.getAllUsers();
        const formattedProfiles = data.slice(0, 7).map((user) => ({
          id: user.userId || user.id,
          name: user.fullName,
          age:
            new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear(),
          img: user.userProfile?.[0] || "https://picsum.photos/400/600",
        }));
        setProfiles(formattedProfiles);
        
        // Fetch wishlist if user is logged in
        if (user) {
          try {
            const wishlist = await userAPI.getWishlist(user.userId);
            setWishlistItems(new Set(wishlist.map(item => item.profileId)));
          } catch (error) {
            console.error('Failed to fetch wishlist:', error);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [user]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? profiles.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === profiles.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleWhatsAppContact = (profileName) => {
    const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE;
    const message = `Hi, I'm interested in the profile of ${profileName}`;
    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleWishlistToggle = async (profileId) => {
    if (!user) return;
    
    try {
      if (wishlistItems.has(profileId)) {
        await userAPI.removeFromWishlist(user.userId, profileId);
        setWishlistItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(profileId);
          return newSet;
        });
      } else {
        await userAPI.addToWishlist(user.userId, profileId);
        setWishlistItems(prev => new Set([...prev, profileId]));
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-primary text-lg">
            Loading featured profiles...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Match, connect,{" "}
          <span className="text-primary">and let the magic</span> happen.
        </h2>
        <p className="text-gray-500 mt-2">
          Hand picks that matches your profile
        </p>

        <div className="mt-12 relative">
          <div className="flex items-center justify-center space-x-2 md:space-x-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex-grow w-full max-w-5xl overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: window.innerWidth >= 1024 
                    ? `translateX(calc(-${currentIndex * 20}% + 40% - 10%))` 
                    : `translateX(-${currentIndex * 50}%)`,
                }}
              >
                {profiles.map((profile, index) => (
                  <div
                    key={index}
                    className="w-1/2 md:w-1/4 lg:w-1/5 flex-shrink-0 px-2"
                  >
                    <div
                      className={`relative rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer ${
                        currentIndex === index
                          ? "transform scale-105"
                          : "opacity-70"
                      }`}
                      onClick={() =>
                        onNavigateToProfile && onNavigateToProfile(profile.id)
                      }
                    >
                      <img
                        src={profile.img}
                        alt={profile.name}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h4 className="font-bold text-lg">{profile.name}</h4>
                        <p className="text-sm">{profile.age} Yrs</p>
                      </div>

                      <div
                        className={`absolute bottom-16 right-4 flex flex-col space-y-3 transition-opacity duration-300 ${
                          currentIndex === index ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsAppContact(profile.name);
                          }}
                          className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
                        >
                          <ChatIcon />
                        </button>
                        {user && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWishlistToggle(profile.id);
                            }}
                            className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors"
                          >
                            <HeartIcon className={wishlistItems.has(profile.id) ? 'fill-current text-black' : ''} />
                          </button>
                        )}
                      </div>

                      {currentIndex === index && (
                        <div className="absolute inset-0 border-4 border-primary rounded-3xl pointer-events-none"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center items-center mt-8 space-x-2">
            {profiles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "w-6 bg-primary" : "w-2 bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
          {/* <a
            href="#"
            className="mt-8 inline-block text-primary font-semibold hover:underline"
          >
            View all
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfiles;
