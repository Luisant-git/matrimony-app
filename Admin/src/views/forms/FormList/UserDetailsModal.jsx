import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CRow,
  CCol
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faUser, faVenusMars, faMapMarkerAlt, faBirthdayCake, faBuilding, faWeight, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

const UserDetailsModal = ({ modalVisible, setModalVisible, selectedUser }) => {
  return (
    <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg">
      <CModalHeader>
        <CModalTitle>User Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="text-center mb-4">
          {selectedUser.userProfile.map((profile, index) => (
            <img
              key={index}
              className="rounded-circle mx-2"
              width={100}
              height={100}
              src={profile}
              alt={`Profile ${index + 1}`}
            />
          ))}
          <h4 className="mt-3">{selectedUser.fullName}</h4>
        </div>
        <CRow>
          <CCol xs="12" md="6">
            <p><FontAwesomeIcon icon={faEnvelope} className="me-2" /><strong>Email:</strong> {selectedUser.email}</p>
            <p><FontAwesomeIcon icon={faPhone} className="me-2" /><strong>Mobile:</strong> {selectedUser.mobileNo}</p>
            <p><FontAwesomeIcon icon={faVenusMars} className="me-2" /><strong>Gender:</strong> {selectedUser.gender}</p>
            <p><FontAwesomeIcon icon={faBirthdayCake} className="me-2" /><strong>Date of Birth:</strong> {formatDOB(selectedUser.dateOfBirth)}</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /><strong>Birth Place:</strong> {selectedUser.birthPlace || "Not Provided"}</p>
          </CCol>
          <CCol xs="12" md="6">
            <p><strong>State:</strong> {selectedUser.state}</p>
            <p><strong>District:</strong> {selectedUser.district}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
            <p><strong>Education:</strong> {selectedUser.education}</p>
            <p><FontAwesomeIcon icon={faBuilding} className="me-2" /><strong>Job Type:</strong> {selectedUser.job_type}</p>
            <p><strong>Organization:</strong> {selectedUser.organization}</p>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12" md="6">
            <p><FontAwesomeIcon icon={faWeight} className="me-2" /><strong>Height:</strong> {selectedUser.height} cm</p>
            <p><FontAwesomeIcon icon={faWeight} className="me-2" /><strong>Weight:</strong> {selectedUser.weight} kg</p>
            <p><strong>Color:</strong> {selectedUser.color}</p>
          </CCol>
          <CCol xs="12" md="6">
            <p><FontAwesomeIcon icon={faRupeeSign} className="me-2" /><strong>Income:</strong> {selectedUser.income}</p>
            <p><strong>Marital Status:</strong> {selectedUser.maritalStatus}</p>
            <p><strong>Own House:</strong> {selectedUser.ownHouse ? "Yes" : "No"}</p>
          </CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol xs="12">
            <h5>Siblings</h5>
            {selectedUser.siblings.map((sibling, index) => (
              <p key={index}><strong>{sibling.name}</strong> ({sibling.gender})</p>
            ))}
          </CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol xs="12">
            <h5>Jathagam</h5>
            {selectedUser.jathagam.map((jathagam, index) => (
              <div key={index} className="mb-3">
                <p><strong>Rasi:</strong> {jathagam.rasi}</p>
                <p><strong>Natchathiram:</strong> {jathagam.natchathiram}</p>
                <p><strong>Lagnam:</strong> {jathagam.lagnam}</p>
                <p><strong>Dosham:</strong> {jathagam.dosham}</p>
                <p>
                  <a href={jathagam.uploadJathakam} target="_blank" rel="noopener noreferrer">
                    View Jathagam
                  </a>
                </p>
              </div>
            ))}
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setModalVisible(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
  
  // Format date as DD/MM/YYYY
  function formatDOB(dateStr) {
    if (!dateStr) return '';
    // If already in DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return dateStr;
    // If in YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }
    // If in DD/MM/YY
    if (/^\d{2}\/\d{2}\/\d{2}$/.test(dateStr)) {
      const [dd, mm, yy] = dateStr.split('/');
      const yyyy = parseInt(yy, 10) < 50 ? '20' + yy : '19' + yy;
      return `${dd}/${mm}/${yyyy}`;
    }
    return dateStr;
  }

export default UserDetailsModal;
