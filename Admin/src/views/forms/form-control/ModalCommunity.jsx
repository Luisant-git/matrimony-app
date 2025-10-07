import {
    CButton,
    CForm,
    CFormInput,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
  } from '@coreui/react';
  import axios from 'axios';
  import React, { useState } from 'react';
  import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  function ModalCommunity({ setCommunityModal, communitymodal,setRefresh ,refresh, editData = null, isEdit = false}) {
    const [communityName, setcommunityName] = useState(editData?.communityName || '');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const url = isEdit 
        ? `${import.meta.env.VITE_API_URL}/community/${editData.communityId}`
        : `${import.meta.env.VITE_API_URL}/community`;
      const method = isEdit ? 'patch' : 'post';
      
      axios[method](url, { communityName })
        .then((res) => {
          console.log(res);
          toast.success(`Community ${isEdit ? 'updated' : 'added'} successfully!`);
          setCommunityModal(false);
          setRefresh(!refresh)
          setcommunityName('');
        })
        .catch((err) => {
          console.error(err);
          toast.error(`Failed to ${isEdit ? 'update' : 'add'} community. Please try again.`);
        });
    };
  
    return (
      <div>
        <CModal visible={communitymodal} onClose={() => setCommunityModal(false)}>
          <CForm onSubmit={handleSubmit}>
            <CModalHeader>{isEdit ? 'Edit' : 'Add'} Community</CModalHeader>
            <CModalBody>
              <div className="mb-3">
                <CFormInput
                  type="text"
                  value={communityName}
                  onChange={(e) => setcommunityName(e.target.value)} // Update state on input change
                  name="communityName"
                  placeholder="Enter Community"
                />
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
     
      </div>
    );
  }
  
  export default ModalCommunity;
  