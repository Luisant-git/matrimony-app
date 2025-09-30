import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import WData from './WData'


const WhishlistData = () => {
  return (
    <main>
        <Breadcrumb topic={'WishList'} topicSpan={'WishList'}/>
        <WData/>
    </main>
  )
}

export default WhishlistData