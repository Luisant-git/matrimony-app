import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalSubCaste({ setSubCasteModal, subcasteModal,setRefresh ,refresh,casteData}) {
  const [subCasteName, setsubCasteName] = useState('');
  const [casteId, setcasteId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    axios
      .post(`${import.meta.env.VITE_API_URL}/sub-caste`, { subCasteName,casteId })
      .then((res) => {
        console.log(res);
        toast.success('Porvikam added successfully!'); 
        setSubCasteModal(false); 
        setRefresh(!refresh)
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to add Porvikam. Please try again.');
      });
  };

  return (
    <div>
      <CModal visible={subcasteModal} onClose={() => setSubCasteModal(false)}>
        <CForm onSubmit={handleSubmit}>
          <CModalHeader>Add Porvikam</CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <CFormInput
                type="text"
                value={subCasteName}
                onChange={(e) => setsubCasteName(e.target.value)} // Update state on input change
                name="porvikam"
                placeholder="Enter Porvikam"
              />
            </div>
            <div className="mb-3">
              <CFormSelect onChange={(e) => setcasteId(e.target.value)} name="dosham">
                <option value="">Select Caste</option>
                {casteData.map((m) => (
                  <option key={m.casteId} value={m.casteId}>
                    {m.casteName}
                  </option>
                ))}
              </CFormSelect>
            </div>
          </CModalBody>
      
          <CModalFooter>
            <CButton type="submit" color="primary">
              Save
            </CButton>
            <CButton color="secondary" onClick={() => setCommunityModal(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
   <ToastContainer/>
    </div>
  );
}

export default ModalSubCaste;
