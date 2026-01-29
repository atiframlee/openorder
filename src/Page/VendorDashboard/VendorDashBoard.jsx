import React, { useRef } from 'react'
import './VendorDashBoard.css'
import { IconChevronLeft, IconChevronLeftPipe } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

function VendorDashBoard() {

  const navigate = useNavigate()
  const touchStartX = useRef(0)

  const gohome = () => {
    navigate('/home')
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchEndX - touchStartX.current
    if (diff > 100) {
      gohome()
    }
  }

  return (
    <div className='vendordboard'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="vendordboardHeaderCont">
        <IconChevronLeft className='vendordboardBack' onClick={gohome} />
        <span className="vendordboardTitle">Vendor DashBoard</span>
      </div>

      <div className="segmentsOops">
        <p className='segmentsOopsTitle'>Oops!</p>
        <p className='segmentsOopsSubtitle'>Looks like You are not a vendor yet.</p>
        <p className='segmentsOopsJoinUs'>Join us today to start turning your cooking passion into income</p>

        <div className="oopsBack" onClick={gohome}>
          Lets go back to home <IconChevronLeftPipe />
        </div>
      </div>
    </div>
  )
}

export default VendorDashBoard
