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
  
  function ModalCommunity({ setCommunityModal, communitymodal,setRefresh ,refresh}) {
    const [communityName, setcommunityName] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      axios
        .post(`${import.meta.env.VITE_API_URL}/community`, { communityName }) // Send as an object
        .then((res) => {
          console.log(res);
          toast.success('Community added successfully!'); // Success toast
          setCommunityModal(false); // Close the modal
          setRefresh(!refresh)
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to add community. Please try again.'); // Error toast
        });
    };
  
    return (
      <div>
        <CModal visible={communitymodal} onClose={() => setCommunityModal(false)}>
          <CForm onSubmit={handleSubmit}>
            <CModalHeader>Add Community</CModalHeader>
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
  