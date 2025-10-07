import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import axios from 'axios'
import { toast } from 'react-toastify'

const InlineDropdownManager = ({ 
  visible, 
  onClose, 
  type, 
  data, 
  onRefresh,
  parentData = [] 
}) => {
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [editForm, setEditForm] = useState({})

  const getTitle = () => {
    const titles = {
      community: 'Community Management',
      caste: 'Caste Management',
      subcaste: 'Porvikam Management',
      kulam: 'Kulam Management',
      kothiram: 'Kothiram Management'
    }
    return titles[type] || 'Management'
  }

  const getColumns = () => {
    switch(type) {
      case 'community':
        return ['Community Name', 'Actions']
      case 'caste':
        return ['Caste Name', 'Community', 'Actions']
      case 'subcaste':
        return ['Porvikam Name', 'Caste', 'Actions']
      case 'kulam':
        return ['Kulam Name', 'Porvikam', 'Actions']
      case 'kothiram':
        return ['Kothiram Name', 'Kulam', 'Actions']
      default:
        return []
    }
  }

  const handleEdit = (item) => {
    setCurrentItem(item)
    setEditForm(item)
    setEditModal(true)
  }

  const handleDelete = (item) => {
    setCurrentItem(item)
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

      await axios.patch(`${import.meta.env.VITE_API_URL}${endpoints[type]}`, editForm)
      toast.success(`${type} updated successfully`)
      setEditModal(false)
      onRefresh()
    } catch (error) {
      toast.error(`Failed to update ${type}`)
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

      await axios.delete(`${import.meta.env.VITE_API_URL}${endpoints[type]}`)
      toast.success(`${type} deleted successfully`)
      setDeleteModal(false)
      onRefresh()
    } catch (error) {
      toast.error(`Failed to delete ${type}`)
    }
  }

  const renderTableRow = (item, index) => {
    switch(type) {
      case 'community':
        return (
          <CTableRow key={item.communityId}>
            <CTableDataCell>{item.communityName}</CTableDataCell>
            <CTableDataCell>
              <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(item)}>
                Edit
              </CButton>
              <CButton color="danger" size="sm" onClick={() => handleDelete(item)}>
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        )
      case 'caste':
        return (
          <CTableRow key={item.casteId}>
            <CTableDataCell>{item.casteName}</CTableDataCell>
            <CTableDataCell>{item.community?.communityName || parentData.find(p => p.communityId === item.communityId)?.communityName}</CTableDataCell>
            <CTableDataCell>
              <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(item)}>
                Edit
              </CButton>
              <CButton color="danger" size="sm" onClick={() => handleDelete(item)}>
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        )
      case 'subcaste':
        return (
          <CTableRow key={item.subCasteId}>
            <CTableDataCell>{item.SubCasteName}</CTableDataCell>
            <CTableDataCell>{item.subCaste?.casteName || item.caste?.casteName}</CTableDataCell>
            <CTableDataCell>
              <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(item)}>
                Edit
              </CButton>
              <CButton color="danger" size="sm" onClick={() => handleDelete(item)}>
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        )
      case 'kulam':
        return (
          <CTableRow key={item.kulamId}>
            <CTableDataCell>{item.name}</CTableDataCell>
            <CTableDataCell>{item.subCaste?.SubCasteName || item.porvikam?.SubCasteName || parentData.find(p => p.subCasteId === item.subCasteId)?.SubCasteName}</CTableDataCell>
            <CTableDataCell>
              <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(item)}>
                Edit
              </CButton>
              <CButton color="danger" size="sm" onClick={() => handleDelete(item)}>
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        )
      case 'kothiram':
        return (
          <CTableRow key={item.kothiramId}>
            <CTableDataCell>{item.name}</CTableDataCell>
            <CTableDataCell>{item.kulam?.name || item.Kulam?.name || parentData.find(p => p.kulamId === item.kulamId)?.name}</CTableDataCell>
            <CTableDataCell>
              <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(item)}>
                Edit
              </CButton>
              <CButton color="danger" size="sm" onClick={() => handleDelete(item)}>
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        )
      default:
        return null
    }
  }

  const renderEditForm = () => {
    switch(type) {
      case 'community':
        return (
          <CFormInput
            label="Community Name"
            value={editForm.communityName || ''}
            onChange={(e) => setEditForm({ ...editForm, communityName: e.target.value })}
            required
          />
        )
      case 'caste':
        return (
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
              {parentData.map((item) => (
                <option key={item.communityId} value={item.communityId}>
                  {item.communityName}
                </option>
              ))}
            </CFormSelect>
          </>
        )
      case 'subcaste':
        return (
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
              {parentData.map((item) => (
                <option key={item.casteId} value={item.casteId}>
                  {item.casteName}
                </option>
              ))}
            </CFormSelect>
          </>
        )
      case 'kulam':
        return (
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
              {parentData.map((item) => (
                <option key={item.subCasteId} value={item.subCasteId}>
                  {item.SubCasteName}
                </option>
              ))}
            </CFormSelect>
          </>
        )
      case 'kothiram':
        return (
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
              {parentData.map((item) => (
                <option key={item.kulamId} value={item.kulamId}>
                  {item.name}
                </option>
              ))}
            </CFormSelect>
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      <CModal visible={visible} onClose={onClose} size="lg">
        <CModalHeader>{getTitle()}</CModalHeader>
        <CModalBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                {getColumns().map((col, index) => (
                  <CTableHeaderCell key={index}>{col}</CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data?.map((item, index) => renderTableRow(item, index))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Edit Modal */}
      <CModal visible={editModal} onClose={() => setEditModal(false)}>
        <CForm onSubmit={handleUpdate}>
          <CModalHeader>Edit {type}</CModalHeader>
          <CModalBody>
            {renderEditForm()}
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
          Are you sure you want to delete this {type}? This action cannot be undone.
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
    </>
  )
}

export default InlineDropdownManager