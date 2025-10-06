import React, { useState, useEffect } from "react";
import { userAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "./ProfilePage.css";
import breadcrumbImage from "../assets/breadcrumb.png";

const ProfileHero = () => (
  <section
    className="relative bg-cover bg-center py-20"
    style={{ backgroundImage: `url(${breadcrumbImage})` }}
  >
    <div className="absolute inset-0 bg-black/60"></div>
    <div className="container mx-auto px-4 relative">
      <h1 className="text-4xl font-bold text-white">Profile Details</h1>
      <p className="text-gray-300 mt-1">Home / Details</p>
    </div>
  </section>
);

const StatsBar = () => {
  const stats = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      value: "145",
      label: "Happy Client",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      value: "215",
      label: "Platform Today",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
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
      ),
      value: "745",
      label: "Connecting Hearts",
    },
  ];

  return (
    <section className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-700">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-center space-x-4 py-8"
            >
              {stat.icon}
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProfileDetailsSection = ({ userData }) => {
  if (!userData) return null;

  const detailsLeft = {
    "முழு பெயர்": userData.fullName,
    பாலினம்: userData.gender,
    "பிறந்த தேதி": userData.dateOfBirth,
    முகவரி: userData.address,
    மாநிலம்: userData.state,
  };
  const detailsRight = {
    மாவட்டம்: userData.district,
    கல்வி: userData.education,
    வேலை: userData.job,
    வருவாய்: userData.income,
    "Marital Status": userData.maritalStatus,
    "சொந்த வீடு": userData.ownHouse ? "Yes / ஆம்" : "No / இல்லை",
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Profile Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
        <div>
          {Object.entries(detailsLeft).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-700">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <div>
          {Object.entries(detailsRight).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-700">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactInfoSection = ({
  userData,
  isLoggedIn,
  onLogin,
  onSave,
  isSaved,
}) => {
  if (!userData) return null;

  const siblings = userData.siblings || [
    { name: "Not specified", gender: "MALE" },
  ];
  const jathagam = userData.jathagam || [
    {
      rasi: "kanni",
      natchathiram: "ashwini",
      lagnam: "ashwini",
      dosham: "chandra_dosham",
    },
  ];

  // translation maps from API code -> Tamil / English labels
  const rasiMap = {
    mesham: "மேஷம்",
    rishabam: "ரிஷபம்",
    mithunam: "மிதுனம்",
    karakam: "கரகம்",
    simam: "சிம்மம்",
    kanni: "கன்னி",
    thulam: "துலாம்",
    viruchikam: "விருச்சிகம்",
    dhanusu: "தனுசு",
    makaram: "மகரம்",
    kumbam: "கும்பம்",
    meenam: "மீனம்",
  };

  const natchathiramMap = {
    ashwini: "ஆஸ்வினி",
    bharani: "பரணி",
    krittika: "கிருத்திகா",
    rohini: "ரோகிணி",
    mrugashira: "மிருகசீரிடம்",
    ardra: "ஆரத்ரா",
    punarvasu: "புனர்வசு",
    pushya: "புஷ்யம்",
    ashle_sha: "ஆஸ்லேஷா",
    aslesha: "ஆஸ்லேஷா",
    magha: "மகா",
    purvaphalguni: "பூர்வபால்குனி",
    uthraphalguni: "உத்திரபால்குனி",
    hasta: "ஹஸ்தா",
    chitra: "சித்திரா",
    swati: "சுவாதி",
    vishakha: "விஷாக்கா",
    anuradha: "அனுராதா",
    jyeshtha: "ஜ்யேஷ்டா",
    moola: "மூலா",
    purvashadha: "பூர்வாசாதா",
    uthrashadha: "உத்திராசாதா",
    shravana: "சரவணா",
    dhanishta: "தனிஷ்டா",
    shatabhisha: "ஷடபிஷா",
    purvabhadrapada: "பூர்வபாத்ரபடா",
    uthrabhadrapada: "உத்திரபாத்ரபடா",
    revati: "ரேவதி",
  };

  const lagnamMap = {
    ashwini: "அஸ்வினி",
    bharani: "பரணி",
    krittika: "கிருத்திகை",
    rohini: "ரோகிணி",
    mrigashira: "மிருகசீரிடம்",
    ardra: "திருவாதிரை",
    punarvasu: "புனர்பூசம்",
    pushya: "பூசம்",
    ashle_sha: "ஆயில்யம்",
    aslesha: "ஆயில்யம்",
    magha: "மகம்",
    purvaphalguni: "பூரம்",
    uttaraphalguni: "உத்திரம்",
    hasta: "அஸ்தம்",
    chitra: "சித்திரை",
    swati: "சுவாதி",
    vishakha: "விசாகம்",
    anuradha: "அனுஷம்",
    jyeshta: "ஜேஷ்டா",
    moola: "மூலம்",
    purvashadha: "பூராடம்",
    uttarashadha: "உத்திராடம்",
    shravana: "திருவோணம்",
    dhanishta: "அவிட்டம்",
    shatabhisha: "சதயம்",
    purvabhadrapada: "பூரட்டாதி",
    uttarabhadrapada: "உத்திரட்டாதி",
    revati: "ரேவதி",
  };

  const doshamMap = {
    ketu_dosham: "கேது தோஷம்",
    manglik_dosham: "மாங்கலிக தோஷம்",
    pitra_dosham: "பித்ர தோஷம்",
    nadi_dosham: "நாதி தோஷம்",
    kalathra_dosham: "கலத்ரா தோஷம்",
    rahu_dosham: "ராகு தோஷம்",
    shani_dosham: "சனி தோஷம்",
    brahma_dosham: "பிரம்மா தோஷம்",
    yoni_dosham: "யோனி தோஷம்",
    chandra_dosham: "சந்திர தோஷம்",
    sarpadosham: "சர்ப்ப தோஷம்",
    putra_dosham: "புத்திர தோஷம்",
  };

  const translateRasi = (code) => rasiMap[code] || code || "";
  const translateNatchathiram = (code) => natchathiramMap[code] || code || "";
  const translateLagnam = (code) => lagnamMap[code] || code || "";
  const translateDosham = (code) => doshamMap[code] || code || "";

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg">
      <h3 className="text-xl font-bold text-primary mb-1">கூடுதல் விவரங்கள்</h3>

      <div className="blur-content-wrapper">
        {!isLoggedIn && (
          <div className="warning-overlay">
            <span className="warning-icon">⚠️</span>
            Please log in to view this content.
            <button className="btn-danger" onClick={onLogin}>
              Log In
            </button>
          </div>
        )}

        <div className={!isLoggedIn ? "blur-content" : ""}>
          <h4 className="text-lg font-semibold mt-4 mb-3">உடன்பிறந்தவர்கள்</h4>
          <ul className="space-y-2">
            {siblings.map((sibling, index) => (
              <li key={index} className="border-b pb-2">
                <p>
                  <strong>பெயர்:</strong> {sibling.name}
                </p>
                <p>
                  <strong>பாலினம்:</strong>{" "}
                  {sibling.gender === "MALE" ? "ஆண்" : "பெண்"}
                </p>
              </li>
            ))}
          </ul>

          <h4 className="text-lg font-semibold mt-6 mb-3">ஜாதகம்</h4>
          <ul className="space-y-2">
            {jathagam.map((jatha, index) => (
              <li key={index}>
                <p>
                  <strong>ராசி:</strong> {translateRasi(jatha.rasi)} /{" "}
                  {jatha.rasi}
                </p>
                <p>
                  <strong>நட்சத்திரம்:</strong>{" "}
                  {translateNatchathiram(jatha.natchathiram)} /{" "}
                  {jatha.natchathiram}
                </p>
                <p>
                  <strong>லக்னம்:</strong> {translateLagnam(jatha.lagnam)} /{" "}
                  {jatha.lagnam}
                </p>
                <p>
                  <strong>தோஷம்:</strong> {translateDosham(jatha.dosham)}
                  {jatha.dosham ? ` - ${jatha.dosham.replace("_", " ")}` : ""}
                </p>
                <p>
                  <strong>மின்னஞ்சல்:</strong>{" "}
                  {userData.email || "naveenv0906@gmail.com"}
                </p>
                <p>
                  <strong>மொபைல் எண்:</strong>{" "}
                  {userData.mobileNo || "6374934866"}
                </p>
                <p>
                  <strong>Click to view Jathagam:</strong>
                  <span
                    onClick={() => {
                      if (jatha.uploadJathakam) {
                        const link = document.createElement("a");
                        link.href = jatha.uploadJathakam;
                        link.download = `Jathagam_${userData.fullName}.pdf`;
                        link.click();
                      }
                    }}
                    className="text-primary cursor-pointer hover:underline ml-2"
                  >
                    {"->"} ஜாதகம்
                  </span>
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => {
                const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE;
                const message = `Hi, I'm interested in the profile of ${userData.fullName}`;
                window.open(
                  `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                    message
                  )}`,
                  "_blank"
                );
              }}
              className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-primary-dark transition-colors shadow-md"
            >
              Contact
            </button>
            {isLoggedIn && (
              <button
                onClick={onSave}
                disabled={isSaved}
                className={`w-full font-bold py-3 rounded-md transition-colors shadow-md ${
                  isSaved
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-800"
                }`}
              >
                {isSaved ? "Already Saved" : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ selectedUserId, onNavigateToLogin }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  // Lightbox for full-screen image view
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userIdToFetch = selectedUserId || user?.userId;
      if (userIdToFetch) {
        try {
          const data = await userAPI.getUser(userIdToFetch);
          setUserData(data);

          // Check if profile is already in wishlist
          if (user && selectedUserId && user.userId !== selectedUserId) {
            try {
              const wishlist = await userAPI.getWishlist(user.userId);
              setIsSaved(
                wishlist.some((item) => item.profileId === selectedUserId)
              );
            } catch (error) {
              console.error("Failed to fetch wishlist:", error);
            }
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user, selectedUserId]);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSaveProfile = async () => {
    if (!user || !selectedUserId || saving || isSaved) return;

    setSaving(true);
    try {
      await userAPI.addToWishlist(user.userId, selectedUserId);
      setIsSaved(true);
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      if (
        error.message?.includes("409") ||
        error.message?.includes("already")
      ) {
        setIsSaved(true); // Profile was already saved
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-primary text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-600">
            Please login to view profile details.
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProfileHero />
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="w-full lg:w-2/3">
              {userData.userProfile && userData.userProfile.length > 0 ? (
                !showAllImages ? (
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-2/3 flex-shrink-0">
                      <img
                        src={userData.userProfile[0]}
                        alt="Profile main"
                        className="w-full rounded-lg shadow-lg object-cover h-full max-h-[500px] cursor-pointer"
                        onClick={() => {
                          setLightboxImage(userData.userProfile[0]);
                          setLightboxOpen(true);
                        }}
                      />
                    </div>
                    <div className="w-full md:w-1/3 flex md:flex-col gap-4">
                      {userData.userProfile[1] && (
                        <img
                          src={userData.userProfile[1]}
                          alt="Profile thumb 1"
                          className="w-full h-1/2 object-cover rounded-lg shadow-lg cursor-pointer"
                          onClick={() => {
                            setLightboxImage(userData.userProfile[1]);
                            setLightboxOpen(true);
                          }}
                        />
                      )}
                      {userData.userProfile[2] && (
                        <img
                          src={userData.userProfile[2]}
                          alt="Profile thumb 2"
                          className="w-full h-1/2 object-cover rounded-lg shadow-lg cursor-pointer"
                          onClick={() => {
                            setLightboxImage(userData.userProfile[2]);
                            setLightboxOpen(true);
                          }}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userData.userProfile.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Profile ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg shadow-lg cursor-pointer"
                        onClick={() => {
                          setLightboxImage(image);
                          setLightboxOpen(true);
                        }}
                      />
                    ))}
                  </div>
                )
              ) : (
                <div className="bg-gray-100 rounded-lg shadow-lg p-8 text-center">
                  <div className="text-gray-500 text-lg mb-2">
                    No images available
                  </div>
                  <div className="text-gray-400 text-sm">
                    Profile images will appear here when uploaded
                  </div>
                </div>
              )}
              {userData.userProfile && userData.userProfile.length > 1 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="mt-4 bg-primary text-white font-semibold py-2 px-5 rounded-md hover:bg-primary-dark transition-colors text-sm"
                >
                  {showAllImages ? "Show Less" : "Show All"}
                </button>
              )}
              <ProfileDetailsSection userData={userData} />
            </div>
            {/* Right Column */}
            <div className="w-full lg:w-1/3">
              <ContactInfoSection
                userData={userData}
                isLoggedIn={!!user}
                onLogin={
                  onNavigateToLogin || (() => console.log("Navigate to login"))
                }
                onSave={handleSaveProfile}
                isSaved={isSaved}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative flex items-center justify-center w-[100vw] md:w-[900px] h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-0 top-0 m-2 text-white text-2xl bg-black/40 rounded-full p-1"
              onClick={() => setLightboxOpen(false)}
            >
              ×
            </button>
            <div className="w-full h-full flex items-center justify-center bg-black/20 rounded">
              <img
                src={lightboxImage}
                alt="Full"
                className="max-w-full max-h-full object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
      <StatsBar />
    </>
  );
};

export default ProfilePage;
