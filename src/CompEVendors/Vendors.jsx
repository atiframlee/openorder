import React, { useEffect, useRef } from 'react'
import './Vendors.css'
import {IconChevronLeft} from '@tabler/icons-react'
import { useNavigate,useLocation } from 'react-router-dom'
import {
  IconHeart,
  IconStarFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconCirclePlusFilled
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import nasi from '../Assets/nasikerabu.jpg'
import burger from '../Assets/smashburger.jpg'
import nasidagang from '../Assets/nasidagang.jpg'
import ayamgepuk from '../Assets/ayamgepuk.webp'
import tahu from '../Assets/tahu.jpg'

function Vendors(data) {
  const navigate = useNavigate()
  const location = useLocation()
  const vendorData = location.state?.vendor
  const touchStartX = useRef(0)

  useEffect(()=>{
    console.log(vendorData)
  },[])

  const gohome = () => {navigate('/home')}

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

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <div 
      className='vendors'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="vendorHeader">
            <IconChevronLeft onClick={gohome} size={30} className='vendorArrowBack' />
            <div className="vendorTitleBox">
              <span className='vendorName'>{vendorData.vendor}</span>
              <span className="vendorLoc">sri damansara - 2.3km</span>
              <span className="venRate">
                <IconStarFilled className='venStar' size={15}/>
                <span className="venRateNum">0 (0) - No Ratings yet</span>
              </span>
            </div>
      </div>

      <div className="sndHeader">
        <div className="sndBox">
          <span>Favourite</span>
          <span className='sndRound'><IconHeart size={17}/></span>
        </div>
        <div className="sndBox">
          <span>Delivery</span>
          {vendorData.delivery?<IconCircleCheckFilled className="venDelStat"/>:<IconCircleXFilled className='venDelStatX' />}
        </div>
        <div className="sndBox">
          <span>Pick Up</span>
          {vendorData.pickup?<IconCircleCheckFilled className="venDelStat"/>:<IconCircleXFilled className='venDelStatX' />}
        </div>
      </div>

      <div className="venCat">
        All
      </div>

      <div className="venMenusContainer">
        {vendorData.menus && vendorData.menus.length > 0? 
        vendorData.menus.map((menu,i)=>(
          <motion.div 
            key={i} 
            className="venMenus"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <div className="venMenusLeft">
              <motion.img 
                src={menu.menuImg} 
                alt="" 
                className='venMenuImg'
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            <div className="venMenusRight">
              <span className="venMenusName">{menu.menuName}</span>
              <span className="venMenusPrice">RM{menu.menuPrice.toFixed(2)}</span>
              <span className='venATC'><IconCirclePlusFilled/></span>
            </div>
          </motion.div>
        )) :null
        }
      </div>

    </div>
  )
}

export default Vendors