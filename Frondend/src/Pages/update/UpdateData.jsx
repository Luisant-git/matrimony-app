import React from 'react'
import SearchForm from '../../Components/Search Form/SearchForm'
import SidePanel from '../../Components/Side Panel/SidePanel'
import Header2 from '../../Components/Header/Header2'
import AddResumeMain from '../../Components/Main/AddResumeMain'
import Footer from '../../Components/Footer/Footer'
import UpdateDetails from './UpdateDetails'


const UpdateData = () => {
  return (
    <>
        <SearchForm/>
        <SidePanel/>
        <Header2/>
        <UpdateDetails/>
        <Footer/>
    </>  
    )
}

export default UpdateData