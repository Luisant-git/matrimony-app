import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CRow, CCol, CTable, CTableBody, CTableHead, CTableRow, CTableDataCell, CButton, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Optional, for alert messages
import UserDetailsModal from './UserDetailsModal';
function FormList() {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [genderFilter, setGenderFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [educationFilter, setEducationFilter] = useState('All');
  const [jobTypeFilter, setJobTypeFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const[refresh,setRefresh]=useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/data`);
        const data = await response.json();
        setUserData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };
    fetchData();
  }, [refresh]);
  const filterData = (searchTerm, gender, state, district, education, jobType) => {
    const filtered = userData.filter((user) => {
      const normalizedSearchTerm = searchTerm.trim().toLowerCase();
      const normalizedDistrict = district.trim().toLowerCase();
  
      const matchesSearch =
        user.fullName.toLowerCase().includes(normalizedSearchTerm) ||
        user.email.toLowerCase().includes(normalizedSearchTerm) ||
        user.mobileNo.includes(normalizedSearchTerm);
  
      const matchesGender = gender === 'All' || user.gender === gender;
      const matchesState = state === 'All' || user.state === state;
      const matchesDistrict =
        district === 'All' ||
        (user.district && user.district.trim().toLowerCase() === normalizedDistrict);
      const matchesEducation = education === 'All' || user.education === education;
      const matchesJobType = jobType === 'All' || user.job_type === jobType;
  
      return (
        matchesSearch &&
        matchesGender &&
        matchesState &&
        matchesDistrict &&
        matchesEducation &&
        matchesJobType
      );
    });
  
    setFilteredData(filtered);
  };
  

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterData(value, genderFilter, stateFilter, districtFilter, educationFilter, jobTypeFilter);
  };

  const handleFilterChange = (filterType, value) => {
    const normalizedValue = value.trim().toLowerCase();
    switch (filterType) {
      case 'gender':
        setGenderFilter(value);
        filterData(searchQuery, value, stateFilter, districtFilter, educationFilter, jobTypeFilter);
        break;
      case 'state':
        setStateFilter(value);
        filterData(searchQuery, genderFilter, value, districtFilter, educationFilter, jobTypeFilter);
        break;
      case 'district':
        setDistrictFilter(value);
        filterData(searchQuery, genderFilter, stateFilter, value, educationFilter, jobTypeFilter);
        break;
      case 'education':
        setEducationFilter(value);
        filterData(searchQuery, genderFilter, stateFilter, districtFilter, value, jobTypeFilter);
        break;
      case 'jobType':
        setJobTypeFilter(value);
        filterData(searchQuery, genderFilter, stateFilter, districtFilter, educationFilter, value);
        break;
      default:
        break;
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    const sortedData = [...filteredData].sort((a, b) => {
      if (direction === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setFilteredData(sortedData);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };



  
const handleDeleteUser = async (userId) => {
  const endpoint = `${import.meta.env.VITE_API_URL}/user/data/${userId.userId}`;
  
  try {
    const response = await axios.delete(endpoint);
    if (response.status === 200) {
      toast.success('User deleted successfully');
      setRefresh(!refresh)
      // Optionally, refresh the user list or update the state
    } else {
      toast.error('Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    toast.error('An error occurred while deleting the user');
  }
};

console.log(selectedUser);

  return (
    <div>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xs="12" md="6" lg="3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="form-control"
              />
            </CCol>
            <CCol xs="12" md="6" lg="3">
              <select
                className="form-select"
                value={genderFilter}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
              >
                <option value="All">All Genders</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </CCol>
            <CCol xs="12" md="6" lg="3">
              <select
                className="form-select"
                value={stateFilter}
                onChange={(e) => handleFilterChange('state', e.target.value)}
              >
                <option value="All">All States</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
              </select>
            </CCol>
            <CCol xs="12" md="6" lg="2">
              <select
                className="form-select"
                value={districtFilter}
                onChange={(e) => handleFilterChange('district', e.target.value)}
              >
                <option value="All">All Districts</option>
             
<option value="Ariyalur">Ariyalur</option>
<option value="Chengalpattu">Chengalpattu</option>
<option value="Chennai">Chennai</option>
<option value="Coimbatore">Coimbatore</option>
<option value="Cuddalore">Cuddalore</option>
<option value="Dharmapuri">Dharmapuri</option>
<option value="Dindigul">Dindigul</option>
<option value="Erode">Erode</option>
<option value="Kallakurichi">Kallakurichi</option>
<option value="Kanchipuram">Kanchipuram</option>
<option value="Kanyakumari">Kanyakumari</option>
<option value="Karur">Karur</option>
<option value="Krishnagiri">Krishnagiri</option>
<option value="Madurai">Madurai</option>
<option value="Mayiladuthurai">Mayiladuthurai</option>
<option value="Nagapattinam">Nagapattinam</option>
<option value="Namakkal">Namakkal</option>
<option value="Nilgiris">Nilgiris</option>
<option value="Perambalur">Perambalur</option>
<option value="Pudukkottai">Pudukkottai</option>
<option value="Ramanathapuram">Ramanathapuram</option>
<option value="Ranipet">Ranipet</option>
<option value="Salem">Salem</option>
<option value="Sivaganga">Sivaganga</option>
<option value="Tenkasi">Tenkasi</option>
<option value="Thanjavur">Thanjavur</option>
<option value="Theni">Theni</option>
<option value="Thiruvallur">Thiruvallur</option>
<option value="Thiruvarur">Thiruvarur</option>
<option value="Thoothukudi">Thoothukudi</option>
<option value="Tiruchirappalli">Tiruchirappalli</option>
<option value="Tirunelveli">Tirunelveli</option>
<option value="Tirupathur">Tirupathur</option>
<option value="Tiruppur">Tiruppur</option>
<option value="Tiruvannamalai">Tiruvannamalai</option>
<option value="Vellore">Vellore</option>
<option value="Viluppuram">Viluppuram</option>
<option value="Virudhunagar">Virudhunagar</option>

              </select>
            </CCol>
            <CCol xs="12" md="6" lg="1">
            <Link to='/forms/form-control'> <button className='btn btn-success text-white'>Add</button></Link>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="mt-3">
        <CCardBody>
          <CTable striped bordered className="mt-3">
            <CTableHead>
              <CTableRow>
                <th>Avatar</th>
                <th onClick={() => handleSort('fullName')}>Name</th>
                <th onClick={() => handleSort('email')}>Email</th>
                <th onClick={() => handleSort('gender')}>Gender</th>
                <th onClick={() => handleSort('state')}>State</th>
                <th onClick={() => handleSort('district')}>District</th>
                <th>Actions</th>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredData.map((user) => (
                <CTableRow key={user.userId}>
                  <CTableDataCell>
                    <img
                      className="rounded-circle"
                      width={50}
                      height={50}
                      src={user.userProfile[0]}
                      alt=""
                    />
                  </CTableDataCell>
                  <CTableDataCell>{user.fullName}</CTableDataCell>
                  <CTableDataCell>{user.email}</CTableDataCell>
                  <CTableDataCell>{user.gender}</CTableDataCell>
                  <CTableDataCell>{user.state}</CTableDataCell>
                  <CTableDataCell>{user.district}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" onClick={() => handleViewDetails(user)}>
                      View Details
                    </CButton>
                    <CButton color="secondary" className='ms-2' onClick={() => handleDeleteUser(user)}>
                     Delete
                    </CButton>
                    
                    <Link to={`/forms/update/${user.userId}`}><CButton color="secondary" className='ms-2' >Update
                    </CButton></Link>

                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {selectedUser && (
       <UserDetailsModal modalVisible={modalVisible} setModalVisible={setModalVisible} selectedUser={selectedUser}/>
      )}
    </div>
  );
}

export default FormList;
