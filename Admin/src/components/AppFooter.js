import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="d-flex justify-content-between align-items-center">
      <div>
        <a href="https://luisant.in" target="_blank" rel="noopener noreferrer">
          shopping sto
        </a>
        <span className="ms-1">&copy; 2025 matrimony.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
