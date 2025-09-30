import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthData } from "../../utils/auth";
import { toast } from "react-toastify";

const WData = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const data = getAuthData();
  const userId = data?.userId;

  // Fetch wishlist data
  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/wishlist?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist data");
        }
        const data = await response.json();
        setWishlistData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, [userId]);

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/data`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter userdata based on wishlist userWishlistId
  useEffect(() => {
    if (userdata.length && wishlistData.length) {
      const filtered = userdata.filter((user) =>
        wishlistData.some((wishlist) => wishlist.userWishlistId === user.userId)
      );
      setFilteredUsers(filtered);
    }
  }, [userdata, wishlistData]);

  // Delete item from wishlist
  const handleDeleteWishlistItem = async (wishlistId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/wishlist/${wishlistId}`, // Using wishlistId for deletion
        {
          method: "DELETE",
        }
      );
    
      if (!response.ok) {
        toast.error("Error Removing Wishlist");
        throw new Error("Failed to remove item from wishlist");
      
      }
      if (response.ok) {
        toast.success("Item removed from wishlist!");
      }

      // Remove the deleted item from the local state based on wishlistId
      setWishlistData(wishlistData.filter((item) => item.wishlistId !== wishlistId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section
      id="target_search"
      className="product-list-container jm-job-area-3 pt-3 pb-100"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="jm-section-title mb-40 text-center">
              <h2 className="title mb-10">WishList</h2>
            </div>
          </div>
        </div>
        <div className="row jm-job-grid">
          {filteredUsers.length === 0 ? (
            <div className="col-12 text-center">
              <h4>No results found</h4>
            </div>
          ) : (
            filteredUsers.map((user) => {
              // Find the corresponding wishlist data for the user
              const userWishlist = wishlistData.find(
                (wishlist) => wishlist.userWishlistId === user.userId
              );
              
              // If a matching wishlist item is found
              if (!userWishlist) return null;

              return (
                <div className="col-md-12 col-lg-4 mb-4" key={user.userId}>
                  <Link
                    to={`/jobDetailsPage/${user.userId}`}
                    className="text-decoration-none"
                  >
                    <div className="bg-light border rounded custom-shadow">
                      <div className="text-center mt-3">
                        <img
                          style={{
                            objectFit: "contain",
                            width: "280px",
                            height: "300px",
                          }}
                          className="rounded-3"
                          src={user.userProfile[0]} // Access first image
                          alt="Profile"
                        />
                      </div>
                      <div className="jm-job-item-head-3 mt-2">
                        <h4 className="title">
                          <Link to={`/jobDetailsPage/${user.userId}`}>
                            {user.fullName}
                          </Link>
                        </h4>
                      </div>
                      <div className="jm-job-item-info-3">
                        <div className="jm-job-item-info-inner-3">
                          <div className="jm-job-location-3">
                            <i className="fa-thin fa-location-dot"></i>
                            <span> District: {user.district}</span>
                          </div>
                          <div className="jm-job-jobtime-3">
                            <i className="fa-thin fa-business-time"></i>
                            <span>DOB: {user.dateOfBirth}</span>
                          </div>
                        </div>
                      </div>
                      <div className="border"></div>
                      <div className="px-1 py-2">
                        <div className="jm-banner-layout-2-btn btn w-100">
                          <Link
                            to={`/jobDetailsPage/${user.userId}`}
                            className=""
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDeleteWishlistItem(userWishlist.wishlistId)} // Pass wishlistId for deletion
                    className="btn btn-danger mt-2 w-100"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default WData;
