import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { t } from "i18next";
import "./style.css";
import { getAuthData } from "../../utils/auth";

const SingleJobDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [bookmarkError, setBookmarkError] = useState("");
  const [showAllImages, setShowAllImages] = useState(false); // New state to toggle images visibility
  const authData = getAuthData();
  const isLoggedIn = authData?.mobileNo;
  const userId = authData?.userId;
  const navigate = useNavigate();
  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE; 
  const message = 'Hello, I have a question!'; 
  
  // Encode the message to ensure it works with the URL
  const encodedMessage = encodeURIComponent(message);
  // Fetch job details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/data/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [id]);

  // Fetch wishlist
  useEffect(() => {
    if (userId) {
      const fetchWishlist = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/wishlist?userId=${userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch wishlist");
          }
          const data = await response.json();
          setWishlist(data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchWishlist();
    }
  }, [userId]);

  const addToWishlist = async () => {
    setBookmarkError("");
    if (!isLoggedIn) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userWishlistId: id,
        }),
      });

      if (response.status === 409) {
        throw new Error("This item is already in the wishlist.");
      }

      if (!response.ok) {
        throw new Error("Failed to add to wishlist.");
      }

      const newWishlistItem = await response.json();
      setWishlist((prev) => [...prev, newWishlistItem]);
    } catch (err) {
      setBookmarkError(err.message);
    }
  };

  const gohere = () => {
    navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  
  if (!userData) {
    return (
      <div className="loading container mt-5">
        <div className="row">
          <div className="col-md-6 d-flex flex-column align-items-center">
            {/* Skeleton for the images */}
            <div className="skeleton-image" style={{ width: '100%', height: '150px', backgroundColor: '#ddd', marginBottom: '10px' }}></div>
            <div className="skeleton-image" style={{ width: '100%', height: '150px', backgroundColor: '#ddd' }}></div>
          </div>
  
          <div className="col-md-6">
            {/* Skeleton for content */}
            <div className="skeleton-content" style={{ width: '100%', height: '20px', backgroundColor: '#ddd', marginBottom: '10px' }}></div>
            <div className="skeleton-content" style={{ width: '100%', height: '20px', backgroundColor: '#ddd', marginBottom: '10px' }}></div>
            <div className="skeleton-content" style={{ width: '100%', height: '20px', backgroundColor: '#ddd', marginBottom: '10px' }}></div>
          </div>
        </div>
      </div>
    );}

  const isBookmarked = wishlist.some((item) => item.userWishlistId === id);

  return (
    <div className="container">
      <div className="jm-job-wrap pt-100 pb-60">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <div className="jm-job-content-wrapp">
              {/* Job Details */}
              <div className="container">
                <PhotoProvider>
                  <div
                    className="profile-gallery"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {userData.userProfile.slice(0, showAllImages ? userData.userProfile.length : 2).map((m, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <PhotoView src={m}>
                          <img
                            className="img-fluid rounded shadow"
                            src={m}
                            alt={`Profile ${index}`}
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "8px",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                        </PhotoView>
                      </div>
                    ))}
                  </div>
                </PhotoProvider>
                {/* Toggle Button */}
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setShowAllImages(!showAllImages)}
                >
                  {showAllImages ? "Show Less" : "Show All"}
                </button>
              </div>

              {/* Profile Details */}
              <div className="container mt-4">
                <h3 className="text-center mb-4">Profile Details</h3>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <p>
                      <strong>முழு பெயர் :</strong> {userData.fullName}
                    </p>
                    <p>
                      <strong>பாலினம் :</strong> {t(`gender.${userData.gender}`)}
                    </p>
                    <p>
                      <strong>பிறந்த தேதி:</strong> {userData.dateOfBirth}
                    </p>
                    <p>
                      <strong>முகவரி:</strong> {userData.address}
                    </p>
                    <p>
                      <strong>மாநிலம்:</strong> {userData.state}
                    </p>
                  </div>
                  <div className="col-12 col-md-6">
                    <p>
                      <strong>மாவட்டம்:</strong> {userData.district}
                    </p>
                    <p>
                      <strong>கல்வி:</strong> {userData.education}
                    </p>
                    <p>
                      <strong>வேலை:</strong> {userData.job}
                    </p>
                    <p>
                      <strong>வருவாய்:</strong> {userData.income}
                    </p>
                    <p>
                      <strong>Marital Status:</strong> {userData.maritalStatus}
                    </p>
                    <p>
                      <strong>சொந்த வீடு:</strong>{" "}
                      {userData.ownHouse ? "Yes/ஆம்" : "No/இல்லை"}
                    </p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4">
            <div className="jm-job-sidebar-widget mb-40">
              <div className="jm-job-sidebar-inner">
                <h3 className="jm-job-sidebar-widget-title">கூடுதல் விவரங்கள்</h3>
              </div>
              <div className="blur-content-wrapper">
                {!isLoggedIn && (
                  <div className="warning-overlay">
                    <span className="warning-icon">⚠️</span>
                    Please log in to view this content.
                    <button className="btn-danger" onClick={gohere}>
                      Log In
                    </button>
                  </div>
                )}
                <div className={!isLoggedIn ? "blur-content" : ""}>
                  <h4>உடன்பிறந்தவர்கள்</h4>
                  <ul>
                    {userData.siblings.map((sibling) => (
                      <li key={sibling.siblingId}>
                        <p>
                          <strong>பெயர் :</strong> {sibling.name}
                        </p>
                        <p>
                          <strong>பாலினம் :</strong>{" "}
                          {t(`gender.${sibling.gender}`)}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <h4>ஜாதகம்</h4>
                  <ul>
                    {userData.jathagam.map((jatha) => (
                      <li key={jatha.jathagamId}>
                        <p>
                          <strong>ராசி: </strong>
                          {t(`rasi.${jatha.rasi}`)} / {jatha.rasi}
                        </p>
                        <p>
                          <strong>நட்சத்திரம் : </strong>
                          {t(`natchathiram.${jatha.natchathiram}`)}
                        </p>
                        <p>
                          <strong>லக்னம்: </strong>
                          {t(`natchathiram.${jatha.lagnam}`)}
                        </p>
                        <p>
                          <strong>தோஷம்: </strong> {t(`dosham.${jatha.dosham}`)}{" "}
                          {jatha.dosham ? "Yes" : "No"}
                        </p>
                        <p>
                          <strong> மின்னஞ்சல்:</strong> {userData.email}
                        </p>
                        <p>
                          <strong> மொபைல் எண்:</strong> {userData.mobileNo}
                        </p>
                        <p>
                          <strong>Click to view Jathagam : </strong>
                          <a
                            className="text-primary"
                            href={jatha.uploadJathakam}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" "}
                            {"->"} ஜாதகம்
                          </a>
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="jm-job-sidebar-overview-buttons">
                  <Link 
      to={`https://wa.me/${phoneNumber}?text=${encodedMessage}`} 
      className="jm-job-overview-btn"
      target="_blank" 
      rel="noopener noreferrer"
    >
      Contact <i className="fa-thin fa-arrow-right-long"></i>
    </Link>
                    <button
                      className="jm-job-overview-btn job-bookmark"
                      onClick={addToWishlist}
                      disabled={isBookmarked}
                    >
                      <i
                        className={`${
                          isBookmarked
                            ? "fa fa-bookmark"
                            : "fa-thin fa-bookmark"
                        } me-3`}
                      ></i>{" "}
                      {isBookmarked ? "Already Saved" : "Save"}
                    </button>
                  </div>
                  {bookmarkError && (
                    <p className="text-danger mt-2">{bookmarkError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobDetails;
