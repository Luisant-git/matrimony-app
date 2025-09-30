import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAuthData } from "../../utils/auth";
import axios from "axios";
import { Col, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const AddResumeArea = () => {
  const data = getAuthData();
  const userId = data?.userId;
  const [formData, setFormData] = useState({
    fullName: "",
    state: "",
    district: "",
    address: "",
    email: "",
    birthPlace: "",
    education: "",
    job: "",
    organization: "",
    height: 0,
    weight: 0,
    color: "",
    userProfile: [],
    income: 0,
    ownHouse: true,
    job_type: "",
  });
  const [imgpre, setImgPreview] = useState([]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      let parsedValue = value;

      // Ensure income, height, and weight are parsed as integers
      if (name === "income" || name === "height" || name === "weight") {
        parsedValue = parseInt(value, 10); // Convert to integer
      }

      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : parsedValue,
      };
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("files", file);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/uploads`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = response.data?.url || response.data?.urls?.[0];
        if (imageUrl) {
          uploadedUrls.push(imageUrl);
        } else {
          console.error("Invalid URL in response for file:", file.name);
        }
      } catch (error) {
        console.error("Error uploading file:", file.name, error);
        toast.error(`Failed to upload ${file.name}.`);
      }
    }

    if (uploadedUrls.length > 0) {
      setImgPreview((prev) => [...prev, ...uploadedUrls]);
      setFormData((prevData) => ({
        ...prevData,
        userProfile: [...prevData.userProfile, ...uploadedUrls],
      }));
      toast.success("Images uploaded successfully!");
    }
  };

  const handleRemoveImage = (index) => {
    setImgPreview((prev) => prev.filter((_, i) => i !== index));
    setFormData((prevData) => ({
      ...prevData,
      userProfile: prevData.userProfile.filter((_, i) => i !== index),
    }));
    toast.info("Image removed.");
  };

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/data/${userId}`
        );
        setFormData(response.data);
        setImgPreview(response.data.userProfile);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/user/data/${userId}`, formData);
      toast.success("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to fetch user data.");
    }
  };
  console.log(imgpre, "img");

  return (
    <div className="jm-post-job-area pt-95 pb-60">
      <div className="container">
        <div className="jm-post-job-wrapper mb-40">
          <h4 className="jm-job-acc-title">Update Profile</h4>
          <div className="">
            <form onSubmit={handleSubmit} className="row">
              <label className="form-label" htmlFor="">
                Profile
              </label>
              <div className="col-xl-12 col-md-12 ">
                <input
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="form-control"
                  type="file"
                  placeholder="Profile Picture"
                  name=""
                />

                <Row className="mt-3" gutter={[16, 16]}>
                  {imgpre.map((image, index) => (
                    <Col key={index} span={4} style={{ position: "relative" }}>
                      <img
                        className="img-fluid"
                        src={image}
                        alt={`preview-${index}`}
                        style={{
                          width: "100%",
                          borderRadius: "4px",
                          border: "1px solid gray",
                        }}
                      />
                      <CloseOutlined
                        style={{
                          position: "absolute",
                          top: 5,
                          right: 11,
                          color: "red",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRemoveImage(index)}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="col-xl-6 col-md-6 mt-4">
                <label className="form-label" htmlFor="">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-md-6 mt-4">
                <label className="form-label" htmlFor="">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  Income
                </label>
                <input
                  type="text"
                  name="income"
                  placeholder="Enter Current Income"
                  value={formData.income}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  Birth Place
                </label>
                <input
                  type="text"
                  placeholder="Birth Place"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  State
                </label>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  placeholder="education"
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  Job
                </label>
                <input
                  type="text"
                  placeholder="job"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  Organization
                </label>
                <input
                  type="text"
                  placeholder="job"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  Height
                </label>
                <input
                  type="text"
                  placeholder="job"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  Weight
                </label>
                <input
                  type="text"
                  placeholder="job"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  Color
                </label>
                <select
                  className="jm-job-select"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                >
                  <option value="">
                    Select your color preference / உங்கள் வண்ண விருப்பத்தை
                    தேர்ந்தெடுக்கவும்
                  </option>
                  <option value="light_brown">Light Brown / இளப்பழுப்பு</option>
                  <option value="medium_brown">
                    Medium Brown / மிதப்பழுப்பு
                  </option>
                  <option value="dark_brown">
                    Dark Brown / இரண்டிப்பழுப்பு
                  </option>
                  <option value="black">Black / கறுப்பு</option>
                </select>
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  Job Type
                </label>
                <select
                  className="jm-job-select"
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                >
                  <option>Select your Job</option>
                  <option value="Govt">Govt</option>
                  <option value="Private">Private</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div className="col-xl-6 col-md-6">
                <label className="form-label" htmlFor="">
                  OWn House
                </label>
                <select
                  className="jm-job-select"
                  name="ownHouse"
                  value={formData.ownHouse}
                  onChange={handleChange}
                >
                  <option>Select House</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="col-xl-12 col-md-12">
                <label className="form-label" htmlFor="">
                  Address
                </label>
                <textarea
                  type="text"
                  placeholder="Address"
                  name="address"
                  rows="1"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-danger" type="submit">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddResumeArea;
