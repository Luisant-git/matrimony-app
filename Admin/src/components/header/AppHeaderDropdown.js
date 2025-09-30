import React, { useEffect, useRef } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const timeoutRef = useRef(null)

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
    window.location.reload()
  }

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      handleLogout()
    }, 60000) // 5 minutes = 300,000 ms
  }

  useEffect(() => {
    const events = ['mousemove', 'keypress', 'mousedown', 'touchstart', 'scroll']

    const handleActivity = () => {
      resetTimer()
    }

    events.forEach((event) => {
      window.addEventListener(event, handleActivity)
    })

    // Start the timer initially
    resetTimer()

    return () => {
      // Cleanup event listeners and timers
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity)
      })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          LOG OUT
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
