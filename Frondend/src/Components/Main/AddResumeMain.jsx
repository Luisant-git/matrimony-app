import React from 'react'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import AddResumeArea from '../Jobs/AddResumeArea'
import ProfileDetails from './ProfileDetails'

const AddResumeMain = () => {
  return (
    <main>
        <Breadcrumb topic={'Edit'} topicSpan={'Add Your Profile'}/>
        {/* <AddResumeArea/> */}
        <ProfileDetails/>
    </main>
  )
}

export default AddResumeMain