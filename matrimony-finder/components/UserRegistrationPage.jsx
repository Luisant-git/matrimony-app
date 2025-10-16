import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UserRegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "MALE",
    dateOfBirth: "",
    height: "",
    weight: "",
    color: "",
    maritalStatus: "",
    fatherName: "",
    motherName: "",
    siblings: "",
    mobileNo: "",
    email: "",
    address: "",
    district: "",
    state: "",
    education: "",
    jobType: "",
    job: "",
    organization: "",
    income: "",
    community: "",
    caste: "",
    subCaste: "",
    kulam: "",
    gothiram: "",
    country: "",
    city: "",
    birthTime: "",
    birthPlace: "",
    expectedEducation: "",
    expectedCaste: "",
    expectedLocation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Profile Created Successfully!");
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Matrimony Registration Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-semibold text-lg">Personal Details / தனிப்பட்ட விவரங்கள்</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="border p-2 rounded" />
              <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded">
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="height" placeholder="Height" value={formData.height} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="color" placeholder="Complexion" value={formData.color} onChange={handleChange} className="border p-2 rounded" />
              <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="border p-2 rounded">
                <option value="">Select Marital Status</option>
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
                <option value="UNMARRIED">Unmarried</option>
              </select>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-semibold text-lg">Family Details / குடும்ப விவரங்கள்</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="motherName" placeholder="Mother Name" value={formData.motherName} onChange={handleChange} className="border p-2 rounded" />
              <input type="number" name="siblings" placeholder="Number of Siblings" value={formData.siblings} onChange={handleChange} className="border p-2 rounded" />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-semibold text-lg">Contact Details / தொலைபேசி தொடர்பு விவரங்கள்</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="mobileNo" placeholder="Mobile Number" value={formData.mobileNo} onChange={handleChange} className="border p-2 rounded" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="border p-2 rounded" />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-semibold text-lg">Education Details / கல்வி விவரங்கள்</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <textarea name="education" placeholder="Enter Education Details" value={formData.education} onChange={handleChange} className="border p-2 rounded w-full" />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-semibold text-lg">Job Details / வேலை</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="jobType" placeholder="Job Type" value={formData.jobType} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="job" placeholder="Job Title" value={formData.job} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="organization" placeholder="Organization" value={formData.organization} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="income" placeholder="Income" value={formData.income} onChange={handleChange} className="border p-2 rounded" />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-semibold text-lg">Caste Details / சாதி விவரங்கள்</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="community" placeholder="Community" value={formData.community} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="caste" placeholder="Caste" value={formData.caste} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="subCaste" placeholder="Sub Caste" value={formData.subCaste} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="kulam" placeholder="Kulam" value={formData.kulam} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="gothiram" placeholder="Gothiram" value={formData.gothiram} onChange={handleChange} className="border p-2 rounded" />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-semibold text-lg">Location Details / இருப்பிட விவரங்கள்</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-2 rounded" />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-semibold text-lg">Horoscope Details / ஜாதக விவரங்கள்</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <input type="time" name="birthTime" placeholder="Birth Time" value={formData.birthTime} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="birthPlace" placeholder="Birth Place" value={formData.birthPlace} onChange={handleChange} className="border p-2 rounded" />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-semibold text-lg">Expectation Details / எதிர்பார்ப்பு விவரங்கள்</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="expectedEducation" placeholder="Expected Education" value={formData.expectedEducation} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="expectedCaste" placeholder="Expected Caste" value={formData.expectedCaste} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="expectedLocation" placeholder="Expected Location" value={formData.expectedLocation} onChange={handleChange} className="border p-2 rounded" />
            </div>
          </AccordionDetails>
        </Accordion>

        <div className="pt-6">
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            {loading ? "Creating Profile..." : "Create Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationPage;
