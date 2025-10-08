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
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify' // Optional, for alert messages
import UserDetailsModal from './UserDetailsModal'
function FormList() {
  const [userData, setUserData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' })
  const [genderFilter, setGenderFilter] = useState('All')

  const [districtFilter, setDistrictFilter] = useState('All')
  const [educationFilter, setEducationFilter] = useState('All')
  const [jobTypeFilter, setJobTypeFilter] = useState('All')
  const [selectedUser, setSelectedUser] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [deactivateModalVisible, setDeactivateModalVisible] = useState(false)
  const [deactivateReason, setDeactivateReason] = useState('')
  const [deactivateOtherText, setDeactivateOtherText] = useState('')
  const [userToDeactivate, setUserToDeactivate] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10


  const getAge = (u) => {
    const explicit = Number(u?.age)
    if (!Number.isNaN(explicit) && explicit > 0) return explicit

    const dobStr = u?.dateOfBirth || u?.dob || u?.birthDate
    if (!dobStr) return null

    const dob = new Date(dobStr)
    if (isNaN(dob)) return null

    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const m = today.getMonth() - dob.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--
    return age
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // includeInactive=true so admin can view and reactivate deactivated users
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/data`)
        const data = await response.json()
        setUserData(data)
        setFilteredData(data)
      } catch (error) {
        console.error('Error fetching user data: ', error)
      }
    }
    fetchData()
  }, [refresh])
  const filterData = (
    searchTerm,
    gender,
    district,
    education,
    jobType,
  ) => {
    const filtered = userData.filter((user) => {
      const normalizedSearchTerm = searchTerm.trim().toLowerCase()
      const normalizedDistrict = district.trim().toLowerCase()

      const matchesSearch =
        user.fullName.toLowerCase().includes(normalizedSearchTerm) ||
        user.email.toLowerCase().includes(normalizedSearchTerm) ||
        user.mobileNo.includes(normalizedSearchTerm)

      const matchesGender = gender === 'All' || user.gender === gender
      const matchesDistrict =
        district === 'All' ||
        (user.district && user.district.trim().toLowerCase() === normalizedDistrict)
      const matchesEducation = education === 'All' || user.education === education
      const matchesJobType = jobType === 'All' || user.job_type === jobType

      return (
        matchesSearch &&
        matchesGender &&
        matchesDistrict &&
        matchesEducation &&
        matchesJobType
      )
    })

    setFilteredData(filtered)
    setCurrentPage(1)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    filterData(
      value,
      genderFilter,
      districtFilter,
      educationFilter,
      jobTypeFilter,
    )
  }

  const handleFilterChange = (filterType, value) => {
    const normalizedValue = value.trim().toLowerCase()
    switch (filterType) {
      case 'gender':
        setGenderFilter(value)
        filterData(searchQuery, value, districtFilter, educationFilter, jobTypeFilter)
        break
      case 'district':
        setDistrictFilter(value)
        filterData(searchQuery, genderFilter, value, educationFilter, jobTypeFilter)
        break
      case 'education':
        setEducationFilter(value)
        filterData(searchQuery, genderFilter, districtFilter, value, jobTypeFilter)
        break
      case 'jobType':
        setJobTypeFilter(value)
        filterData(searchQuery, genderFilter, districtFilter, educationFilter, value)
        break
      default:
        break
    }
  }

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    const sortedData = [...filteredData].sort((a, b) => {
      if (direction === 'asc') {
        return a[key] > b[key] ? 1 : -1
      } else {
        return a[key] < b[key] ? 1 : -1
      }
    })
    setFilteredData(sortedData)
    setCurrentPage(1)
  }

  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setModalVisible(true)
  }

  const handleDeleteUser = async (userId) => {
    const endpoint = `${import.meta.env.VITE_API_URL}/user/data/${userId.userId}`

    try {
      const response = await axios.delete(endpoint)
      if (response.status === 200) {
        toast.success('User deleted successfully')
        setRefresh(!refresh)
        // Optionally, refresh the user list or update the state
      } else {
        toast.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('An error occurred while deleting the user')
    }
  }

  const handleActivateUser = async (user) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/user/data/${user.userId}`, {
        isActive: true,
        deactivationReason: null,
        deactivatedAt: null,
      })
      toast.success('User activated')
      setRefresh(!refresh)
    } catch (err) {
      console.error(err)
      toast.error('Failed to activate user')
    }
  }

  console.log(selectedUser)

  return (
    <div>
      <CCard>
        <CCardBody>
          <CRow className="justify-content-between">
            <CCol xs="12" md="6" lg="3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="form-control"
              />
            </CCol>

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

            <CCol xs="6" md="6" lg="1" className="d-flex ms-auto">
              <Link to="/forms/form-control">
                <button className="btn btn-success text-white w-100">Add</button>
              </Link>
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

                <th onClick={() => handleSort('district')}>District</th>
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
                  <CTableDataCell>
                    <CButton color="primary" onClick={() => handleViewDetails(user)}>
                      View Details
                    </CButton>
                    <CButton
                      color="secondary"
                      className="ms-2"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </CButton>

                    <Link to={`/forms/update/${user.userId}`}>
                      <CButton color="secondary" className="ms-2">
                        Update
                      </CButton>
                    </Link>
                    {user.isActive === false ? (
                      <CButton
                        color="success"
                        className="ms-2"
                        onClick={() => handleActivateUser(user)}
                      >
                        Activate
                      </CButton>
                    ) : (
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
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          
          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
            </div>
            <div>
              <button 
                className="btn btn-outline-primary me-2" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <span className="me-2">Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</span>
              <button 
                className="btn btn-outline-primary" 
                disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </CCardBody>
      </CCard>

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
          <div className="mb-2">
            <select
              className="form-select"
              value={deactivateReason}
              onChange={(e) => setDeactivateReason(e.target.value)}
            >
              <option value="">Select reason</option>
              <option value="got_married">Got Married</option>
              <option value="improper_behavior">Improper Behavior</option>
              <option value="other">Other</option>
            </select>
          </div>
          {deactivateReason === 'other' && (
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Specify reason"
                value={deactivateOtherText}
                onChange={(e) => setDeactivateOtherText(e.target.value)}
              />
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeactivateModalVisible(false)}>
            Cancel
          </CButton>
          <CButton
            color="danger"
            onClick={async () => {
              if (!userToDeactivate) return
              if (!deactivateReason) {
                toast.error('Please select a reason')
                return
              }
              const reasonText =
                deactivateReason === 'other' ? deactivateOtherText : deactivateReason
              try {
                await axios.patch(
                  `${import.meta.env.VITE_API_URL}/user/data/${userToDeactivate.userId}`,
                  { isActive: false, deactivationReason: reasonText },
                )
                toast.success('User deactivated')
                setDeactivateModalVisible(false)
                setDeactivateReason('')
                setDeactivateOtherText('')
                setUserToDeactivate(null)
                setRefresh(!refresh)
              } catch (err) {
                console.error(err)
                toast.error('Failed to deactivate user')
              }
            }}
          >
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default FormList
