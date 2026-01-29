import React, { useState, useEffect, useMemo } from 'react';
import './CustomizationModal.css';
import {
  IconChevronLeft,
  IconCheck,
  IconCircleCheckFilled,
  IconCalendar,
  IconClock,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

// ✅ IMPORT SHARED LOGIC — SINGLE SOURCE OF TRUTH
import { calculatePrice, formatRM } from '../components/Vendors.logic';

// ─── HELPERS ───────────────────────────────────────────────
const formatTime12h = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'pm' : 'am';
  let displayHours = hours % 12;
  if (displayHours === 0) displayHours = 12;
  return `${displayHours}${minutes > 0 ? ':' + String(minutes).padStart(2, '0') : ''}${period}`;
};

// ─── COMPONENT ─────────────────────────────────────────────
function CustomizationModal({ 
  isOpen, 
  onClose, 
  menu, 
  onConfirm, 
  cartItemCount = 0 
}) {
  const [selections, setSelections] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // ✅ Group available times by date
  const timesByDate = useMemo(() => {
    const map = {};
    if (!menu || !Array.isArray(menu.availableTimes)) return map;
    menu.availableTimes.forEach(slot => {
      if (!slot?.date || !slot?.time) return;
      if (!map[slot.date]) map[slot.date] = [];
      map[slot.date].push(slot);
    });
    return map;
  }, [menu]);

  // ✅ Use shared calculatePrice
  const totalPrice = useMemo(() => {
    return calculatePrice(menu, selections);
  }, [menu, selections]);

  // ✅ Validation
  const isComplete = useMemo(() => {
    if (!menu || !Array.isArray(menu.customizationGroups)) return true;
    return menu.customizationGroups.every(group => {
      if (!group || !group.id) return true;
      if (!group.required) return true;
      const val = selections[group.id];
      if (group.type === 'single') return val != null;
      if (group.type === 'multi') return Array.isArray(val) && val.length > 0;
      return true;
    });
  }, [selections, menu]);

  // ✅ Initialize selections & date/time
  useEffect(() => {
    if (!isOpen || !menu) return;

    const initialSelections = {};
    if (Array.isArray(menu.customizationGroups)) {
      menu.customizationGroups.forEach(group => {
        if (!group?.id || !Array.isArray(group.options)) return;
        if (group.type === 'single') {
          const defaultOption = group.options.find(opt => opt.isDefault);
          initialSelections[group.id] = defaultOption?.id || group.options[0]?.id || null;
        } else if (group.type === 'multi') {
          initialSelections[group.id] = group.options
            .filter(opt => opt.included)
            .map(opt => opt.id);
        }
      });
    }
    setSelections(initialSelections);

    const dates = Object.keys(timesByDate);
    if (dates.length > 0) {
      const firstDate = dates[0];
      setSelectedDate(firstDate);
      const slots = timesByDate[firstDate];
      if (Array.isArray(slots) && slots.length > 0) {
        setSelectedTime(slots[0]);
      }
    }
  }, [isOpen, menu, timesByDate]);

  // ─── HANDLERS ─────────────────────────────────────────────
  const handleConfirm = () => {
    if (!isComplete) {
      console.warn('Please complete all required selections');
      return;
    }
    const finalSelections = { ...selections };
    if (selectedDate) finalSelections.selectedDate = selectedDate;
    if (selectedTime) finalSelections.selectedTime = selectedTime;
    onConfirm(finalSelections);
    onClose();
  };

  if (!isOpen || !menu) return null;

  const dates = Object.keys(timesByDate);
  const basePrice = menu.basePrice || 0;
  const priceKey = `${totalPrice}-${isComplete}`; // still safe to keep (though unused)

  return (
    <div 
      className="customizationModalOverlay" 
      onClick={onClose}
    >
      <motion.div
        className="customizationModal"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        // ✅ No drag/swipe handlers — scroll is now safe
      >
        
          {/* ── HEADER ── */}
          <div className="customizationHeader">
            <div className="customizationTitle">
              {menu.name || 'Customize'}
            </div>
            <div className="customizationBack" onClick={onClose}>
              <IconChevronLeft size={18} />
              <span>close</span>
            </div>
          </div>

          {/* ── CONTENT ── */}
          <div className="customizationContent">
            {/* Image + Desc */}
            <div className="customizationImage">
              {menu.image ? (
                <img
                  src={require(`../Assets/${menu.image}`)}
                  alt={menu.name || 'Menu'}
                  className="compactImage"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="compactImageFallback">
                  <img
                    src={require('../Assets/noImage.png')}
                    alt="No photo"
                    className="fallbackImg"
                  />
                </div>
              )}
              {menu.description && <p className="compactDesc">{menu.description}</p>}
            </div>

            {/* Date */}
            {dates.length > 1 && (
              <div className="customizationGroup">
                <div className="groupTitle">
                  <span className="groupTitleOne">
                    <span className="modalDot"></span> Select Date
                  </span>
                </div>
                <div className="optionsGrid single">
                  {dates.map((date) => (
                    <div
                      key={date}
                      className={`optionCard ${selectedDate === date ? 'selected' : ''} single`}
                      onClick={() => {
                        setSelectedDate(date);
                        const slots = timesByDate[date];
                        if (Array.isArray(slots) && slots.length > 0) {
                          setSelectedTime(slots[0]);
                        }
                      }}
                    >
                      <div className="optionName">
                        <IconCalendar size={14} style={{ marginRight: '4px' }} />
                        {new Date(date).toLocaleDateString('en-MY', { day: 'numeric', month: 'short' })}
                      </div>
                      <div className="optionPrice">{timesByDate[date]?.length || 0} slots</div>
                      {selectedDate === date && (
                        <div className="optionCheck">
                          <IconCircleCheckFilled size={15} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Time */}
            {/* {selectedDate && timesByDate[selectedDate] && (
              <div className="customizationGroup">
                <div className="groupTitle">
                  <span className="groupTitleOne">
                    <span className="modalDot"></span> Select Delivery Time
                  </span>
                </div>
                <div className="optionsGrid single">
                  {timesByDate[selectedDate].map((slot, idx) => (
                    <div
                      key={idx}
                      className={`optionCard ${selectedTime === slot ? 'selected' : ''} single`}
                      onClick={() => setSelectedTime(slot)}
                    >
                      <div className="optionName">
                        <IconClock size={15} style={{ marginRight: '4px' }} />
                        {formatTime12h(slot.time)}
                      </div>
                      <div className="optionPrice">{slot.inventory || 0} left</div>
                      {selectedTime === slot && (
                        <div className="optionCheck">
                          <IconCircleCheckFilled size={15} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Time */}
            {selectedDate && timesByDate[selectedDate] && (
              <div className="customizationGroup">
                <div className="groupTitle">
                  <span className="groupTitleOne">
                     <IconClock size={17} className='modalClock'/> Select Delivery Time
                  </span>
                </div>
                <div className="optionsGrid timeGrid">
                  {timesByDate[selectedDate].map((slot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`timeSlotBtn ${selectedTime === slot ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(slot)}
                    >
                      <div className="timeSlotTime">
                        
                        {formatTime12h(slot.time)}
                      </div>
                      <div className="timeSlotStock">
                        {slot.inventory || 0} left
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customizations */}
            {Array.isArray(menu.customizationGroups) && menu.customizationGroups.map((group) => (
              <div key={group.id || `g-${Date.now()}-${Math.random()}`} className="customizationGroup">
                <div className="groupTitle">
                  <span className="groupTitleOne">
                    <span className="modalDot"></span> {group.name || 'Options'}
                  </span>
                  {group.required && <span className="required">*</span>}
                </div>
                <div className={`optionsGrid ${group.type || 'single'}`}>
                  {Array.isArray(group.options) && group.options.map((option) => {
                    if (!option?.id) return null;
                    const isSelected = group.type === 'single'
                      ? selections[group.id] === option.id
                      : Array.isArray(selections[group.id]) && selections[group.id].includes(option.id);

                    return (
                      <div
                        key={option.id}
                        className={`optionCard ${isSelected ? 'selected' : ''} ${group.type || 'single'}`}
                        onClick={() => {
                          if (group.type === 'single') {
                            setSelections(prev => ({ ...prev, [group.id]: option.id }));
                          } else {
                            const cur = selections[group.id] || [];
                            const next = cur.includes(option.id)
                              ? cur.filter(id => id !== option.id)
                              : [...cur, option.id];
                            setSelections(prev => ({ ...prev, [group.id]: next }));
                          }
                        }}
                      >
                        <div className="optionName">{option.name || 'Option'}</div>
                        {option.price > 0 && (
                          <div className={`optionPrice ${isSelected ? 'selected' : ''}`}>
                            +{formatRM(option.price)}
                          </div>
                        )}
                        {option.included && (!option.price || option.price === 0) && (
                          <div className="optionIncluded">Included</div>
                        )}
                        {isSelected && (
                          <div className="optionCheck">
                            {group.type === 'single' ? <IconCircleCheckFilled size={15} /> : <IconCheck size={14} />}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ── FOOTER ── */}
          <div className="customizationFooter">
            {/* Price breakdown in footer */}
            <div className="footerPriceBreakdown">
              <span className="footerBasePrice">Base: {formatRM(basePrice)}</span>
              {totalPrice > basePrice && (
                <span className="footerAddonPrice">+ {formatRM(totalPrice - basePrice)}</span>
              )}
              <span className="footerTotalPrice">= {formatRM(totalPrice)}</span>
            </div>

            <button 
              className={`confirmBtn ${!isComplete ? 'confirmBtn--incomplete' : ''}`}
              onClick={handleConfirm}
              disabled={!isComplete}
            >
              {!isComplete ? 'Complete selections' : (
                <>
                  Add to Cart
                  {cartItemCount > 0 && <span className="cartBadge">{cartItemCount}</span>}
                  <span className="cartPrice"> • {formatRM(totalPrice)}</span>
                </>
              )}
            </button>
          </div>
      </motion.div>
    </div>
  );
}

export default CustomizationModal;