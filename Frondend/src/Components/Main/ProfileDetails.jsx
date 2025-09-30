import React, { useEffect, useState } from "react";
import { getAuthData } from "../../utils/auth";
import { Link } from "react-router-dom";

function ProfileDetails() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get userId from the auth data
  const userdata = getAuthData();
  const userId = userdata?.userId;

  useEffect(() => {
    if (userId) {
      // Fetch data from API
      fetch(`${import.meta.env.VITE_API_URL}/user/data/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data); // Set the fetched data
          setLoading(false); // Set loading to false once data is loaded
        })
        .catch((err) => {
          setError("Failed to load data");
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="container">
      <div className="jm-job-wrap pt-100 pb-60">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <div className="jm-job-content-wrapp">
              <div className="container">
                <div
                  className="profile-gallery"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {userData.userProfile.slice(0, 2).map((m, index) => (
                    <div key={index} style={{ position: "relative" }}>
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
                    </div>
                  ))}
                </div>
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
                      <strong>பாலினம் :</strong> {userData.gender}
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-xl-4 col-lg-4">
            <div className="jm-job-sidebar-widget mb-40">
              <div className="jm-job-sidebar-inner">
                <h3 className="jm-job-sidebar-widget-title">
                  கூடுதல் விவரங்கள்
                </h3>
              </div>
              <div className="blur-content-wrapper">
                <div className="">
                  <h4>உடன்பிறந்தவர்கள்</h4>
                  <ul>
                    {userData.siblings.map((sibling) => (
                      <li key={sibling.siblingId}>
                        <p>
                          <strong>பெயர் :</strong> {sibling.name}
                        </p>
                        <p>
                          <strong>பாலினம் :</strong> {sibling.gender}
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
                          {jatha.rasi}
                        </p>
                        <p>
                          <strong>நட்சத்திரம் : </strong>
                          {jatha.natchathiram}
                        </p>
                        <p>
                          <strong>லக்னம்: </strong>
                          {jatha.lagnam}
                        </p>
                        <p>
                          <strong>தோஷம்: </strong>
                          {jatha.dosham}
                        </p>
                        <p>
                          <strong> மின்னஞ்சல்:</strong> {userData.email}
                        </p>
                        <p>
                          <strong> மொபைல் எண்:</strong> {userData.mobileNo}
                        </p>
                        <p>
                          <strong>Click to view Jathagam: </strong>
                          <a
                            className="text-primary"
                            href={jatha.uploadJathakam}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" -> "} ஜாதகம்
                          </a>
                        </p>
                      </li>
                    ))}
                  </ul>
                  <Link to="/editprofile" className="jm-job-overview-btn">
                    Edit <i className="fa-thin fa-pen-to-square"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
