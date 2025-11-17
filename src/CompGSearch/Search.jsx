import React, { useRef } from 'react'
import './Search.css'
import {IconChevronLeft} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import {IconSearch} from '@tabler/icons-react'

function Search() {
    const navigate = useNavigate()

      const touchStartX = useRef(0)

    const gohome = () =>{
        navigate('/home')
    };

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchEndX - touchStartX.current

      // If swiped more than 50px from left to right, go back
      if (diff > 100) {
        gohome()
      }
    };
    
  return (
    <div className='search'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="searchHeader">
         <IconChevronLeft onClick={gohome} size={30} className='arrowBack' />
         <span className="searchTitle">Search</span>
      </div>

      <div className="searchBox">
        <input type="text" className="searchIn" placeholder='Search your favoirite food and meals'/>
        <IconSearch className='searchI' size={18}/>
      </div>
    </div>
  )
}

export default Search
