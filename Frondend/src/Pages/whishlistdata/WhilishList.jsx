import React from 'react'
import SearchForm from '../../Components/Search Form/SearchForm'
import SidePanel from '../../Components/Side Panel/SidePanel'
import Header2 from '../../Components/Header/Header2'

import Footer from '../../Components/Footer/Footer'
import WhishlistData from './WhishlistData'



const WhilishList = () => {
  return (
    <>
        <SearchForm/>
        <SidePanel/>
        <Header2/>
      <WhishlistData/>
        <Footer/>
    </>
  )
}

export default WhilishList