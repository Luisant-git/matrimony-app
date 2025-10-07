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
  
  function ModalKulam({ kulamModal, setKulamModal,setRefresh ,refresh,subCasteData}) {
    const [name, setKulamName] = useState('');
    const [subCasteId, setsubCasteId] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post(`${import.meta.env.VITE_API_URL}/kulams`, { name,subCasteId })
        .then((res) => {
          console.log(res);
          toast.success('kulams added successfully!'); 
          setKulamModal(false); 
          setRefresh(!refresh)
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to add kulams. Please try again.');
        });
    };
  
    return (
      <div>
        <CModal visible={kulamModal} onClose={() => setKulamModal(false)}>
          <CForm onSubmit={handleSubmit}>
            <CModalHeader>Add Kulam</CModalHeader>
            <CModalBody>
              <div className="mb-3">
                <CFormInput
                  type="text"
                  value={name}
                  onChange={(e) => setKulamName(e.target.value)}
                  name="name"
                  placeholder="Enter Kulam"
                />
              </div>
              <div className="mb-3">
                <CFormSelect onChange={(e) => setsubCasteId(e.target.value)} name="subCasteId">
                  <option value="">Select Porvikam</option>
                  {subCasteData.map((m) => (
                    <option key={m.subCasteId} value={m.subCasteId}>
                      {m.SubCasteName}
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
  
  export default ModalKulam;
  