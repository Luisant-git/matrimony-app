import React, { useState } from "react";
import { Col, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuthData } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import './style.css'
const Banner2 = ({ resultsRef }) => {
  // State variables for the form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [profileFor, setProfileFor] = useState("");
  const [captcha, setCaptcha] = useState(""); // Captcha state
  const [captchaInput, setCaptchaInput] = useState(""); // User input for captcha
  const navigate = useNavigate();
  const data = getAuthData();
  const logged = data?.mobileNo;
  const [isAgreed, setIsAgreed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Generate a simple random captcha (string of 5 alphanumeric characters)
  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captchaStr = "";
    for (let i = 0; i < 5; i++) {
      captchaStr += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCaptcha(captchaStr);
  };

  // Handle input change for each field
  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  // Handle form submission for registration
  const handleRegistration = async (e) => {
    e.preventDefault();

    // Validate phone number for exactly 10 digits
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    // Validate captcha
    if (captchaInput !== captcha) {
      toast.error("Invalid captcha. Please try again.");
      return;
    }
    if (!isAgreed) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/registration`,
        {
          name,
          number: phone,
          email,
          looking_For: lookingFor,
          this_profile_for: profileFor,
        }
      );
      console.log(response.data);
      toast.success("Registration successful!");
      navigate("/success");

      // Clear fields after registration
      setName("");
      setPhone("");
      setEmail("");
      setLookingFor("");
      setProfileFor("");
      setCaptchaInput("");
      generateCaptcha(); // Regenerate captcha after registration
    } catch (error) {
      console.error("Error during registration", error);
      toast.error("Error during registration, please try again!");
    }
  };

  // Handle showing and hiding the terms modal

  // Generate captcha on component mount
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <section className="jm-banner-area-2 banner-height bg-default jm-overlay h-jobmot-banner-2">
      <div className="container">
        <div className="row mt-5">
          <div
            className={`${
              logged
                ? "col-12 p-4 mt-2"
                : "col-md-6 mb-4 col-xl-6 col-lg-12 col-md-12 text-center mt-5"
            }`}
          >
            <div className="jm-banner-content-static">
              <div className="jm-banner-content-head text-center">
                <h2 className="jm-banner-content-title-3">
                  Discover <span className="jm-banner-bold-amount">25K+</span>
                  <br />
                  Profiles Waiting to Connect
                </h2>
                <span className="jm-banner-sub-text">
                  Find Your Perfect Match Today
                </span>
                <p>
                  Explore thousands of genuine profiles and connect with
                  like-minded individuals.
                  <br />
                  Your journey to love begins here.
                </p>
              </div>
            </div>
          </div>
          {!logged && (
            <div className="jm-candidates-search-wrapper-inner-flex bg-light rounded col-md-6 col-12 bg-light rounded p-lg-4 p-sm-0 p-md-3 col-xl-6 col-lg-12 col-md-12 mb-sm-5 mb-5 mt-5">
              <div className="jm-candidates-search-wrapper-inner-input-fields px-1 py-2">
                <h5>இங்கு பதிவு செய்யவும்</h5>
                <form onSubmit={handleRegistration}>
                  <Col xl="12" lg="12" md="12" sm="12">
                    <label className="form-label" htmlFor="">
                      பெயர்
                    </label>
                    <input
                      className="border-danger"
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => handleChange(e, setName)}
                    />
                  </Col>
                  <Col xl="12" lg="12" md="12" sm="12">
                    <label className="form-label" htmlFor="">
                      தொலைபேசி எண்
                    </label>
                    <input
                      className="border-danger"
                      type="text"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => handleChange(e, setPhone)}
                    />
                  </Col>
                  <Col xl="12" lg="12" md="12" sm="12">
                    <label className="form-label" htmlFor="">
                      மின்னஞ்சல்
                    </label>
                    <input
                      className="border-danger"
                      type="text"
                      placeholder="Email(optional/(விருப்பம்))"
                      value={email}
                      onChange={(e) => handleChange(e, setEmail)}
                    />
                  </Col>
                  <Col xl="12" lg="12" md="12" sm="12">
                    <label className="form-label" htmlFor="">
                      நான் காண விரும்புவது
                    </label>
                    <select
                      className="jm-candidates-search-select border-danger"
                      value={lookingFor}
                      onChange={(e) => handleChange(e, setLookingFor)}
                    >
                      <option>Choose Type</option>
                      <option>ஆண்</option>
                      <option>பெண்</option>
                    </select>
                  </Col>
                  <Col xl="12" lg="12" md="12" sm="12">
                    <label className="form-label" htmlFor="">
                      இந்த சுயவிவரம் யாருக்காக
                    </label>
                    <select
                      className="jm-candidates-search-select border-danger"
                      value={profileFor}
                      onChange={(e) => handleChange(e, setProfileFor)}
                    >
                      <option>Choose Type</option>
                      <option>எனக்காக</option>
                      <option>என் மகனுக்காக</option>
                      <option>என் மகளுக்காக</option>
                      <option>என் சகோதரனுக்காக</option>
                      <option>என் சகோதரிக்காக</option>
                      <option>என் நண்பருக்காக</option>
                      <option>என் உறவினர்களுக்காக</option>
                    </select>
                  </Col>

                  {/* Captcha field */}
                  <Col xl="12" lg="12" md="12" sm="12">
                    <label
                      style={{ userSelect: "none" }}
                      className="form-label"
                      htmlFor=""
                    >
                      Captcha: <span className="bg-danger text-light px-3">{captcha}</span>
                    </label>
                    <input
                      className="border-danger"
                      type="text"
                      placeholder="Enter Captcha"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Col>
                      <input
                        type="checkbox"
                        style={{ width: "16px", height: "16px" }}
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                      />
                      I agree to the Terms and Conditions{" "}
                      <span className="text-danger" onClick={handleShow}>
                        click to view
                      </span>
                    </Col>
                  </Col>
                  {/* Terms and Conditions */}
                  <Col
                    xl="12"
                    lg="12"
                    md="12"
                    sm="12"
                    className="d-flex justify-content-between"
                  >
                    <button
                      type="submit"
                      className="jm-banner-layout-2-btn mt-25 btn w-100"
                    >
                      Get Started{" "}
                      <i className="fa-thin fa-arrow-right-long"></i>
                    </button>
                  </Col>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <h1 class="primary-text fs-2">
              Terms and Conditions Governing Membership
            </h1>
            <p className="primary-text">
              [Subject to revision by BMP from time to time]
            </p>
            <p className="primary-text">
              [Applicable for Paid and Free Services]
            </p>
            <p className="primary-text">
              DEAR USER: PLEASE READ THESE TERMS AND CONDITIONS BEFORE
              REGISTRATION.
            </p>
            <p class="primary-text">
              By registering on{" "}
              <span className="secondary-text">Matrimonial.com</span>, you
              explicitly understand and agree that:
            </p>
            <ul className="primary-text">
              <li>
                The minimum age for registering is{" "}
                <span class="secondary-text">18 years for women</span> and{" "}
                <span class="secondary-text">21 years for men</span>.
              </li>
              <li>
                You are not disabled by any law from entering into a contract.
              </li>
              <li>
                You have gone through the Terms and Conditions and agree to be
                bound by them.
              </li>
            </ul>

            <h2 className="primary-text">Conditions of Use:</h2>
            <p className="primary-text">
              Welcome to{" "}
              <span class="secondary-text">Matrimonial.com</span>.
              <span class="secondary-text">Matrimonial.com</span> and its
              affiliates provide their services to you subject to the following
              conditions. If you visit or sign up at{" "}
              <span class="secondary-text">Matrimonial.com</span>, you
              accept these conditions. Please read them carefully.
            </p>

            <h2 className="primary-text">Privacy:</h2>
            <p className="primary-text">
              Please review our{" "}
              <span className="secondary-text">Privacy Notice</span>, which also
              governs your visit to{" "}
              <span class="secondary-text">Matrimonial.com</span>, to
              understand our practices. Members agree that their profile(s) may
              be crawled and indexed by search engines, where{" "}
              <span class="secondary-text">Matrimonial.com</span> and its
              network does not have any control over the search engines'
              behavior.
            </p>

            <h2 class="primary-text">Communications</h2>
            <p class="primary-text">
              When you visit{" "}
              <span class="secondary-text">Matrimonial.com</span> or send
              e-mails to us, you are communicating with us electronically. You
              consent to receive communications from us electronically. We will
              communicate with you by e-mail or by posting notices on this site.
            </p>

            <h2 class="primary-text">Your Account</h2>
            <p class="primary-text">
              If you use or register on this site, you are responsible for
              maintaining the confidentiality of your account and password and
              for restricting access to your computer. You agree to accept
              responsibility for all activities that occur under your account or
              password.
            </p>

            <h2 class="primary-text">Membership</h2>
            <p class="primary-text">
              Membership is not automatic: The right of admission is vested with{" "}
              <span class="secondary-text">Matrimonial.com</span>.
            </p>
            <p class="primary-text">
              You become a member upon due acceptance of the Profile/Payment by{" "}
              <span class="secondary-text">Matrimonial.com</span>.
            </p>
            <ul class="primary-text">
              <li>
                Membership is valid for{" "}
                <span class="secondary-text">45, 90, or 180 days</span> based on
                the plan chosen.
              </li>
              <li>
                Your membership is personal and cannot be assigned, transferred,
                or licensed to anyone else.
              </li>
            </ul>

            <h2 class="primary-text">Online Conduct:</h2>
            <p class="primary-text">
              You are responsible for the content and information [including
              profile and photograph] you post or transmit using{" "}
              <span class="secondary-text">Matrimonial.com's</span>{" "}
              services.
            </p>
            <p class="primary-text">
              You will not post or transmit any content that is defamatory,
              abusive, obscene, or in violation of the rights of any person,
              including intellectual property rights.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Banner2;
