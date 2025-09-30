import { CButton, CForm, CFormInput, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import React from 'react'

function ModalSibilings({addSibling,handleInputChange,newSibling,setModalVisible,modalVisible}) {
  return (
    <div>
             <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CModalHeader>Add New Sibling</CModalHeader>
          <CModalBody>
            <CForm>
              {/* Name */}
              <div className="mb-3">
                <CFormInput
                  type="text"
                  name="name"
                  placeholder="Enter sibling name"
                  value={newSibling.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Gender */}
              <div className="mb-3">
                <CFormSelect required name="gender" value={newSibling.gender} onChange={handleInputChange}>
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </CFormSelect>
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={addSibling}>
              Save
            </CButton>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
    </div>
  )
}

export default ModalSibilings