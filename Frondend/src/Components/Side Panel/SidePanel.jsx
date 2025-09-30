import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { JobContext } from "../../Context/JobContext";
import MobileMenu from "./MobileMenu";
import { Modal } from "antd";
import { getAuthData } from "../../utils/auth";

const SidePanel = () => {
  const { sidePanelOpen, handleClose } = useContext(JobContext);

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
    <>
      <div
        className={`jm-sidebar-info side-info ${
          sidePanelOpen ? "info-open" : ""
        }`}
      >
        <div className="jm-sidebar-logo-wrapper mb-25">
          <div className="row align-items-center">
            <div className="col-xl-6 col-8">
              <div className="jm-sidebar-logo">
                <Link to="/">
                  <img
                    className="w-25"
                    src="assets/img/logo/logowhite.png"
                    alt="logo-img"
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-6 col-4">
              <div className="jm-sidebar-close-wrapper text-end">
                <button
                  className="jm-sidebar-close side-info-close"
                  onClick={handleClose}
                >
                  <i className="fal fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <MobileMenu handleClose={handleClose} />

        <div className="jm-sidebar-contact-wrapper mt-40">
          <div className="jm-sidebar-contact mb-40">
            <h4 className="jm-sidebar-contact-title">Contact Info</h4>
            <span className="sidebar-address">
              <i className="fal fa-map-marker-alt"></i>
              <span>10221 Salem, Tamil Nadu India</span>
            </span>
            <Link to="tel:(+99)012345678">
              <i className="fal fa-phone"></i>
              <span>(+99)012345678</span>
            </Link>
            <Link to="mailto:examplesite@gmail.com" className="theme-3">
              <i className="fal fa-envelope"></i>
              <span>
                <span>matrimony@gmail.com</span>
              </span>
            </Link>
          </div>
          {auth ? (
            <button
              onClick={showConfirm}
              className="rounded-0 jm-theme-btn jm-theme-btn-2 "
            >
            <i className="fas fa-sign-out-alt me-3"></i>
            Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-0 jm-theme-btn jm-theme-btn-2  "
            >
              Login
            </Link>
          )}
          <div className="jm-sidebar-social mt-40 mb-30">
            <Link to="#" target="_blank" className="facebook">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="#" target="_blank" className="twitter">
              <i className="fab fa-pinterest-p"></i>
            </Link>
            <Link to="#" target="_blank" className="linkedin">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="#" target="_blank" className="youtube">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
       
    
        </div>
      </div>
      <div
        className={`offcanvas-overlay ${sidePanelOpen ? "overlay-open" : ""}`}
        onClick={handleClose}
      ></div>
    </>
  );
};

export default SidePanel;
