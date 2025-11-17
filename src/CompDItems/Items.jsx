
import React, { useState, useRef } from 'react'
import './Items.css'
import {
  IconChefHat,
  IconMotorbike,
  IconStopwatch,
  IconBowlChopsticks,
  IconCashBanknote,
  IconStarFilled} from '@tabler/icons-react'
import nasi from '../Assets/nasikerabu.jpg'
import burger from '../Assets/smashburger.jpg'
import nasidagang from '../Assets/nasidagang.jpg'
import ayamgepuk from '../Assets/ayamgepuk.webp'
import tahu from '../Assets/tahu.jpg'
import { useNavigate } from 'react-router-dom'

function CompDItems() {
  const navigate = useNavigate()
  const [menuIndex, setMenuIndex] = useState({})           // per-vendor current menu index
  const touchStartX = useRef({})                           // start X per vendor
  const touchStartY = useRef({})                           // start Y per vendor (to detect vertical scroll)
  const touchMoved = useRef({})                            // whether a horizontal move happened (to block click)

  
  const goVendors = (vendorData) =>{
    navigate('/vendor',{ state: { vendor: vendorData } })
  }

  const handleTouchStart = (e, vendorIndex) => {
    touchStartX.current[vendorIndex] = e.touches[0].clientX
    touchStartY.current[vendorIndex] = e.touches[0].clientY
    touchMoved.current[vendorIndex] = false
  }

  const handleTouchMove = (e, vendorIndex) => {
    const dx = e.touches[0].clientX - (touchStartX.current[vendorIndex] ?? 0)
    const dy = Math.abs(e.touches[0].clientY - (touchStartY.current[vendorIndex] ?? 0))
    // Consider it a horizontal swipe only when horizontal movement exceeds vertical
    if (Math.abs(dx) > 10 && Math.abs(dx) > dy) {
      touchMoved.current[vendorIndex] = true
    }
  }

  const handleTouchEnd = (e, vendorIndex, menusLength) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchEndX - (touchStartX.current[vendorIndex] ?? touchEndX)
    const currentIndex = menuIndex[vendorIndex] || 0

    // Swipe right (left->right): go previous
    if (diff > 50 && currentIndex > 0) {
      setMenuIndex(prev => ({ ...prev, [vendorIndex]: currentIndex - 1 }))
    }

    // Swipe left (right->left): go next (limit to menusLength - 1)
    if (diff < -50 && currentIndex < menusLength - 1) {
      setMenuIndex(prev => ({ ...prev, [vendorIndex]: currentIndex + 1 }))
    }
  }

  const data = [
    {
      vendor:'rose nasi kerabu - plaza mentari hadapan caltex',
      delivery:true,
      pickup:true,
      menus:[
        {
          menuName:'nasi kerabu ayam',
          menuPrice: 9.00,
          menuImg: nasi,
        },
        {
          menuName:'nasi dagang ikan ayor',
          menuPrice: 12.00,
          menuImg: nasidagang,
        }
      ]
    },
    {
      vendor:'198 smash burger and grill',
      delivery:true,
      pickup:false,
      menus:[
        {
          menuName:'double cheese burger ala palooza',
          menuPrice: 12.00,
          menuImg: burger,
        }
      ]
    },
    {
      vendor:'ayam gepuk pak seladang',
      delivery:true,
      pickup:true,
      menus:[
        {
          menuName:'ayam gepuk sambal gajus',
          menuPrice: 14.50,
          menuImg: ayamgepuk,
        }
      ]
    },
    {
      vendor:'tahu sambal berapi',
      delivery:false,
      pickup:true,
      menus:[
        {
          menuName:'tahu daging gemok',
          menuPrice: 9.50,
          menuImg: tahu,
        }
      ]
    }
  ]






  return (
    <div className='items' >
      {data && data.length > 0 ? (
        data.map((item, vendorIndex) => {
          // limit visible menus to first 5
          const visibleMenus = Array.isArray(item.menus) ? item.menus.slice(0, 5) : []
          const menusLength = visibleMenus.length
          // ensure index is within bounds
          const currentMenuIndex = Math.min(menuIndex[vendorIndex] || 0, Math.max(0, menusLength - 1))
          const currentMenu = visibleMenus[currentMenuIndex] || {}

          return (
            <div key={vendorIndex} className="itemsCon" onClick={()=>{goVendors(item)}}>
              {/* navigation only on vendor name click to avoid navigating when swiping image */}
              <p className='venName'>
                <IconChefHat className='chefhatI' size={15} />{item.vendor}
              </p>

              <p className="ratings">
                <IconStarFilled size={12} className='star'/>
                <span className="rate">0</span><span className="rateNum">(0)</span>
              </p>

              <div className="itemsBox">
                <div
                  className="itemsLeft"
                  onTouchStart={(e) => handleTouchStart(e, vendorIndex)}
                  onTouchMove={(e) => handleTouchMove(e, vendorIndex)}
                  onTouchEnd={(e) => handleTouchEnd(e, vendorIndex, menusLength)}
                >
                  <img src={currentMenu.menuImg} alt={currentMenu.menuName || item.vendor} className='foodImg'/>

                  {/* dots indicator */}
                  {menusLength > 1 && (
                    <div className="menuDots">
                      {visibleMenus.map((_, dotIndex) => (
                        <span
                          key={dotIndex}
                          className={`dot ${dotIndex === currentMenuIndex ? 'active' : ''}`}
                          aria-hidden
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="itemsRight" onClick={()=>{goVendors(item)}}>
                  <span className='menusName' title={currentMenu.menuName}>{currentMenu.menuName}</span>
                  <span className='menusPrice'><IconCashBanknote size={13} className="dollarIcon"/> {currentMenu.menuPrice !== undefined ? `RM${currentMenu.menuPrice.toFixed(2)}` : ''}</span>
                  <span className="delFare"><IconMotorbike size={14} className='delMotorIcon'/>RM3.00- 2.1km (sri damansara)</span>
                  <span className="vendorsInven"><IconBowlChopsticks size={15} className="invenIcon"/>10 left</span>
                  <span className='menusDel'><IconStopwatch size={15} className='delsIcon'/> Delivery Time:</span>
                  <span className='time'>8.00am - 11.00am</span>
                  <span className='time'>8.00pm - 11.00pm</span>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <p>No items available</p>
      )}


    </div> //End of div Items
  )
}

export default CompDItems