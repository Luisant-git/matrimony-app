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
import 'react-toastify/dist/ReactToastify.css'
import UserDetailsModal from './UserDetailsModal'

// ✅ Initialize ToastContainer (if not in App.jsx)
import { ToastContainer } from 'react-toastify';

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

  // ✅ Fetch all users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/data`)
        setUserData(response.data)
        setFilteredData(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
        toast.error('Failed to fetch user data')
      }
    }
    fetchData()
  }, [])

  // ✅ Filter users
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

  // ✅ Sorting
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

  // ✅ View Details
  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setModalVisible(true)
  }

  // ✅ Delete user (with Toast messages)
  const handleDeleteUser = async (user) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${user.fullName}?`)
    if (!confirmDelete) {
      toast.info('User deletion canceled')
      return
    }

    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/user/data/${user.userId}`)
      if (response.status === 200 || response.status === 204) {
        toast.success(`${user.fullName} User deleted successfully`, { position: 'top-right' })

        // Remove user from state
        const updated = userData.filter((u) => u.userId !== user.userId)
        setUserData(updated)
        setFilteredData(updated)
      } else {
        toast.error('Failed to delete user.')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('An error occurred while deleting the user')
    }
  }

  // ✅ Activate user
  const handleActivateUser = async (user) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/user/data/${user.userId}`, {
        isActive: true,
        deactivationReason: null,
        deactivatedAt: null,
      })
      toast.success('User activated successfully')
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

  // ✅ Deactivate user
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
      toast.success('User deactivated successfully')
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
      <ToastContainer autoClose={2500} />

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
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Madurai">Madurai</option>
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
                        src={user.userProfile?.[0] || '/default-avatar.png'}
                        alt=""
                      />
                    </CTableDataCell>
                    <CTableDataCell>{user.fullName}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.gender}</CTableDataCell>
                    <CTableDataCell>{user.district}</CTableDataCell>
                    <CTableDataCell>
                      {user.isActive ? 'Activated' : 'Deactivated'}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="primary" onClick={() => handleViewDetails(user)}>
                        View
                      </CButton>
                      <CButton color="danger" className="ms-2" onClick={() => handleDeleteUser(user)}>
                        Delete
                      </CButton>
                      <Link to={`/forms/update/${user.userId}`}>
                        <CButton color="secondary" className="ms-2">
                          Update
                        </CButton>
                      </Link>
                      {user.isActive ? (
                        <CButton
                          color="warning"
                          className="ms-2"
                          onClick={() => {
                            setUserToDeactivate(user)
                            setDeactivateModalVisible(true)
                          }}
                        >
                          Deactivate
                        </CButton>
                      ) : (
                        <CButton
                          color="success"
                          className="ms-2"
                          onClick={() => handleActivateUser(user)}
                        >
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

export default FormList
