import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CatesModal({ casteModal, setCasteModal, communityData, refresh, setRefresh }) {
  const [caste, setCaste] = useState('')
  const [communityId, setCommunitiId] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent default form behavior
    axios
      .post(`${import.meta.env.VITE_API_URL}/caste`, { communityId, casteName: caste })
      .then((res) => {
        console.log(res)
        toast.success('Caste added successfully!')
        setCasteModal(false) // Close the modal
        setRefresh(!refresh)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to add caste. Please try again.')
      })
  }

  return (
    <div>
      <CModal visible={casteModal} onClose={() => setCasteModal(false)}>
        <CForm onSubmit={handleSubmit}>
          <CModalHeader>Add Caste</CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <CFormInput
                type="text"
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
                name="caste"
                placeholder="Enter Caste"
              />
            </div>
            <div className="mb-3">
              <CFormSelect onChange={(e) => setCommunitiId(e.target.value)} name="dosham">
                <option value="">Select Community</option>
                {communityData.map((m) => (
                  <option key={m.communityId} value={m.communityId}>
                    {m.communityName}
                  </option>
                ))}
              </CFormSelect>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="primary">
              Save
            </CButton>
            <CButton color="secondary" onClick={() => setCasteModal(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
      <ToastContainer /> {/* React Toastify container */}
    </div>
  )
}

export default CatesModal
