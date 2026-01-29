import React, {useRef} from 'react'
import './Segments.css'
import { useLocation, useNavigate } from 'react-router-dom'
import {IconChevronLeft,IconChevronLeftPipe} from '@tabler/icons-react'

function Segments() {
    const location = useLocation();
    const title = location.state;
    const navigate = useNavigate()
    const touchStartX = useRef(0)

    const gohome = () =>{
        navigate('/home')
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX
    };

    const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchEndX - touchStartX.current

    if (diff > 100) {
      gohome()
    }
  }


  return (
    <div className='segments'
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
    >
        
        <div className="segmentsTitle">
            <div className="segmentsBlock" onClick={gohome}> <IconChevronLeft className='segmentsArrowBack' /> Back </div>
            
            <div className="segmentsBlock"> {title} </div>

            <div className="segmentsBlock"> </div>
        </div>

        <div className="segmentsOops">
          <p className='segmentsOopsTitle'>Oops!</p>
          <p className='segmentsOopsSubtitle'>Looks like this segment is not populated yet</p>

          <div className="oopsBack" onClick={gohome}>
          Lets go back to home <IconChevronLeftPipe/>
        </div>
        </div>

        
    </div>
  )
}

export default Segments
