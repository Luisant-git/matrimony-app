import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableDataCell,
} from '@coreui/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io(import.meta.env.VITE_API_URL);

function ReList() {
  const [registrationData, setRegistrationData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false); // To enable/disable sound
  const notificationSound = new Audio('http://195.35.22.221:3027/tone.wav');

  const handlePlaySound = () => {
    if (isSoundEnabled) {
      notificationSound.play().catch((err) => {
        console.error('Audio playback failed:', err);
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/registration`);
        const data = await response.json();
        setRegistrationData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching registration data:', error);
      }
    };

    fetchData();

    socket.on('registrationUpdate', (updatedData) => {
      notifyUser('New registration data received!');
      setRegistrationData(updatedData);
      filterData(searchQuery, updatedData);
      handlePlaySound(); // Ensure sound plays when new data arrives
    });

    socket.on('registrationCreated', (newRegistration) => {
      toast.success('New registration created!');
      console.log('New registration event received:', newRegistration);
      handlePlaySound(); // Trigger sound when registration is created
    });

    return () => {
      socket.off('registrationUpdate');
      socket.off('registrationCreated');
    };
  }, [searchQuery, isSoundEnabled]); // Include `isSoundEnabled` to listen for changes

  const notifyUser = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    if (Notification.permission === 'granted') {
      new Notification('Notification', {
        body: message,
        icon: '/notification-icon.png',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Notification', {
            body: message,
            icon: '/notification-icon.png',
          });
        }
      });
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterData(value, registrationData);
  };

  const filterData = (searchTerm, data) => {
    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.number.includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  // Toggle sound on/off
  const handleToggleSound = (e) => {
    setIsSoundEnabled(e.target.checked);
  };

  return (
    <div>
      <ToastContainer />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xs="12" md="6" lg="3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e)}
                className="form-control"
              />
            </CCol>
            <CCol xs="12" md="6" lg="3" className="mt-3">
              <div>
                <label htmlFor="soundToggle">Enable Sound : </label>
                <input
                  id="soundToggle"
                  className='ms-2'
                  type="checkbox"
                  checked={isSoundEnabled}
                  onChange={handleToggleSound}
                />
              </div>
            </CCol>
          </CRow>

          <CTable striped bordered hover className="mt-3">
            <CTableHead>
              <CTableRow>
                <th>Name</th>
                <th>Number</th>
                <th>Email</th>
                <th>Looking For</th>
                <th>Profile For</th>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredData.map((item) => (
                <CTableRow key={item.id}>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.number}</CTableDataCell>
                  <CTableDataCell>{item.email}</CTableDataCell>
                  <CTableDataCell>{item.looking_For}</CTableDataCell>
                  <CTableDataCell>{item.this_profile_for}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default ReList;
