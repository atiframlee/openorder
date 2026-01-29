import React, { useState, useEffect } from 'react';
import './Vendors.css';
import {
  IconChevronLeft,
  IconHeart,
  IconStarFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconShare,
  IconSearch,
  IconBuildingStore,
  IconCirclePlus,
  IconCircleMinus,
  IconCoin,
  IconBowlChopsticks,
  IconCalendarTime,
  IconMoped,
   IconCashBanknote,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import CustomizationModal from './CustomizationModal';
import { useVendorsLogic } from './Vendors.logic';
import noImage from '../Assets/noImage.png';
import { formatRM } from './Vendors.logic';

function Vendors() {
  const {
    vendorData,
    cart,
    customizationModal,
    gohome,
    handleTouchStart,
    handleTouchEnd,
    safeAddToCart,
    decQty,
    getMenuTotalQty,
    openCustomizationModal,
    closeCustomizationModal,
    confirmCustomization,
    formatTime12h,
    formatDateForDisplay,
    groupMenusByDate,
    getDeliveryPattern,
    getNextAvailableSlot,
    generateLabelFromTime
  } = useVendorsLogic();

  // ✅ NEW: Track if modal is open to prevent vendor page gestures
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Update modal open state when customizationModal changes
    setIsModalOpen(customizationModal.isOpen);
  }, [customizationModal.isOpen]);

  if (!vendorData) {
    gohome();
    return null;
  }

  // ✅ Get grouped menus by date (using new simplified logic)
  const groupedMenus = groupMenusByDate(vendorData);

  // ✅ Sort dates chronologically
  const sortedDates = Object.keys(groupedMenus).sort((a, b) => new Date(a) - new Date(b));

  return (
    <motion.div
      className="vendors"
      // ✅ NEW: Only handle touch when modal is NOT open
      onTouchStart={!isModalOpen ? handleTouchStart : undefined}
      onTouchEnd={!isModalOpen ? handleTouchEnd : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.1 } }}
    >
      {/* ------- header ------- */}
      <div className="venNewHeader">
        <div className="venHeaderBlockFirst" onClick={gohome}>
          <IconChevronLeft className="venNewBack" />
          <span>Back</span>
        </div>
        <div className="venHeaderBlockSecond">Open Order</div>
        <div className="venHeaderBlockThird">
          <IconHeart />
          <IconShare className="venShareI" />
        </div>
      </div>

      {/* ------- vendor top card ------- */}
      <div className="venTop">
        <div className="venTopOne">
          <span className="venTopShopCon">
            <div className="venTopShopICon">
              <IconBuildingStore className="venTopShopI" size={15} />
            </div>
            <span className="venTopRate">
              <IconStarFilled className="venStar" size={14} />
              {vendorData.rating.avg.toFixed(1)} ({vendorData.rating.count})
            </span>
          </span>
          <span className="venTopName">{vendorData.name}</span>
          <span className="venTopLoc">
            {vendorData.location} • {vendorData.distance}km
          </span>
        </div>

        <div className="venTopTwo">
          <div className="venTopDel">
            Delivery
            {vendorData.delivery.self ? (
              <IconCircleCheckFilled className="venDelStat" />
            ) : (
              <IconCircleXFilled className="venDelStatX" />
            )}
          </div>
          <div className="venTopPickUp">
            Pick Up
            {vendorData.pickup ? (
              <IconCircleCheckFilled className="venDelStat" />
            ) : (
              <IconCircleXFilled className="venDelStatX" />
            )}
          </div>
        </div>
      </div>

      {/* ------- search ------- */}
      <div className="venSearchMenu">
        <IconSearch className="venSearchI" size={18} />
        <input
          type="text"
          className="venSearchIn"
          placeholder="Search Menu"
        />
      </div>

      {/* ------- DYNAMIC DATE GROUPS ------- */}
      <motion.div
        className="venMenusContainer"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
        }}
      >
        {sortedDates.length === 0 && (
          <div className="venNoMenus">
            No open orders available at the moment.
          </div>
        )}

        {sortedDates.map((dateKey) => {
          const menusForDate = groupedMenus[dateKey];
          const displayDate = formatDateForDisplay(dateKey);

          return (
            <React.Fragment key={dateKey}>
              {/* Date Category Header */}
              <div className="venCat">Open Order for <span className="venCatDate">{displayDate}</span></div>

              {/* Menus for this date */}
              {menusForDate.map((menuWithSlot) => {
                const { nextAvailableSlot, ...menu } = menuWithSlot;
                const totalQty = getMenuTotalQty(menu.id);

                // ✅ NEW: Auto-generate labels if not present (safety fallback)
                const availableTimeLabels = nextAvailableSlot?.times?.map(time => 
                  time.label || generateLabelFromTime(time.time)
                ) || [];

                const totalInventory = nextAvailableSlot?.totalInventory || 0;

                // ✅ Resolve image safely
                let imgSrc = null;
                if (menu.image) {
                  try {
                    imgSrc = require(`../Assets/${menu.image}`);
                  } catch (err) {
                    console.warn(`Image not found: ${menu.image}, using fallback`);
                    imgSrc = null;
                  }
                }

                return (
                  <motion.div
                    key={`${menu.id}-${dateKey}`}
                    className="venMenus"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // ✅ Open customization modal with available times
                      if (menu.customizationGroups?.length || nextAvailableSlot.times.length > 0) {
                        openCustomizationModal({
                          ...menu,
                          availableTimes: nextAvailableSlot.times, // Pass available times for modal
                          availableDate: dateKey // Pass the date
                        });
                      } else {
                        safeAddToCart(menu, vendorData, {});
                      }
                    }}
                  >
                    {/* left image or fallback */}
                    <div className="venMenusLeft">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={menu.name}
                          className="venMenuImg"
                          loading="lazy"
                        />
                      ) : (
                        <div className="venMenuImgFallback">
                          <img
                            src={noImage}
                            alt="No photo available"
                            className="fallbackImg"
                          />
                        </div>
                      )}
                    </div>

                    {/* middle info - MATCHING itemsRight style from Items.jsx */}
                    <div className="venMenusMid">
                      <span className="venMenusName">{menu.name}</span>

                      <span className="venMenusPrice">
                         < IconCashBanknote size={15} /> {formatRM(menu.basePrice)}
                      </span>

                      {/* ✅ Per-menu rating and sold count (like itemsRight) */}
                      {menu.menuRating && (
                        <span className="menuRating">
                          <IconStarFilled size={12} className="midstar" />
                          {menu.menuRating.avg.toFixed(1)} ({menu.menuRating.count})
                          
                          {menu.soldCount !== undefined && (
                            <> {' • '} {menu.soldCount} sold</>
                          )}
                        </span>
                      )}

                      {/* ✅ Inventory (like itemsRight) */}
                      <span className="inventoryInfo">
                        <IconBowlChopsticks size={12} className="invenIcon" />
                        {totalInventory} left
                      </span>

                      {/* ✅ Next delivery times (MAPPED INDIVIDUALLY) */}
                      <span className="vendorNextDelivery">
                       <span>
                        <IconCalendarTime size={12} className="calendarIcon" />Delivery start at 
                        <span className='vendorDelDate'>{formatDateForDisplay(nextAvailableSlot.date)}</span>
                       
                       </span> 
                        
                        <span className="vendorDelSlotCon">
                          {availableTimeLabels.map((timeLabel, index) => (
                          <span key={index} className="delTimeSlot">
                            {timeLabel}{index < availableTimeLabels.length - 1 ? '' : ''}
                          </span>
                        ))}
                        </span>
                      </span>
                    </div>

                    {/* right controls */}
                    <div className="venMenusRight">
                      {menu.customizationGroups?.length || nextAvailableSlot.times.length > 0 ? (
                        <>
                          <span className="venPlus"><IconCirclePlus/></span>
                          {totalQty > 0 && <span className="venMenuQty">{totalQty}</span>}
                        </>
                      ) : totalQty === 0 ? (
                        <span
                          className="venPlus"
                          onClick={(e) => {
                            e.stopPropagation();
                            safeAddToCart(menu, vendorData, {});
                          }}
                        >
                          <IconCirclePlus/>
                        </span>
                      ) : (
                        <div className="venQtyBox">
                          <span
                            className="venPlus"
                            onClick={(e) => {
                              e.stopPropagation();
                              safeAddToCart(menu, vendorData, {});
                            }}
                          >
                           <IconCirclePlus/> 
                          </span>
                          <span className="venMenuQty">{totalQty}</span>
                          <span
                            className="venMenuMinus"
                            onClick={(e) => {
                              e.stopPropagation();
                              // ✅ Find the first cart item with this menuId and get its key
                              const firstItem = cart.find(item => item.menuId === menu.id);
                              if (firstItem) {
                                const itemKey = JSON.stringify({
                                  vendorId: firstItem.vendorId,
                                  menuId: firstItem.menuId,
                                  customization: firstItem.customization || {}
                                });
                                decQty(itemKey); // ✅ Pass the item's key
                              }
                            }}
                          >
                            <IconCircleMinus/>
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </React.Fragment>
          );
        })}
      </motion.div>

      {/* ------- customisation modal ------- */}
      {customizationModal.isOpen && (
        <CustomizationModal
          isOpen={customizationModal.isOpen}
          onClose={closeCustomizationModal}
          menu={customizationModal.menu}
          onConfirm={confirmCustomization}
        />
      )}
    </motion.div>
  );
}

export default Vendors;










// import React, { useState, useEffect } from 'react';
// import './Vendors.css';
// import {
//   IconChevronLeft,
//   IconHeart,
//   IconStarFilled,
//   IconCircleCheckFilled,
//   IconCircleXFilled,
//   IconShare,
//   IconSearch,
//   IconBuildingStore,
//   IconCirclePlus,
//   IconCircleMinus,
//   IconCoin,
//   IconBowlChopsticks,
//   IconCalendarTime,
//   IconMoped
// } from '@tabler/icons-react';
// import { motion } from 'framer-motion';
// import CustomizationModal from './CustomizationModal';
// import { useVendorsLogic } from './Vendors.logic';
// import noImage from '../Assets/noImage.png';
// import { formatRM } from './Vendors.logic';

// function Vendors() {
//   const {
//     vendorData,
//     cart,
//     customizationModal,
//     gohome,
//     handleTouchStart,
//     handleTouchEnd,
//     addToCart, // ✅ Renamed from safeAddToCart
//     decQty,
//     getMenuTotalQty,
//     openCustomizationModal,
//     closeCustomizationModal,
//     confirmCustomization,
//     formatTime12h,
//     formatDateForDisplay,
//     groupMenusByDate,
//     getDeliveryPattern,
//     getNextAvailableSlot,
//     generateLabelFromTime,
//     isSlotOrderable // ✅ NEW: Import helper
//   } = useVendorsLogic();

//   // ✅ NEW: Track if modal is open to prevent vendor page gestures
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     // Update modal open state when customizationModal changes
//     setIsModalOpen(customizationModal.isOpen);
//   }, [customizationModal.isOpen]);

//   if (!vendorData) {
//     gohome();
//     return null;
//   }

//   // ✅ Get grouped menus by date (using new simplified logic)
//   const groupedMenus = groupMenusByDate(vendorData);

//   // ✅ Sort dates chronologically
//   const sortedDates = Object.keys(groupedMenus).sort((a, b) => new Date(a) - new Date(b));

//   return (
//     <motion.div
//       className="vendors"
//       // ✅ NEW: Only handle touch when modal is NOT open
//       onTouchStart={!isModalOpen ? handleTouchStart : undefined}
//       onTouchEnd={!isModalOpen ? handleTouchEnd : undefined}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
//       exit={{ opacity: 0, y: -20, transition: { duration: 0.1 } }}
//     >
//       {/* ------- header ------- */}
//       <div className="venNewHeader">
//         <div className="venHeaderBlockFirst" onClick={gohome}>
//           <IconChevronLeft className="venNewBack" />
//           <span>Back</span>
//         </div>
//         <div className="venHeaderBlockSecond">Open Order</div>
//         <div className="venHeaderBlockThird">
//           <IconHeart />
//           <IconShare className="venShareI" />
//         </div>
//       </div>

//       {/* ------- vendor top card ------- */}
//       <div className="venTop">
//         <div className="venTopOne">
//           <span className="venTopShopCon">
//             <div className="venTopShopICon">
//               <IconBuildingStore className="venTopShopI" size={15} />
//             </div>
//             <span className="venTopRate">
//               <IconStarFilled className="venStar" size={14} />
//               {vendorData.rating?.avg?.toFixed(1) || '—'} ({vendorData.rating?.count || 0})
//             </span>
//           </span>
//           <span className="venTopName">{vendorData.name}</span>
//           <span className="venTopLoc">
//             {vendorData.location} • {vendorData.distance}km
//           </span>
//         </div>

//         <div className="venTopTwo">
//           <div className="venTopDel">
//             Delivery
//             {vendorData.delivery?.self ? (
//               <IconCircleCheckFilled className="venDelStat" />
//             ) : (
//               <IconCircleXFilled className="venDelStatX" />
//             )}
//           </div>
//           <div className="venTopPickUp">
//             Pick Up
//             {vendorData.pickup ? (
//               <IconCircleCheckFilled className="venDelStat" />
//             ) : (
//               <IconCircleXFilled className="venDelStatX" />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ------- search ------- */}
//       <div className="venSearchMenu">
//         <IconSearch className="venSearchI" size={18} />
//         <input
//           type="text"
//           className="venSearchIn"
//           placeholder="Search Menu"
//         />
//       </div>

//       {/* ------- DYNAMIC DATE GROUPS ------- */}
//       <motion.div
//         className="venMenusContainer"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: { opacity: 0 },
//           visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
//         }}
//       >
//         {sortedDates.length === 0 && (
//           <div className="venNoMenus">
//             No open orders available at the moment.
//           </div>
//         )}

//         {sortedDates.map((dateKey) => {
//           const menusForDate = groupedMenus[dateKey];
//           const displayDate = formatDateForDisplay(dateKey);

//           return (
//             <React.Fragment key={dateKey}>
//               {/* Date Category Header */}
//               <div className="venCat">Open Order for <span className="venCatDate">{displayDate}</span></div>

//               {/* Menus for this date */}
//               {menusForDate.map((menuWithSlot) => {
//                 const { nextAvailableSlot, ...menu } = menuWithSlot;
                
//                 // ✅ NEW: Filter to only orderable slots (not past cutoff / sold out)
//                 const orderableSlots = nextAvailableSlot.times?.filter(slot => 
//                   slot.inventory > 0 && isSlotOrderable(slot.date, slot.time)
//                 ) || [];

//                 // ✅ NEW: Hide menu if no orderable slots remain
//                 if (orderableSlots.length === 0) return null;

//                 const totalQty = getMenuTotalQty(menu.id);

//                 // ✅ NEW: Calculate remaining inventory from orderable slots only
//                 const remainingInventory = orderableSlots.reduce((sum, s) => sum + s.inventory, 0);

//                 // ✅ NEW: Auto-generate labels for orderable slots only
//                 const availableTimeLabels = orderableSlots.map(time => 
//                   time.label || generateLabelFromTime(time.time)
//                 );

//                 // ✅ Resolve image safely
//                 let imgSrc = null;
//                 if (menu.image) {
//                   try {
//                     imgSrc = require(`../Assets/${menu.image}`);
//                   } catch (err) {
//                     console.warn(`Image not found: ${menu.image}, using fallback`);
//                     imgSrc = null;
//                   }
//                 }

//                 return (
//                   <motion.div
//                     key={`${menu.id}-${dateKey}`}
//                     className="venMenus"
//                     variants={{
//                       hidden: { opacity: 0, y: 10 },
//                       visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       // ✅ Open customization modal with available times
//                       if (menu.customizationGroups?.length || orderableSlots.length > 0) {
//                         openCustomizationModal({
//                           ...menu,
//                           availableTimes: orderableSlots, // ✅ Pass only orderable slots
//                           availableDate: dateKey
//                         });
//                       } else {
//                         addToCart(menu, vendorData, {});
//                       }
//                     }}
//                   >
//                     {/* left image or fallback */}
//                     <div className="venMenusLeft">
//                       {imgSrc ? (
//                         <img
//                           src={imgSrc}
//                           alt={menu.name}
//                           className="venMenuImg"
//                           loading="lazy"
//                         />
//                       ) : (
//                         <div className="venMenuImgFallback">
//                           <img
//                             src={noImage}
//                             alt="No photo available"
//                             className="fallbackImg"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     {/* middle info */}
//                     <div className="venMenusMid">
//                       <span className="venMenusName">{menu.name}</span>

//                       <span className="venMenusPrice">
//                          <IconCoin size={15} /> {formatRM(menu.basePrice)}
//                       </span>

//                       {/* ✅ Per-menu rating and sold count */}
//                       {menu.menuRating && (
//                         <span className="menuRating">
//                           <IconStarFilled size={12} className="midstar" />
//                           {menu.menuRating.avg?.toFixed(1) || '—'} ({menu.menuRating.count || 0})
                          
//                           {menu.soldCount !== undefined && (
//                             <> {' • '} {menu.soldCount} sold</>
//                           )}
//                         </span>
//                       )}

//                       {/* ✅ NEW: Show inventory OR unavailable status */}
//                       {orderableSlots.length > 0 ? (
//                         <span className="inventoryInfo">
//                           <IconBowlChopsticks size={12} className="invenIcon" />
//                           {remainingInventory} left
//                         </span>
//                       ) : (
//                         <span className="inventoryInfo unavailable">
//                           <IconCircleXFilled size={12} className="invenIcon" />
//                           Orders closed
//                         </span>
//                       )}

//                       {/* ✅ Next delivery times (for orderable slots only) */}
//                       <span className="vendorNextDelivery">
//                        <span>
//                         <IconCalendarTime size={12} className="calendarIcon" />Delivery start at 
//                         <span className='vendorDelDate'>{formatDateForDisplay(nextAvailableSlot.date)}</span>
                       
//                        </span> 
                        
//                         <span className="vendorDelSlotCon">
//                           {availableTimeLabels.map((timeLabel, index) => (
//                           <span key={index} className="delTimeSlot">
//                             {timeLabel}{index < availableTimeLabels.length - 1 ? '' : ''}
//                           </span>
//                         ))}
//                         </span>
//                       </span>
//                     </div>

//                     {/* right controls */}
//                     <div className="venMenusRight">
//                       {/* ✅ NEW: Disable controls if no orderable slots */}
//                       {orderableSlots.length > 0 ? (
//                         <>
//                           {menu.customizationGroups?.length || orderableSlots.length > 0 ? (
//                             <>
//                               <span className="venPlus"><IconCirclePlus/></span>
//                               {totalQty > 0 && <span className="venMenuQty">{totalQty}</span>}
//                             </>
//                           ) : totalQty === 0 ? (
//                             <span
//                               className="venPlus"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 addToCart(menu, vendorData, {});
//                               }}
//                             >
//                               <IconCirclePlus/>
//                             </span>
//                           ) : (
//                             <div className="venQtyBox">
//                               <span
//                                 className="venPlus"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   addToCart(menu, vendorData, {});
//                                 }}
//                               >
//                                <IconCirclePlus/> 
//                               </span>
//                               <span className="venMenuQty">{totalQty}</span>
//                               <span
//                                 className="venMenuMinus"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   const firstItem = cart.find(item => item.menuId === menu.id);
//                                   if (firstItem) {
//                                     const itemKey = JSON.stringify({
//                                       vendorId: firstItem.vendorId,
//                                       menuId: firstItem.menuId,
//                                       customization: firstItem.customization || {}
//                                     });
//                                     decQty(itemKey);
//                                   }
//                                 }}
//                               >
//                                 <IconCircleMinus/>
//                               </span>
//                             </div>
//                           )}
//                         </>
//                       ) : (
//                         <span className="orderClosed">Closed</span>
//                       )}
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </React.Fragment>
//           );
//         })}
//       </motion.div>

//       {/* ------- customisation modal ------- */}
//       {customizationModal.isOpen && (
//         <CustomizationModal
//           isOpen={customizationModal.isOpen}
//           onClose={closeCustomizationModal}
//           menu={customizationModal.menu}
//           onConfirm={confirmCustomization}
//         />
//       )}
//     </motion.div>
//   );
// }

// export default Vendors;