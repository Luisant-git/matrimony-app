import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CListGroup,
  CListGroupItem,
  CProgress,
} from '@coreui/react'
import React, { useState, useMemo } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ModalCommunity from './ModalCommunity'
import CatesModal from './CatesModal'
import ModalSubCaste from './ModalSubCaste'
import ModalKulam from './ModalKulam'
import ModalKothiram from './ModalKothiram'
import InlineDropdownManager from './InlineDropdownManager'

function FormAdd({
  communityData,
  profileImages,
  handleChange,
  handleSubmit,
  formData,
  handleImageChange,
  siblings,
  jathagam,
  setModalVisibles,
  setModalVisible,
  removeSibling,
  filterdatacast,
  setRefresh,
  refresh,
  filterdatakothiram,
  filterdatakulam,
  filterdatasubcaste,
  subCasteData,
  kulamData,
  kothirams,
  casteData,
  removeProfileImage,
  editJathagam,
  deleteJathagam,
  indianStates,
}) {
  const [communitymodal, setCommunityModal] = useState(false)
  const [casteModal, setCasteModal] = useState(false)
  const [subcasteModal, setSubCasteModal] = useState(false)
  const [kulamModal, setKulamModal] = useState(false)
  const [kothiramModal, setKothirammModal] = useState(false)
  const [manageModal, setManageModal] = useState({ visible: false, type: '', data: [], parentData: [] })
  const progressPercentage = useMemo(() => {
    const requiredFields = [
      'fullName', 'mobileNo', 'email', 'gender', 'dateOfBirth', 'birthTime', 'birthPlace',
      'maritalStatus', 'height', 'weight', 'color', 'education', 'job_type', 'job',
      'organization', 'income', 'ownHouse', 'communityId', 'casteId', 'subCasteId',
      'kulamId', 'kothiramId', 'address', 'district'
    ]
    const filledFields = requiredFields.filter(field => formData[field] && formData[field] !== '')
    return Math.round((filledFields.length / requiredFields.length) * 100)
  }, [formData])

  return (
    <div className="d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: 900 }}>
        <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <strong>Profile Form</strong>
            <small className="text-muted">{progressPercentage}% Complete</small>
          </div>
          <CProgress value={progressPercentage} className="mt-2" />
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <Accordion defaultExpanded className="mb-3">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="personal-content"
                id="personal-header"
                className="section-heading"
              >
                Personal Details / தனிப்பட்ட விவரங்கள்
              </AccordionSummary>
              <AccordionDetails>
              <div className="row g-3">
                <div className="col-md-6">
                  <CFormLabel htmlFor="fullName">Full Name</CFormLabel>
                  <CFormInput
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="mobileNo">Mobile Number</CFormLabel>
                  <CFormInput
                    name="mobileNo"
                    required
                    value={formData.mobileNo}
                    onChange={handleChange}
                    type="text"
                    id="mobileNo"
                    placeholder="Enter mobile number"
                  />
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="email">Email</CFormLabel>
                  <CFormInput
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    type="email"
                    id="email"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="gender">Gender</CFormLabel>
                  <CFormSelect
                    name="gender"
                    value={formData.gender}
                    required
                    onChange={handleChange}
                    id="gender"
                  >
                    <option value="">Select your gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </CFormSelect>
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="dateOfBirth">Date of Birth</CFormLabel>
                  <CFormInput
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    required
                    onChange={handleChange}
                    type="date"
                    id="dateOfBirth"
                    placeholder="Select your date of birth"
                  />
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="maritalStatus">Marital Status</CFormLabel>
                  <CFormSelect
                    name="maritalStatus"
                    value={formData.maritalStatus || ""}
                    onChange={handleChange}
                    required
                    id="maritalStatus"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="OTHERS">Others</option>
                  </CFormSelect>
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="birthPlace">Birth Place</CFormLabel>
                  <CFormInput
                    required
                    type="text"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    id="birthPlace"
                    placeholder="Enter your birth place"
                  />
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="birthTime">Birth Time</CFormLabel>
                  <CFormInput
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleChange}
                    required
                    type="time"
                    id="birthTime"
                    placeholder="Enter your birth time"
                  />
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="height">Height (In Feet / Inches)</CFormLabel>
                  <CFormInput
                    name="height"
                    value={formData.height}
                    required
                    onChange={handleChange}
                    type="number"
                    step="0.1"
                    id="height"
                    placeholder="Enter your height (e.g., 5.5)"
                  />
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="weight">Weight</CFormLabel>
                  <CFormInput
                    name="weight"
                    value={formData.weight}
                    required
                    onChange={handleChange}
                    type="number"
                    step="0.1"
                    id="weight"
                    placeholder="Enter your weight in KG (e.g., 65.5)"
                  />
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="color">Color / வண்ணம்</CFormLabel>
                  <CFormSelect
                    name="color"
                    value={formData.color}
                    required
                    onChange={handleChange}
                    id="color"
                  >
                    <option value="">
                      Select your color preference / உங்கள் வண்ண விருப்பத்தை தேர்ந்தெடுக்கவும்
                    </option>
                    <option value="fair">Fair / வெள்ளை</option>
                    <option value="light_brown">Light Brown / இளப்பழுப்பு</option>
                    <option value="medium_brown">Medium Brown / மிதப்பழுப்பு</option>
                    <option value="dark_brown">Dark Brown / இரண்டிப்பழுப்பு</option>
                    <option value="black">Black / கறுப்பு</option>
                  </CFormSelect>
                </div>

                <div className="col-12">
                  <CFormLabel htmlFor="profileImage">Profile Images</CFormLabel>
                  <CFormInput
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    multiple
                    // required
                    onChange={handleImageChange}
                  />
                  {profileImages.length > 0 && (
                    <div className="mt-2 d-flex flex-wrap">
                      {profileImages.map((image, index) => (
                        <div
                          key={index}
                          style={{ position: 'relative', width: 100, height: 100, margin: 5 }}
                        >
                          <img
                            src={image}
                            alt={`Profile Preview ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: 4,
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            style={{ position: 'absolute', top: 4, right: 4, padding: '2px 6px' }}
                            onClick={() => removeProfileImage && removeProfileImage(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mb-3">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Education Details
              </AccordionSummary>
              <AccordionDetails>
            <div className="mb-3">
              <CFormLabel htmlFor="caste">Education</CFormLabel>
              <CFormTextarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                id="caste"
                placeholder="Enter your Education"
                rows={3}
              />
            </div>

              </AccordionDetails>
            </Accordion>
            <Accordion className="mb-3">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Job Details
              </AccordionSummary>
              <AccordionDetails>
            <div className="mb-3">
              <CFormLabel htmlFor="organization">Type Of Job</CFormLabel>
              <CFormSelect
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                required
                id="organization"
              >
                <option>Select your Job Type</option>
                <option value="Govt">Govt</option>
                <option value="Private">Private</option>
                <option value="Business">Business</option>
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="job">Job Name</CFormLabel>
              <CFormTextarea
                name="job"
                value={formData.job}
                onChange={handleChange}
                required
                id="job"
                placeholder="Enter your Job"
                rows={3}
              />
            </div>
            {/* Organization */}
            <div className="mb-3">
              <CFormLabel htmlFor="organization">Organization Name</CFormLabel>
              <CFormInput
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                type="text"
                id="organization"
                placeholder="Enter your organization name"
              />
            </div>

            {/* Income - moved under Job Details */}
            <div className="mb-3">
              <CFormLabel htmlFor="income">Income </CFormLabel>
              <CFormInput
                name="income"
                value={formData.income}
                onChange={handleChange}
                required
                type="text"
                id="income"
                placeholder="Enter your income "
              />
            </div>

            {/* (Marital status moved to Personal Details) */}

              </AccordionDetails>
            </Accordion>
            <Accordion className="mb-3">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Property Details
              </AccordionSummary>
              <AccordionDetails>
            {/* Own House */}
            <div className="mb-3">
              <CFormLabel htmlFor="ownHouse">Own House</CFormLabel>
              <CFormSelect
                name="ownHouse"
                value={formData.ownHouse || ""}
                onChange={handleChange}
                required
                id="ownHouse"
              >
                <option value="">Select an option</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </CFormSelect>
            </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mb-3">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Caste Details
              </AccordionSummary>
              <AccordionDetails>
            <CFormLabel htmlFor="organization">Community</CFormLabel>
            <div className="mb-3 d-flex align-item-center justify-content-between gap-2">
              <CFormSelect
                name="communityId"
                onChange={handleChange}
                value={formData.communityId}
                required
                id="organization"
              >
                <option>Select your Community</option>
                {communityData?.map((m) => (
                  <option value={m?.communityId}>{m.communityName}</option>
                ))}
              </CFormSelect>
              <div className="d-flex gap-1">
                <button
                  className="btn btn-success text-white btn-sm"
                  type="button"
                  onClick={() => setCommunityModal(true)}
                >
                  Add
                </button>
                <button
                  className="btn btn-info text-white btn-sm"
                  type="button"
                  onClick={() => setManageModal({ visible: true, type: 'community', data: communityData, parentData: [] })}
                >
                  Manage
                </button>
              </div>
            </div>
            <CFormLabel htmlFor="organization">Caste</CFormLabel>
            <div className="mb-3 d-flex align-item-center justify-content-between gap-2">
              <CFormSelect
                name="casteId"
                onChange={handleChange}
                required
                value={formData?.casteId}
                id="organization"
              >
                <option>Select your Caste</option>
                {filterdatacast?.map((m) => (
                  <option value={m?.casteId}>{m?.casteName}</option>
                ))}
              </CFormSelect>
              <div className="d-flex gap-1">
                <button
                  className="btn btn-success text-white btn-sm"
                  type="button"
                  onClick={() => setCasteModal(true)}
                >
                  Add
                </button>
                <button
                  className="btn btn-info text-white btn-sm"
                  type="button"
                  onClick={() => setManageModal({ visible: true, type: 'caste', data: casteData, parentData: communityData })}
                >
                  Manage
                </button>
              </div>
            </div>

            <CFormLabel htmlFor="organization">Porvikam</CFormLabel>
            <div className="mb-3 d-flex align-item-center justify-content-between gap-2">
              <CFormSelect
                name="subCasteId"
                onChange={handleChange}
                required
                value={formData?.subCasteId}
                id="organization"
              >
                <option>Select your Porvikam</option>
                {filterdatasubcaste?.map((m) => (
                  <option value={m?.subCasteId}>{m?.SubCasteName}</option>
                ))}
              </CFormSelect>
              <div className="d-flex gap-1">
                <button
                  className="btn btn-success text-white btn-sm"
                  type="button"
                  onClick={() => setSubCasteModal(true)}
                >
                  Add
                </button>
                <button
                  className="btn btn-info text-white btn-sm"
                  type="button"
                  onClick={() => setManageModal({ visible: true, type: 'subcaste', data: subCasteData, parentData: casteData })}
                >
                  Manage
                </button>
              </div>
            </div>

            <CFormLabel htmlFor="organization">kulam</CFormLabel>
            <div className="mb-3 d-flex align-item-center justify-content-between gap-2">
              <CFormSelect
                name="kulamId"
                onChange={handleChange}
                required
                value={formData?.kulamId}
                id="organization"
              >
                <option>Select your kulam</option>
                {filterdatakulam?.map((m) => (
                  <option value={m?.kulamId}>{m?.name}</option>
                ))}
              </CFormSelect>
              <div className="d-flex gap-1">
                <button
                  className="btn btn-success text-white btn-sm"
                  type="button"
                  onClick={() => setKulamModal(true)}
                >
                  Add
                </button>
                <button
                  className="btn btn-info text-white btn-sm"
                  type="button"
                  onClick={() => setManageModal({ visible: true, type: 'kulam', data: kulamData, parentData: subCasteData })}
                >
                  Manage
                </button>
              </div>
            </div>

            <CFormLabel htmlFor="organization">Kothiram</CFormLabel>
            <div className="mb-3 d-flex align-item-center justify-content-between gap-2">
              <CFormSelect
                name="kothiramId"
                onChange={handleChange}
                required
                value={formData?.kothiramId}
                id="organization"
              >
                <option>Select your Kothiram</option>
                {filterdatakothiram?.map((m) => (
                  <option value={m?.kothiramId}>{m?.name}</option>
                ))}
              </CFormSelect>
              <div className="d-flex gap-1">
                <button
                  className="btn btn-success text-white btn-sm"
                  type="button"
                  onClick={() => setKothirammModal(true)}
                >
                  Add
                </button>
                <button
                  className="btn btn-info text-white btn-sm"
                  type="button"
                  onClick={() => setManageModal({ visible: true, type: 'kothiram', data: kothirams, parentData: kulamData })}
                >
                  Manage
                </button>
              </div>
            </div>

              </AccordionDetails>
            </Accordion>
            <Accordion className="mb-3">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Contact Details / தொடர்பு விவரங்கள்
              </AccordionSummary>
              <AccordionDetails>
              <div className="row g-3">
                <div className="col-md-6">
                  <CFormLabel htmlFor="address">Address</CFormLabel>
                  <CFormTextarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    id="address"
                    required
                    placeholder="Enter your Address"
                    rows={3}
                  />
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="District">District</CFormLabel>
                  <CFormSelect
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    id="District"
                  >
                    <option value="">Select your District</option>
                    <option value="Ariyalur">Ariyalur</option>
                    <option value="Chengalpattu">Chengalpattu</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Cuddalore">Cuddalore</option>
                    <option value="Dharmapuri">Dharmapuri</option>
                    <option value="Dindigul">Dindigul</option>
                    <option value="Erode">Erode</option>
                    <option value="Kallakurichi">Kallakurichi</option>
                    <option value="Kanchipuram">Kanchipuram</option>
                    <option value="Kanyakumari">Kanyakumari</option>
                    <option value="Karur">Karur</option>
                    <option value="Krishnagiri">Krishnagiri</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Mayiladuthurai">Mayiladuthurai</option>
                    <option value="Nagapattinam">Nagapattinam</option>
                    <option value="Namakkal">Namakkal</option>
                    <option value="Perambalur">Perambalur</option>
                    <option value="Pudukkottai">Pudukkottai</option>
                    <option value="Ramanathapuram">Ramanathapuram</option>
                    <option value="Ranipet">Ranipet</option>
                    <option value="Salem">Salem</option>
                    <option value="Sivaganga">Sivaganga</option>
                    <option value="Tenkasi">Tenkasi</option>
                    <option value="Thanjavur">Thanjavur</option>
                    <option value="Theni">Theni</option>
                    <option value="Tirunelveli">Tirunelveli</option>
                    <option value="Tiruchirappalli">Tiruchirappalli</option>
                    <option value="Tiruppur">Tiruppur</option>
                    <option value="Tiruvallur">Tiruvallur</option>
                    <option value="Tiruvannamalai">Tiruvannamalai</option>
                    <option value="Thiruvarur">Thiruvarur</option>
                    <option value="Vellore">Vellore</option>
                    <option value="Viluppuram">Viluppuram</option>
                    <option value="Virudhunagar">Virudhunagar</option>
                    <option value="Nilgiris">Nilgiris</option>
                    <option value="Others">Others</option>
                  </CFormSelect>
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="email">Email address</CFormLabel>
                  <CFormInput
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="col-md-6">
                  <CFormLabel htmlFor="state">State</CFormLabel>
                  <CFormSelect
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    id="state"
                  >
                    <option value="">Select State</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </CFormSelect>
                </div>
              </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mb-3">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Family Details
              </AccordionSummary>
              <AccordionDetails>
            <CCard>
              <CCardHeader>
                <h5>Siblings List</h5>
                <CButton color="primary" size="sm" onClick={() => setModalVisible(true)}>
                  Add Sibling
                </CButton>
              </CCardHeader>
              <CCardBody>
                {siblings.length > 0 ? (
                  <CListGroup>
                    {siblings.map((sibling, index) => (
                      <CListGroupItem
                        key={sibling.siblingId}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>
                            {index + 1}. {sibling.name}
                          </strong>{' '}
                          ({sibling.gender})
                        </div>
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={() => removeSibling(sibling.name)}
                        >
                          <span className="text-white">Remove</span>
                        </CButton>
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                ) : (
                  <p className="text-muted">No siblings added yet.</p>
                )}
              </CCardBody>
            </CCard>
              </AccordionDetails>
            </Accordion>

            {/* Jathagam moved out as its own top-level accordion */}
            <Accordion className="mb-3">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Jathagam Details / ஜாதகம் விவரங்கள்
              </AccordionSummary>
              <AccordionDetails>
                <CCard className="jathagam-card">
                  <CCardHeader>
                    {!jathagam && (
                      <CButton className="btn-jathagam btn-sm" type="button" onClick={() => setModalVisibles(true)}>
                        Add Jathagam
                      </CButton>
                    )}
                  </CCardHeader>
                  <CCardBody>
                    {jathagam && jathagam.length > 0 ? (
                      jathagam.map((item, index) => (
                        <CListGroup key={index} className="mb-3">
                          <CListGroupItem>
                            <strong>Rasi:</strong> {item.rasi}
                          </CListGroupItem>
                          <CListGroupItem>
                            <strong>Natchathiram:</strong> {item.natchathiram}
                          </CListGroupItem>
                          <CListGroupItem>
                            <strong>Lagnam:</strong> {item.lagnam}
                          </CListGroupItem>
                          <CListGroupItem>
                            <strong>Dosham:</strong> {item.dosham ? 'Yes' : 'No'}
                          </CListGroupItem>
                          <CListGroupItem>
                            <strong>Uploaded Jathakam:</strong> {item.uploadJathakam}
                          </CListGroupItem>
                          <CListGroupItem className="d-flex gap-2">
                            <CButton
                              color="warning"
                              size="sm"
                              onClick={() => editJathagam && editJathagam(index)}
                            >
                              Edit
                            </CButton>
                          </CListGroupItem>
                        </CListGroup>
                      ))
                    ) : (
                      <p className="text-muted">No Jathagam added yet.</p>
                    )}
                  </CCardBody>
                </CCard>
              </AccordionDetails>
            </Accordion>
            {/* Submit Button */}
            <div className="mb-3 mt-3">
              <CButton color="primary" type="submit">
                Submit

              </CButton>
            </div>
          </CForm>
        </CCardBody>
        </CCard>
      </div>

      <ModalSubCaste
        refresh={refresh}
        setRefresh={setRefresh}
        setSubCasteModal={setSubCasteModal}
        subcasteModal={subcasteModal}
        casteData={casteData}
      />

      <ModalKulam
        refresh={refresh}
        setRefresh={setRefresh}
        setKulamModal={setKulamModal}
        kulamModal={kulamModal}
        subCasteData={subCasteData}
      />

      <ModalKothiram
        refresh={refresh}
        setRefresh={setRefresh}
        setKothirammModal={setKothirammModal}
        kothiramModal={kothiramModal}
        kulamData={kulamData}
      />

      <ModalCommunity
        refresh={refresh}
        setRefresh={setRefresh}
        communitymodal={communitymodal}
        setCommunityModal={setCommunityModal}
      />
      <CatesModal
        refresh={refresh}
        setRefresh={setRefresh}
        communityData={communityData}
        casteModal={casteModal}
        setCasteModal={setCasteModal}
      />
      
      <InlineDropdownManager
        visible={manageModal.visible}
        onClose={() => setManageModal({ visible: false, type: '', data: [], parentData: [] })}
        type={manageModal.type}
        data={manageModal.data}
        parentData={manageModal.parentData}
        onRefresh={() => {
          setRefresh(!refresh)
          setManageModal({ visible: false, type: '', data: [], parentData: [] })
        }}
      />
    </div>
  )
}

export default FormAdd ;