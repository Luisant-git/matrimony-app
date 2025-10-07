import React, { useEffect, useState } from 'react'
import { CCard, CCol, CRow } from '@coreui/react'
// import { DocsComponents, DocsExample } from 'src/components'
import axios from 'axios'
import FormAdd from './FormAdd'
import ModalJathagam from './ModalJathagam'
import ModalSibilings from './ModalSibilings'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const FormControl = () => {
  const [profileImage, setProfileImage] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [uploadImg, setUploadImg] = useState(null)
  const [profileImages, setProfileImages] = useState([])
  const [uploadImgs, setUploadImgs] = useState([])

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setProfileImage(reader.result)
  //     }
  //     reader.readAsDataURL(file)
  //     setUploadImg(file)
  //   }
  // }
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files) // Convert FileList to Array
    const imagePreviews = []
    const uploadedFiles = []

    files.forEach((file) => {
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          imagePreviews.push(reader.result)
          if (imagePreviews.length === files.length) {
            setProfileImages((prev) => [...prev, ...imagePreviews])
          }
        }
        reader.readAsDataURL(file)
        uploadedFiles.push(file)
      }
    })

    setUploadImgs((prev) => [...prev, ...uploadedFiles])
  }
  const removeProfileImage = (indexToRemove) => {
    setProfileImages((prev) => prev.filter((_, i) => i !== indexToRemove))
    setUploadImgs((prev) => prev.filter((_, i) => i !== indexToRemove))
    // Also update formData.userProfile if needed
    setFormData((prev) => ({
      ...prev,
      userProfile: (prev.userProfile || []).filter((_, i) => i !== indexToRemove),
    }))
  }
  const [siblings, setSiblings] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [newSibling, setNewSibling] = useState({
    name: '',
    gender: '',
  })
  const [communityData, setCommunityData] = useState([])
  const [casteData, setCasteData] = useState([])
  const [subCasteData, setSubCasteData] = useState([])
  const [kulamData, setKulamData] = useState([])
  const [kothirams, setkothiramsData] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewSibling((prev) => ({ ...prev, [name]: value }))
  }

  const addSibling = () => {
    setSiblings((prev) => {
      const updatedSiblings = [...prev, { ...newSibling }]
      setFormData((formDataPrev) => ({
        ...formDataPrev,
        siblings: updatedSiblings,
      }))
      return updatedSiblings
    })
    setNewSibling({ name: '', gender: '' })
    setModalVisible(false)
  }

  const removeSibling = (siblingName) => {
    setSiblings((prev) => {
      const updatedSiblings = prev.filter((sibling) => sibling.name !== siblingName)
      setFormData((formDataPrev) => ({
        ...formDataPrev,
        siblings: updatedSiblings,
      }))
      return updatedSiblings
    })
  }

  const [jathagam, setJathagam] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [modalVisibles, setModalVisibles] = useState(false)
  const [newJathagam, setNewJathagam] = useState({
    rasi: '',
    uploadJathakam: null,
    natchathiram: '',
    lagnam: '',
    dosham: '',
  })
  const handleFileChangedoc = (event) => {
    setSelectedFiles(event.target.files)
  }

  const handleUploadJathagam = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log('No files selected for Jathagam upload')
      return
    }

    const formData = new FormData()
    Array.from(selectedFiles).forEach((file) => {
      formData.append('files', file)
    })

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(response, 'paths')

      return response.data.urls?.[0]
    } catch (error) {
      console.error('File upload failed:', error)
      throw error
    }
  }

  const handleInputChanges = (e) => {
    const { name, value, type, checked } = e.target
    setNewJathagam((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewJathagam((prev) => ({
        ...prev,
        uploadJathakam: file.name,
      }))
    }
  }

  const addJathagam = async () => {
    try {
      // Upload Jathagam file and get the URL
      const uploadedJathagamUrl = await handleUploadJathagam()

      // Update `newJathagam` with the uploaded URL
      setNewJathagam((prev) => ({
        ...prev,
        uploadJathakam: uploadedJathagamUrl, // Set the upload URL here
      }))

      // Add the new Jathagam to the state
      const updatedJathagam = [{ ...newJathagam, uploadJathakam: uploadedJathagamUrl }]
      setJathagam(updatedJathagam)

      // Update form data
      setFormData((formDataPrev) => ({
        ...formDataPrev,
        jathagam: updatedJathagam,
      }))

      setModalVisibles(false)
    } catch (error) {
      console.error('Error adding Jathagam:', error)
      alert('Jathagam upload failed. Please try again.')
    }
  }

  // Edit and delete handlers for jathagam
  const editJathagam = (index) => {
    const item = jathagam?.[index]
    if (!item) return
    setNewJathagam({
      rasi: item.rasi || '',
      uploadJathakam: item.uploadJathakam || null,
      natchathiram: item.natchathiram || '',
      lagnam: item.lagnam || '',
      dosham: item.dosham || '',
    })
    setModalVisibles(true)
    // store index on newJathagam to know update target
    setNewJathagam((prev) => ({ ...prev, _editingIndex: index }))
  }

  const deleteJathagam = (index) => {
    setJathagam((prev) => {
      const updated = prev ? prev.filter((_, i) => i !== index) : []
      setFormData((fd) => ({ ...fd, jathagam: updated }))
      return updated
    })
  }

  const updateJathagam = async (index, updatedData) => {
    try {
      let uploadUrl = updatedData.uploadJathakam

      // If user selected new files via modal, selectedFiles will be set — upload them
      if (selectedFiles && selectedFiles.length > 0) {
        const uploadedJathagamUrl = await handleUploadJathagam()
        uploadUrl = uploadedJathagamUrl || uploadUrl
      }

      const finalData = { ...updatedData, uploadJathakam: uploadUrl }

      setJathagam((prev) => {
        const copy = prev ? [...prev] : []
        copy[index] = { ...copy[index], ...finalData }
        setFormData((fd) => ({ ...fd, jathagam: copy }))
        return copy
      })

      // cleanup
      setModalVisibles(false)
      setSelectedFiles(null)
      setNewJathagam((prev) => ({ ...prev, _editingIndex: undefined }))
    } catch (error) {
      console.error('Error updating jathagam:', error)
      alert('Failed to update Jathagam. Please try again.')
    }
  }

  const [formData, setFormData] = useState({
    regNo: '',
    fullName: '',
    state: '',
    district: '',
    address: '',
    mobileNo: '',
    email: '',
    password: '',
    gender: 'MALE',
    dateOfBirth: '',
    birthTime: '',
    birthPlace: '',
    education: '',
    job: '',
    organization: '',
    height: '',
    weight: '',
    color: '',
    profile: 'qqq',
    income: '',
    maritalStatus: 'SINGLE',
    ownHouse: true,
    poorvigam: '',
    kulamId: '',
    kothiramId: '',
    subCasteId: '',
    kothiram: '',
    kulam: '',
    casteId: '',
    communityId: '',
    job_type: '',
    siblings: siblings,
    jathagam: [jathagam],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,

      [name]:
        name === 'ownHouse'
          ? value === 'true'
          : name === 'income'
            ? value
            : value,
    })
  }
  const handleImageUpload = async () => {
    if (!uploadImgs || uploadImgs.length === 0) return // Ensure files exist
    const uploadFormData = new FormData()
    uploadImgs.forEach((file) => uploadFormData.append('files', file)) // Append all files

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/uploads`, uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Image uploaded successfully:', response)
      return response.data.urls // Return the uploaded URLs
    } catch (error) {
      console.error('Image upload failed:', error)
      throw error
    }
  }

  const generateRegNo = () => {
    const randomNum = Math.floor(Math.random() * 9000) + 1000 // Generates a random number between 1000 and 9999
    return `R${randomNum}`
  }

  const sendEmail = async (to, username, code) => {
    const baseURL = `${import.meta.env.VITE_API_URL}/mail/send-email`

    try {
      const response = await axios.get(baseURL, {
        params: {
          to,
          username,
          code,
        },
      })

      console.log('Email sent successfully:', response.data)
      toast.success('Email Sent successful!')
      return response.data
    } catch (error) {
      console.error('Error sending email:', error)
      toast.error('Error While Seinding mail')
      throw error
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let uploadedImageUrl = ''
      if (profileImages) {
        uploadedImageUrl = await handleImageUpload() // Upload the image
      }
      const passwordFromEmail = formData.email.split('@')[0]

      sendEmail(formData?.email, formData?.fullName, passwordFromEmail)
      const submissionData = {
        ...formData,
        userProfile: uploadedImageUrl,
        password: passwordFromEmail,
        regNo: generateRegNo(),
      }

      console.log(submissionData, 'summiuted')

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user`, submissionData)
      console.log('Response:', response.data)
      toast.success('Registration User successful!')
      setFormData({
        regNo: '',
        fullName: '',
        state: '',
        district: '',
        address: '',
        mobileNo: '',
        email: '',
        password: '',
        gender: 'MALE',
        dateOfBirth: '',
        birthTime: '',
        userProfile: '',
        birthPlace: '',
        education: '',
        job: '',
        organization: '',
        height: '',
        weight: '',
        poorvigam: '',
        kothiram: '',
        kulam: '',
        color: '',
        profile: '',
        income: '',
        maritalStatus: 'SINGLE',
        ownHouse: true,
        casteId: '',
        communityId: '',
        job_type: '',
        siblings: [], // Clear siblings
        jathagam: [], // Clear jathagam
      })
      setSiblings([])
      setJathagam(null)
      setProfileImages([])
      setNewJathagam({
        rasi: '',
        uploadJathakam: '',
        natchathiram: '',
        lagnam: '',
        dosham: '',
      })
      setNewSibling({
        name: '',
        gender: '',
      })
      setProfileImage(null)
      setUploadImg(null)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error While Register')
    }
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/community`).then((res) => {
      setCommunityData(res.data)
    })
  }, [refresh])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/caste`).then((res) => {
      setCasteData(res.data)
    })
  }, [refresh])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/kothirams`).then((res) => {
      setkothiramsData(res.data)
    })
  }, [refresh])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/kulams`).then((res) => {
      setKulamData(res.data)
    })
  }, [refresh])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/sub-caste`).then((res) => {
      setSubCasteData(res.data)
    })
  }, [refresh])

  const filterdatacast = casteData.filter((m) => m.communityId === formData.communityId)
  const filterdatasubcaste = subCasteData.filter((m) => m.CasteId === formData.casteId)
  const filterdatakulam = kulamData.filter((m) => m.subCasteId === formData.subCasteId)
  const filterdatakothiram = kothirams.filter((m) => m.kulamId === formData.kulamId)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <FormAdd
            communityData={communityData}
            jathagam={jathagam}
            siblings={siblings}
            profileImage={profileImage}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
            handleImageChange={handleImageChange}
            setModalVisibles={setModalVisibles}
            setModalVisible={setModalVisible}
            removeSibling={removeSibling}
            filterdatacast={filterdatacast}
            setRefresh={setRefresh}
            refresh={refresh}
            profileImages={profileImages}
            filterdatasubcaste={filterdatasubcaste}
            filterdatakulam={filterdatakulam}
            filterdatakothiram={filterdatakothiram}
            kothirams={kothirams}
            kulamData={kulamData}
            subCasteData={subCasteData}
            casteData={casteData}
            removeProfileImage={removeProfileImage}
            editJathagam={editJathagam}
            deleteJathagam={deleteJathagam}
          />
        </CCard>

        <ModalSibilings
          modalVisible={modalVisible}
          addSibling={addSibling}
          setModalVisible={setModalVisible}
          newSibling={newSibling}
          handleInputChange={handleInputChange}
        />
        <ModalJathagam
          handleFileChange={handleFileChange}
          modalVisibles={modalVisibles}
          addJathagam={addJathagam}
          setModalVisibles={setModalVisibles}
          handleInputChanges={handleInputChanges}
          newJathagam={newJathagam}
          handleFileChangedoc={handleFileChangedoc}
          updateJathagam={updateJathagam}
        />
      </CCol>
      <ToastContainer />
    </CRow>
  )
}

export default FormControl
