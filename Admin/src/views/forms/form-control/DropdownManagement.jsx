import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
} from '@coreui/react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DropdownManagement = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [communities, setCommunities] = useState([])
  const [castes, setCastes] = useState([])
  const [subCastes, setSubCastes] = useState([])
  const [kulams, setKulams] = useState([])
  const [kothirams, setKothirams] = useState([])
  
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [currentType, setCurrentType] = useState('')
  const [editForm, setEditForm] = useState({})

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      const [communityRes, casteRes, subCasteRes, kulamRes, kothiramRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/community`),
        axios.get(`${import.meta.env.VITE_API_URL}/caste`),
        axios.get(`${import.meta.env.VITE_API_URL}/sub-caste`),
        axios.get(`${import.meta.env.VITE_API_URL}/kulams`),
        axios.get(`${import.meta.env.VITE_API_URL}/kothirams`),
      ])
      
      const communities = communityRes.data
      const castes = casteRes.data
      const subCastes = subCasteRes.data
      const kulams = kulamRes.data
      const kothirams = kothiramRes.data
      
      // Map relations manually
      const castesWithCommunity = castes.map(caste => ({
        ...caste,
        community: communities.find(c => c.communityId === caste.communityId)
      }))
      
      const subCastesWithCaste = subCastes.map(subCaste => ({
        ...subCaste,
        caste: castes.find(c => c.casteId === subCaste.casteId)
      }))
      
      const kulamsWithSubCaste = kulams.map(kulam => ({
        ...kulam,
        subCaste: subCastesWithCaste.find(sc => sc.subCasteId === kulam.subCasteId)
      }))
      
      const kothiramsWithKulam = kothirams.map(kothiram => ({
        ...kothiram,
        kulam: kulamsWithSubCaste.find(k => k.kulamId === kothiram.kulamId)
      }))
      
      setCommunities(communities)
      setCastes(castesWithCommunity)
      setSubCastes(subCastesWithCaste)
      setKulams(kulamsWithSubCaste)
      setKothirams(kothiramsWithKulam)
    } catch (error) {
      toast.error('Failed to fetch data')
    }
  }

  const handleEdit = (item, type) => {
    setCurrentItem(item)
    setCurrentType(type)
    setEditForm(item)
    setEditModal(true)
  }

  const handleDelete = (item, type) => {
    setCurrentItem(item)
    setCurrentType(type)
    setDeleteModal(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const endpoints = {
        community: `/community/${currentItem.communityId}`,
        caste: `/caste/${currentItem.casteId}`,
        subcaste: `/sub-caste/${currentItem.subCasteId}`,
        kulam: `/kulams/${currentItem.kulamId}`,
        kothiram: `/kothirams/${currentItem.kothiramId}`,
      }

      await axios.patch(`${import.meta.env.VITE_API_URL}${endpoints[currentType]}`, editForm)
      toast.success(`${currentType} updated successfully`)
      setEditModal(false)
      fetchAllData()
    } catch (error) {
      toast.error(`Failed to update ${currentType}`)
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      const endpoints = {
        community: `/community/${currentItem.communityId}`,
        caste: `/caste/${currentItem.casteId}`,
        subcaste: `/sub-caste/${currentItem.subCasteId}`,
        kulam: `/kulams/${currentItem.kulamId}`,
        kothiram: `/kothirams/${currentItem.kothiramId}`,
      }

      await axios.delete(`${import.meta.env.VITE_API_URL}${endpoints[currentType]}`)
      toast.success(`${currentType} deleted successfully`)
      setDeleteModal(false)
      fetchAllData()
    } catch (error) {
      toast.error(`Failed to delete ${currentType}`)
    }
  }

  const CommunityTable = () => (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Community Name</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {communities.map((community) => (
          <CTableRow key={community.communityId}>
           
            <CTableDataCell>{community.communityName}</CTableDataCell>
            <CTableDataCell>
              <CButton
                color="warning"
                size="sm"
                className="me-2"
                onClick={() => handleEdit(community, 'community')}
              >
                Edit
              </CButton>
              <CButton
                color="danger"
                size="sm"
                onClick={() => handleDelete(community, 'community')}
              >
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )

  const CasteTable = () => (
    <CTable hover>
      <CTableHead>
        <CTableRow>
         
          <CTableHeaderCell>Caste Name</CTableHeaderCell>
          <CTableHeaderCell>Community</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {castes.map((caste) => (
          <CTableRow key={caste.casteId}>
          
            <CTableDataCell>{caste.casteName}</CTableDataCell>
            <CTableDataCell>{caste.community?.communityName}</CTableDataCell>
            <CTableDataCell>
              <CButton
                color="warning"
                size="sm"
                className="me-2"
                onClick={() => handleEdit(caste, 'caste')}
              >
                Edit
              </CButton>
              <CButton
                color="danger"
                size="sm"
                onClick={() => handleDelete(caste, 'caste')}
              >
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )

  const SubCasteTable = () => (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Porvikam Name</CTableHeaderCell>
          <CTableHeaderCell>Caste</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {subCastes.map((subCaste) => (
          <CTableRow key={subCaste.subCasteId}>
            <CTableDataCell>{subCaste.SubCasteName}</CTableDataCell>
            <CTableDataCell>{subCaste.subCaste?.casteName}</CTableDataCell>
            <CTableDataCell>
              <CButton
                color="warning"
                size="sm"
                className="me-2"
                onClick={() => handleEdit(subCaste, 'subcaste')}
              >
                Edit
              </CButton>
              <CButton
                color="danger"
                size="sm"
                onClick={() => handleDelete(subCaste, 'subcaste')}
              >
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )

  const KulamTable = () => (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Kulam Name</CTableHeaderCell>
          <CTableHeaderCell>Porvikam</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {kulams.map((kulam) => (
          <CTableRow key={kulam.kulamId}>
            <CTableDataCell>{kulam.name}</CTableDataCell>
            <CTableDataCell>{kulam.subCaste?.SubCasteName}</CTableDataCell>
            <CTableDataCell>
              <CButton
                color="warning"
                size="sm"
                className="me-2"
                onClick={() => handleEdit(kulam, 'kulam')}
              >
                Edit
              </CButton>
              <CButton
                color="danger"
                size="sm"
                onClick={() => handleDelete(kulam, 'kulam')}
              >
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )

  const KothiramTable = () => (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Kothiram Name</CTableHeaderCell>
          <CTableHeaderCell>Kulam</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {kothirams.map((kothiram) => (
          <CTableRow key={kothiram.kothiramId}>
            <CTableDataCell>{kothiram.name}</CTableDataCell>
            <CTableDataCell>{kothiram.kulam?.name}</CTableDataCell>
            <CTableDataCell>
              <CButton
                color="warning"
                size="sm"
                className="me-2"
                onClick={() => handleEdit(kothiram, 'kothiram')}
              >
                Edit
              </CButton>
              <CButton
                color="danger"
                size="sm"
                onClick={() => handleDelete(kothiram, 'kothiram')}
              >
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )

  return (
    <div>
      <CCard>
        <CCardHeader>
          <h4>Dropdown Management</h4>
        </CCardHeader>
        <CCardBody>
          <CTabs activeItemKey={activeTab}>
            <CTabList variant="tabs">
              <CTab itemKey={0} onClick={() => setActiveTab(0)}>Community</CTab>
              <CTab itemKey={1} onClick={() => setActiveTab(1)}>Caste</CTab>
              <CTab itemKey={2} onClick={() => setActiveTab(2)}>Porvikam</CTab>
              <CTab itemKey={3} onClick={() => setActiveTab(3)}>Kulam</CTab>
              <CTab itemKey={4} onClick={() => setActiveTab(4)}>Kothiram</CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel className={activeTab === 0 ? 'show active' : ''} itemKey={0}>
                <CommunityTable />
              </CTabPanel>
              <CTabPanel className={activeTab === 1 ? 'show active' : ''} itemKey={1}>
                <CasteTable />
              </CTabPanel>
              <CTabPanel className={activeTab === 2 ? 'show active' : ''} itemKey={2}>
                <SubCasteTable />
              </CTabPanel>
              <CTabPanel className={activeTab === 3 ? 'show active' : ''} itemKey={3}>
                <KulamTable />
              </CTabPanel>
              <CTabPanel className={activeTab === 4 ? 'show active' : ''} itemKey={4}>
                <KothiramTable />
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>

      {/* Edit Modal */}
      <CModal visible={editModal} onClose={() => setEditModal(false)}>
        <CForm onSubmit={handleUpdate}>
          <CModalHeader>Edit {currentType}</CModalHeader>
          <CModalBody>
            {currentType === 'community' && (
              <CFormInput
                label="Community Name"
                value={editForm.communityName || ''}
                onChange={(e) => setEditForm({ ...editForm, communityName: e.target.value })}
                required
              />
            )}
            {currentType === 'caste' && (
              <>
                <CFormInput
                  label="Caste Name"
                  value={editForm.casteName || ''}
                  onChange={(e) => setEditForm({ ...editForm, casteName: e.target.value })}
                  required
                />
                <CFormSelect
                  label="Community"
                  value={editForm.communityId || ''}
                  onChange={(e) => setEditForm({ ...editForm, communityId: e.target.value })}
                  required
                >
                  <option value="">Select Community</option>
                  {communities.map((community) => (
                    <option key={community.communityId} value={community.communityId}>
                      {community.communityName}
                    </option>
                  ))}
                </CFormSelect>
              </>
            )}
            {currentType === 'subcaste' && (
              <>
                <CFormInput
                  label="Porvikam Name"
                  value={editForm.SubCasteName || ''}
                  onChange={(e) => setEditForm({ ...editForm, SubCasteName: e.target.value })}
                  required
                />
                <CFormSelect
                  label="Caste"
                  value={editForm.casteId || ''}
                  onChange={(e) => setEditForm({ ...editForm, casteId: e.target.value })}
                  required
                >
                  <option value="">Select Caste</option>
                  {castes.map((caste) => (
                    <option key={caste.casteId} value={caste.casteId}>
                      {caste.casteName}
                    </option>
                  ))}
                </CFormSelect>
              </>
            )}
            {currentType === 'kulam' && (
              <>
                <CFormInput
                  label="Kulam Name"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
                <CFormSelect
                  label="Porvikam"
                  value={editForm.subCasteId || ''}
                  onChange={(e) => setEditForm({ ...editForm, subCasteId: e.target.value })}
                  required
                >
                  <option value="">Select Porvikam</option>
                  {subCastes.map((subCaste) => (
                    <option key={subCaste.subCasteId} value={subCaste.subCasteId}>
                      {subCaste.SubCasteName}
                    </option>
                  ))}
                </CFormSelect>
              </>
            )}
            {currentType === 'kothiram' && (
              <>
                <CFormInput
                  label="Kothiram Name"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
                <CFormSelect
                  label="Kulam"
                  value={editForm.kulamId || ''}
                  onChange={(e) => setEditForm({ ...editForm, kulamId: e.target.value })}
                  required
                >
                  <option value="">Select Kulam</option>
                  {kulams.map((kulam) => (
                    <option key={kulam.kulamId} value={kulam.kulamId}>
                      {kulam.name}
                    </option>
                  ))}
                </CFormSelect>
              </>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="primary">
              Update
            </CButton>
            <CButton color="secondary" onClick={() => setEditModal(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Delete Modal */}
      <CModal visible={deleteModal} onClose={() => setDeleteModal(false)}>
        <CModalHeader>Confirm Delete</CModalHeader>
        <CModalBody>
          Are you sure you want to delete this {currentType}? This action cannot be undone.
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={handleDeleteConfirm}>
            Delete
          </CButton>
          <CButton color="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default DropdownManagement