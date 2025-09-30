import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { JobContext } from "../../Context/JobContext";
import logo from "../../../public/assets/img/logo/logowhite.png";
import { getAuthData } from "../../utils/auth";
import { Modal } from "antd";

const Header2 = () => {
  const { handleOpenForm, isSticky, handleOpen } = useContext(JobContext);

  const auth = getAuthData();
  console.log(auth);

  console.log(auth?.mobileNo);
  const showConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to log out?",
      content: "",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        // Action on confirmation
        localStorage.clear();
        console.log("Logged out and localStorage cleared.");
        // Optionally redirect to login or home page
        window.location.href = "/login";
      },
      onCancel: () => {
        console.log("Logout canceled.");
      },
    });
  };
  return (
    <header className="heater-transparent">
      <div
        className={`jm-header-area-2 jm_border_bottom jm-header-padding header-sticky ${
          isSticky ? "sticky" : ""
        }`}
      >
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-xl-3 col-lg-3 col-7">
              <div className="jm-header-logo jm-header-logo-2">
                <Link className="jm-logo" to="/">
                  <img className="w-25" src={logo} alt="Image Not Fouund" />
                </Link>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block">
              <div className="jm-header-main-menu text-center jm-header-menu-2">
                <nav className="jm-mobile-menu" id="jm-mobile-menu">
                  <ul>
                    <li className="">
                      <Link to="/">
                        <a>Home</a>
                      </Link>
                    </li>
                    <li className="">
                      <a>About Us</a>
                    </li>
                    <li className="">
                      <a>Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-5">
              <div className="jm-header-right jm-header-right-2 text-end  d-flex align-items-center justify-content-end">
                {/* <Link to="#" className="jm-search jm-header-action-search" role='button' onClick={handleOpenForm}><i className="fal fa-search"></i></Link> */}
                {auth ? (
                  <div className="d-flex align-items-center gap-3">
                    <div className="dropdown">
                      <img
                        src={auth?.userProfile?.[0]}
                        className="rounded-circle me-2 dropdown-toggle"
                        width={25}
                        alt=""
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: "pointer" }}
                      />
                      <ul
                        className="dropdown-menu mt-3"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li>
                          <Link
                          to='/wishlist'
                            className="dropdown-item"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <i className="fa-thin fa-heart me-2"></i> My
                            Wishlist
                          </Link>
                        </li>
                        <li>
                          <Link
                          to='/myprofile'
                            className="dropdown-item"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <i className="fa-thin fa-user me-2"></i> My Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                          to='/editprofile'
                            className="dropdown-item"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <i className="fa-thin fa-edit me-2"></i> Edit
                            Profile
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={showConfirm}
                      className="jm-theme-btn jm-theme-btn-2 d-none d-lg-block"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="jm-theme-btn jm-theme-btn-2 d-none d-lg-block"
                  >
                    Login
                  </Link>
                )}
                <div
                  className="jm-navbar-mobile-sign side-toggle d-lg-none d-inline-block"
                  role="button"
                  onClick={handleOpen}
                >
                  <span className="dr-line-1"></span>
                  <span className="dr-line-2"></span>
                  <span className="dr-line-3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header2;
