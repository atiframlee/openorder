import React, { useRef } from 'react'
import '../Search/Search.css'
import { IconChevronLeft, IconSearch } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

function Search() {
  const navigate = useNavigate()
  const touchStartX = useRef(0)

  const gohome = () => navigate('/home')

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (diff > 100) gohome()
  }

  return (
    <div
      className='search'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="searchHeader">
        <div className="searchHeaderBlock" onClick={gohome}>
          <IconChevronLeft className='searchArrowBack' />
          Back
        </div>

        <div className="searchHeaderBlock center">
          <span className="searchTitle">Search</span>
        </div>

        <div className="searchHeaderBlock"></div>
      </div>

      {/* Search Input */}
      <div className="searchBox">
        <IconSearch className="searchI" size={18} />
        <input
          type="text"
          className="searchIn"
          placeholder="Search your favorite vendor or meals"
        />
      </div>
    </div>
  )
}

export default Search
