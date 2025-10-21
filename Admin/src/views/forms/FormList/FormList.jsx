import React, { useEffect, useState } from 'react'
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
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import UserDetailsModal from './UserDetailsModal'

function FormList() {
  const [userData, setUserData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [statusFilter, setStatusFilter] = useState('All')
  const [genderFilter, setGenderFilter] = useState('All')
  const [districtFilter, setDistrictFilter] = useState('All')
  const [educationFilter, setEducationFilter] = useState('All')
  const [jobTypeFilter, setJobTypeFilter] = useState('All')
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' })
  const [selectedUser, setSelectedUser] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [deactivateModalVisible, setDeactivateModalVisible] = useState(false)
  const [deactivateReason, setDeactivateReason] = useState('')
  const [deactivateOtherText, setDeactivateOtherText] = useState('')
  const [userToDeactivate, setUserToDeactivate] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Fetch all users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/data`)
        const data = await response.json()
        setUserData(data)
        setFilteredData(data)
      } catch (error) {
        console.error('Error fetching user data: ', error)
      }
    }
    fetchData()
  }, [])

  // Filter users
  const filterData = (status, gender, district, education, jobType) => {
    const filtered = userData.filter((user) => {
      const matchesStatus =
        status === 'All' ||
        (status === 'Activated' && user.isActive) ||
        (status === 'Deactivated' && !user.isActive)
      const matchesGender = gender === 'All' || user.gender === gender
      const matchesDistrict =
        district === 'All' ||
        (user.district && user.district.trim().toLowerCase() === district.trim().toLowerCase())
      const matchesEducation = education === 'All' || user.education === education
      const matchesJobType = jobType === 'All' || user.job_type === jobType

      return matchesStatus && matchesGender && matchesDistrict && matchesEducation && matchesJobType
    })
    setFilteredData(filtered)
    setCurrentPage(1)
  }

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'status':
        setStatusFilter(value)
        filterData(value, genderFilter, districtFilter, educationFilter, jobTypeFilter)
        break
      case 'gender':
        setGenderFilter(value)
        filterData(statusFilter, value, districtFilter, educationFilter, jobTypeFilter)
        break
      case 'district':
        setDistrictFilter(value)
        filterData(statusFilter, genderFilter, value, educationFilter, jobTypeFilter)
        break
      case 'education':
        setEducationFilter(value)
        filterData(statusFilter, genderFilter, districtFilter, value, jobTypeFilter)
        break
      case 'jobType':
        setJobTypeFilter(value)
        filterData(statusFilter, genderFilter, districtFilter, educationFilter, value)
        break
      default:
        break
    }
  }

  // Sort function
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    const sorted = [...filteredData].sort((a, b) =>
      direction === 'asc' ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1
    )
    setFilteredData(sorted)
  }

  // View details
  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setModalVisible(true)
  }

  // Delete user
  const handleDeleteUser = async (user) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/user/data/${user.userId}`)
      if (response.status === 200) {
        toast.success('User deleted successfully')
        setUserData(userData.filter((u) => u.userId !== user.userId))
        filterData(statusFilter, genderFilter, districtFilter, educationFilter, jobTypeFilter)
      } else {
        toast.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('An error occurred while deleting the user')
    }
  }

  // Activate user by ID
  const handleActivateUser = async (user) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/user/data/${user.userId}`, {
        isActive: true,
        deactivationReason: null,
        deactivatedAt: null,
      })
      toast.success('User activated')
      const updatedUsers = userData.map((u) =>
        u.userId === user.userId ? { ...u, isActive: true, deactivationReason: null } : u
      )
      setUserData(updatedUsers)
      filterData(statusFilter, genderFilter, districtFilter, educationFilter, jobTypeFilter)
    } catch (err) {
      console.error(err)
      toast.error('Failed to activate user')
    }
  }

  // Deactivate user by ID
  const handleDeactivateUser = async () => {
    if (!userToDeactivate || !deactivateReason) {
      toast.error('Please select a reason')
      return
    }
    const reasonText = deactivateReason === 'other' ? deactivateOtherText : deactivateReason
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/user/data/${userToDeactivate.userId}`, {
        isActive: false,
        deactivationReason: reasonText,
      })
      toast.success('User deactivated')
      const updatedUsers = userData.map((u) =>
        u.userId === userToDeactivate.userId
          ? { ...u, isActive: false, deactivationReason: reasonText }
          : u
      )
      setUserData(updatedUsers)
      filterData(statusFilter, genderFilter, districtFilter, educationFilter, jobTypeFilter)
      setDeactivateModalVisible(false)
      setDeactivateReason('')
      setDeactivateOtherText('')
      setUserToDeactivate(null)
    } catch (err) {
      console.error(err)
      toast.error('Failed to deactivate user')
    }
  }

  return (
    <div>
      {/* Filters */}
      <CCard>
        <CCardBody>
          <CRow className="justify-content-between">
            {/* Status Filter */}
            <CCol xs="12" md="6" lg="3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="All">All Users</option>
                <option value="Activated">Activated</option>
                <option value="Deactivated">Deactivated</option>
              </select>
            </CCol>

            {/* Gender Filter */}
            <CCol xs="12" md="6" lg="2">
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

            {/* District Filter */}
            <CCol xs="12" md="6" lg="3">
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

            {/* Add Button */}
            <CCol xs="6" md="6" lg="1" className="d-flex ms-auto">
              <Link to="/forms/form-control">
                <button className="btn btn-success text-white w-100">Add</button>
              </Link>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {/* Table */}
      <CCard className="mt-3">
        <CCardBody>
          <CTable striped bordered hover>
            <CTableHead>
              <CTableRow>
                <th>Avatar</th>
                <th onClick={() => handleSort('fullName')}>Name</th>
                <th onClick={() => handleSort('email')}>Email</th>
                <th onClick={() => handleSort('gender')}>Gender</th>
                <th onClick={() => handleSort('district')}>District</th>
                <th>Status</th>
                <th>Actions</th>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredData
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((user) => (
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
                    <CTableDataCell>{user.district}</CTableDataCell>
                    <CTableDataCell>{user.isActive ? 'Activated' : 'Deactivated'}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="primary" onClick={() => handleViewDetails(user)}>
                        View Details
                      </CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => handleDeleteUser(user)}>
                        Delete
                      </CButton>
                      <Link to={`/forms/update/${user.userId}`}>
                        <CButton color="secondary" className="ms-2">
                          Update
                        </CButton>
                      </Link>
                      {user.isActive ? (
                        <CButton
                          color="danger"
                          className="ms-2"
                          onClick={() => {
                            setUserToDeactivate(user)
                            setDeactivateModalVisible(true)
                          }}
                        >
                          Deactivate
                        </CButton>
                      ) : (
                        <CButton color="success" className="ms-2" onClick={() => handleActivateUser(user)}>
                          Activate
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedUser={selectedUser}
        />
      )}

      {/* Deactivate Modal */}
      <CModal visible={deactivateModalVisible} onClose={() => setDeactivateModalVisible(false)}>
        <CModalHeader>Deactivate User</CModalHeader>
        <CModalBody>
          <p>Please choose a reason for deactivation:</p>
          <select
            className="form-select mb-2"
            value={deactivateReason}
            onChange={(e) => setDeactivateReason(e.target.value)}
          >
            <option value="">Select reason</option>
            <option value="got_married">Got Married</option>
            <option value="improper_behavior">Improper Behavior</option>
            <option value="other">Other</option>
          </select>
          {deactivateReason === 'other' && (
            <input
              type="text"
              className="form-control"
              placeholder="Specify reason"
              value={deactivateOtherText}
              onChange={(e) => setDeactivateOtherText(e.target.value)}
            />
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeactivateModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDeactivateUser}>
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default FormList;
