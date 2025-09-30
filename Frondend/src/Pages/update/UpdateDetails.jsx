import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import AddResumeArea from '../../Components/Jobs/AddResumeArea'

function UpdateDetails() {
  return (
    <div>
          <Breadcrumb topic={'Edit'} topicSpan={'Add Your Profile'}/>
          <AddResumeArea/>
    </div>
  )
}

export default UpdateDetails