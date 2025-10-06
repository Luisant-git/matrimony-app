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
} from '@coreui/react'
import React, { useState } from 'react'
import ModalCommunity from './ModalCommunity'
import CatesModal from './CatesModal'
import ModalSubCaste from './ModalSubCaste'
import ModalKulam from './ModalKulam'
import ModalKothiram from './ModalKothiram'

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
}) {
  const [communitymodal, setCommunityModal] = useState(false)
  const [casteModal, setCasteModal] = useState(false)
  const [subcasteModal, setSubCasteModal] = useState(false)
  const [kulamModal, setKulamModal] = useState(false)
  const [kothiramModal, setKothirammModal] = useState(false)

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Profile Form</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
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

            {/* Mobile No */}
            <div className="mb-3">
              <CFormLabel htmlFor="mobileNo">Mobile No</CFormLabel>
              <CFormInput
                name="mobileNo"
                required
                value={formData.mobileNo}
                onChange={handleChange}
                type="text"
                id="mobileNo"
                placeholder="Enter your mobile number"
              />
            </div>
            {/* Email */}
            <div className="mb-3">
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

            {/* Profile Image Upload */}
            <div className="mb-3">
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

            {/* Gender */}
            <div className="mb-3">
              <CFormLabel htmlFor="gender">Gender</CFormLabel>
              <select
                name="gender"
                value={formData.gender}
                required
                onChange={handleChange}
                id="gender"
                className="form-control"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                {/* <option value="OTHER">Other</option> */}
              </select>
            </div>

            {/* Date of Birth */}
            <div className="mb-3">
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

            {/* Birth Time */}
            {/* Birth Time */}
            <div className="mb-3">
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

            {/* Birth Place */}
            <div className="mb-3">
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

            {/* Job */}

            <div className="mb-3">
              <CFormLabel htmlFor="organization">Type Of Job</CFormLabel>
              <CFormSelect
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                required
                id="organization"
              >
                <option>Select your Job</option>
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

            {/* Height */}
            <div className="mb-3">
              <CFormLabel htmlFor="height">Height(In Feet / Inches)</CFormLabel>
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

            {/* Weight */}
            <div className="mb-3">
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

            {/* Color */}
            <div className="mb-3">
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

            {/* Income */}
            <div className="mb-3">
              <CFormLabel htmlFor="income">Income (Per Month)</CFormLabel>
              <CFormInput
                name="income"
                value={formData.income}
                onChange={handleChange}
                required
                type="text"
                id="income"
                placeholder="Enter your income Per Month"
              />
            </div>

            {/* Marital Status */}
            <div className="mb-3">
              <CFormLabel htmlFor="maritalStatus">Marital Status</CFormLabel>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                required
                id="maritalStatus"
                className="form-control"
              >
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
                <option value="DIVORCED">Divorced</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>

            {/* Own House */}
            <div className="mb-3">
              <CFormLabel htmlFor="ownHouse">Own House</CFormLabel>
              <select
                name="ownHouse"
                value={formData.ownHouse}
                onChange={handleChange}
                required
                id="ownHouse"
                className="form-control"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <CFormLabel htmlFor="organization">Community</CFormLabel>
            <div className="mb-3 d-flex align-item-center justify-content-between gap-2">
              <CFormSelect
                name="communityId"
                onChange={handleChange}
                value={formData.communityId}
                required
                id="organization"
              >
                <option>Select your Job</option>
                {communityData?.map((m) => (
                  <option value={m?.communityId}>{m.communityName}</option>
                ))}
              </CFormSelect>
              <button
                className="btn btn-success text-white"
                type="button"
                onClick={() => setCommunityModal(true)}
              >
                Add
              </button>
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
                <option>Select your Job</option>
                {filterdatacast?.map((m) => (
                  <option value={m?.casteId}>{m?.casteName}</option>
                ))}
              </CFormSelect>
              <button
                className="btn btn-success text-white"
                type="button"
                onClick={() => setCasteModal(true)}
              >
                Add
              </button>
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
              <button
                className="btn btn-success text-white"
                type="button"
                onClick={() => setSubCasteModal(true)}
              >
                Add
              </button>
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
                <option>Select your Job</option>
                {filterdatakulam?.map((m) => (
                  <option value={m?.kulamId}>{m?.name}</option>
                ))}
              </CFormSelect>
              <button
                className="btn btn-success text-white"
                type="button"
                onClick={() => setKulamModal(true)}
              >
                Add
              </button>
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
                <option>Select your Job</option>
                {filterdatakothiram?.map((m) => (
                  <option value={m?.kothiramId}>{m?.name}</option>
                ))}
              </CFormSelect>
              <button
                className="btn btn-success text-white"
                type="button"
                onClick={() => setKothirammModal(true)}
              >
                Add
              </button>
            </div>

            <h4 className="p-2">Address Details</h4>
            <div className="mb-3">
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
            <div className="mb-3">
              <CFormLabel htmlFor="District">District</CFormLabel>
              <CFormInput
                name="district"
                required
                value={formData.district}
                onChange={handleChange}
                type="text"
                id="District"
                placeholder="Enter your District"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="">State</CFormLabel>
              <CFormInput
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                type="text"
                id="State"
                placeholder="Enter your State"
              />
            </div>

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
            <CCard className="mt-3">
              <CCardHeader>
                <h5>Jathagam Details</h5>
                {!jathagam && (
                  <CButton color="primary" size="sm" onClick={() => setModalVisibles(true)}>
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
            {/* Submit Button */}
            <div className="mb-3 mt-3">
              <CButton color="primary" type="submit">
                Submit
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>

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
    </div>
  )
}

export default FormAdd
