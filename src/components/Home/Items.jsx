import React, { useState, useRef } from 'react';
import './Items.css';
import {
  IconRoute,
  IconBowlChopsticks,
  IconCashBanknote,
  IconStarFilled,
  IconCalendarTime,
  IconBuildingStore
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { mockVendors } from '../../Data/MockVendors';
import noImage from '../../Assets/noImage.png';

function Items() {
  const navigate = useNavigate();
  const [menuIndex, setMenuIndex] = useState({});
  const touchStartX = useRef({});
  const touchStartY = useRef({});
  const touchMoved = useRef({});

  const goVendors = (vendorData) => {
    navigate('/vendor', { state: { vendor: vendorData } });
  };

  const handleTouchStart = (e, vendorIndex) => {
    touchStartX.current[vendorIndex] = e.touches[0].clientX;
    touchStartY.current[vendorIndex] = e.touches[0].clientY;
    touchMoved.current[vendorIndex] = false;
  };

  const handleTouchMove = (e, vendorIndex) => {
    const dx = e.touches[0].clientX - (touchStartX.current[vendorIndex] ?? 0);
    const dy = Math.abs(e.touches[0].clientY - (touchStartY.current[vendorIndex] ?? 0));
    if (Math.abs(dx) > 10 && Math.abs(dx) > dy) {
      touchMoved.current[vendorIndex] = true;
    }
  };

  const handleTouchEnd = (e, vendorIndex, menusLength) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - (touchStartX.current[vendorIndex] ?? touchEndX);
    const currentIndex = menuIndex[vendorIndex] || 0;

    if (diff > 50 && currentIndex > 0) {
      setMenuIndex(prev => ({ ...prev, [vendorIndex]: currentIndex - 1 }));
    }
    if (diff < -50 && currentIndex < menusLength - 1) {
      setMenuIndex(prev => ({ ...prev, [vendorIndex]: currentIndex + 1 }));
    }
  };

  // ✅ NEW: Auto-generate label from time (e.g., "08:00" → "8am")
  const generateLabelFromTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'pm' : 'am';
    let displayHours = hours % 12;
    if (displayHours === 0) displayHours = 12;
    return `${displayHours}${period}`;
  };

  // ✅ Helper: "08:00" → "8am", "17:00" → "5pm"
  const formatTime12h = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'pm' : 'am';
    let displayHours = hours % 12;
    if (displayHours === 0) displayHours = 12;
    return `${displayHours}${minutes > 0 ? ':' + String(minutes).padStart(2, '0') : ''}${period}`;
  };

  // ✅ Helper: Format date for display
  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '—';
    const slotDate = new Date(dateStr);
    if (isNaN(slotDate.getTime())) return '—';
    
    return new Date(dateStr).toLocaleDateString('en-MY', {
      day: 'numeric',
      month: 'short'
    }).replace(/,/g, '');
  };

  // ✅ NEW: Get next available slot for a menu (only approved menus)
  const getNextAvailableSlot = (menu) => {
    if (menu.status !== 'approved') return null; // Only approved menus
    if (!menu.openSlots || menu.openSlots.length === 0) return null;
    
    // Find the earliest date with active slots
    const activeSlots = menu.openSlots.filter(slot => 
      slot.status === 'active' && slot.inventory > 0
    );
    
    if (activeSlots.length === 0) return null;
    
    // Sort by date and return first one
    const sortedSlots = [...activeSlots].sort((a, b) => new Date(a.date) - new Date(b.date));
    const firstSlot = sortedSlots[0];
    
    // Get all times for that date
    const timesForDate = activeSlots.filter(slot => slot.date === firstSlot.date);
    
    return {
      date: firstSlot.date,
      times: timesForDate,
      totalInventory: timesForDate.reduce((sum, time) => sum + time.inventory, 0)
    };
  };

  // ✅ NEW: Get delivery pattern from open slots
  const getDeliveryPattern = (menu) => {
    if (menu.status !== 'approved' || !menu.openSlots) return '—';
    
    const days = [...new Set(menu.openSlots.map(slot => slot.day))].sort();
    return days.join(' • ') || '—';
  };

  return (
    <div className='items'>
      <p className="vendorList"><IconBuildingStore size={16} className='vendor' /> Vendor's around you..</p>

      {mockVendors.length > 0 ? (
        mockVendors.map((vendor, vendorIndex) => {
          // ✅ Only show approved menus with active slots
          const approvedMenus = vendor.menus?.filter(menu => 
            menu.status === 'approved' && 
            menu.openSlots && 
            menu.openSlots.some(slot => 
              slot.status === 'active' && slot.inventory > 0
            )
          ) || [];
          
          const visibleMenus = approvedMenus.slice(0, 5);
          const menusLength = visibleMenus.length;
          const currentMenuIndex = Math.min(
            menuIndex[vendorIndex] || 0,
            Math.max(0, menusLength - 1)
          );
          const currentMenu = visibleMenus[currentMenuIndex] || {};

          // ✅ Get next available slot info
          const nextSlot = getNextAvailableSlot(currentMenu);
          // ✅ NEW: Auto-generate labels from time field instead of using label field
          const availableTimeLabels = nextSlot?.times?.map(time => 
            time.label || generateLabelFromTime(time.time)
          ) || [];
          const totalInventory = nextSlot?.totalInventory || 0;

          const deliveryFee = vendor.delivery.fee.base;
          const minFree = vendor.delivery.fee.min_order_free;
          const freeDeliveryText = deliveryFee === 0 ? 'Free' : 
            (minFree ? `RM${deliveryFee.toFixed(2)} (Free >RM${minFree})` : `RM${deliveryFee.toFixed(2)}`);

          let imgSrc = null;
          if (currentMenu.image) {
            try {
              imgSrc = require(`../../Assets/${currentMenu.image}`);
            } catch (err) {
              console.warn(`Image not found: ${currentMenu.image}, using fallback`);
              imgSrc = null;
            }
          }

          return (
            <div 
              key={vendor.id} 
              className="itemsCon" 
              onClick={() => goVendors(vendor)}
            >
              <p className='venName'>{vendor.name}</p>

              <p className="ratings">
                <IconStarFilled size={12} className='star' />
                <span className="rate">{vendor.rating.avg.toFixed(1)}</span>
                <span className="rateNum">({vendor.rating.count})</span>
              </p>

              <div className="itemsBox">
                <div
                  className="itemsLeft"
                  onTouchStart={(e) => handleTouchStart(e, vendorIndex)}
                  onTouchMove={(e) => handleTouchMove(e, vendorIndex)}
                  onTouchEnd={(e) => handleTouchEnd(e, vendorIndex, menusLength)}
                >
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={currentMenu.name || vendor.name}
                      className="foodImg"
                      loading="lazy"
                    />
                  ) : (
                    <div className="foodImgFallback">
                      <img
                        src={noImage}
                        alt="No photo available"
                        className="fallbackImg"
                      />
                    </div>
                  )}

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

                <div className="itemsRight" onClick={() => goVendors(vendor)}>
                  <span className='menusName' title={currentMenu.name}>
                    {currentMenu.name}
                  </span>
                  
                  <span className='menusPrice'>
                    <IconCashBanknote size={13} className="dollarIcon" /> 
                    RM{(currentMenu.basePrice || 0).toFixed(2)}
                  </span>

                  {/* ✅ Per-menu rating and sold count */}
                  {currentMenu.menuRating && (
                    <span className="menuRating">
                      <IconStarFilled size={12} className="midstar" />
                      {currentMenu.menuRating.avg.toFixed(1)} ({currentMenu.menuRating.count})
                      
                      {currentMenu.soldCount !== undefined && (
                        <>
                          {' • '}
                          {currentMenu.soldCount} sold
                        </>
                      )}
                    </span>
                  )}

                  {/* ✅ Delivery pattern */}
                  {/* <span className="deliveryPattern">
                    <IconMoped size={12} className="deliveryIcon" />
                    Delivery: {getDeliveryPattern(currentMenu)}
                  </span> */}

                  {/* ✅ Inventory */}
                  <span className="inventoryInfo">
                    <IconBowlChopsticks size={12} className="invenIcon" />
                    {totalInventory} left
                  </span>

                  <span className="delFare">
                    <IconRoute size={14} className='delMotorIcon' />
                    {freeDeliveryText} • {vendor.distance}km
                  </span>

                  {/* ✅ Next delivery times - MAPPED INDIVIDUALLY */}
                  {nextSlot && (
                    <span className="itemsNextDelivery">
                      <span className="itemNextDelLabel">
                        <IconCalendarTime size={12} className="calendarIcon" />
                        Delivery start at
                      <span className="itemsNextDelDate">{formatDateForDisplay(nextSlot.date)}</span>
                      </span>

                      <span className="itemsNextDelData">
                        {availableTimeLabels.map((timeLabel, index) => (
                        <span key={index} className="itemsDelTimeSlot">
                          {timeLabel}{index < availableTimeLabels.length - 1 ? '' : ''}
                        </span>
                      ))}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="noItems">No vendors available</p>
      )}
    </div>
  );
}

export default Items;