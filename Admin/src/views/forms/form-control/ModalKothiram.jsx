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
  
  function ModalKothiram({ kothiramModal, setKothirammModal,setRefresh ,refresh,kulamData}) {
    const [name, setName] = useState('');
    const [kulamId, setkulamId] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post(`${import.meta.env.VITE_API_URL}/kothirams`, { name,kulamId })
        .then((res) => {
          console.log(res);
          toast.success('kothirams added successfully!'); 
          setKothirammModal(false); 
          setRefresh(!refresh)
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to add kothirams. Please try again.');
        });
    };
  
    return (
      <div>
        <CModal visible={kothiramModal} onClose={() => setKothirammModal(false)}>
          <CForm onSubmit={handleSubmit}>
            <CModalHeader>Add Kothiram</CModalHeader>
            <CModalBody>
              <div className="mb-3">
                <CFormInput
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  placeholder="Enter Kothiram"
                />
              </div>
              <div className="mb-3">
                <CFormSelect onChange={(e) => setkulamId(e.target.value)} name="subCasteId">
                  <option value="">Select Kulam</option>
                  {kulamData.map((m) => (
                    <option key={m.kulamId} value={m.kulamId}>
                      {m.name}
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
  
  export default ModalKothiram;
  