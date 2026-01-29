import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  cartAtom,
  totalQtyAtom,
  totalAmtAtom,
  modalAtom,
  isCustomModalOpenAtom
} from '../store/atoms';

// At the top, after imports and before any functions
export const formatRM = (value) => {
  const num = parseFloat(value);
  return isNaN(num) ? 'RM0.00' : `RM${num.toFixed(2)}`;
};

// ✅ NEW: Auto-generate label from time (e.g., "08:00" → "8am")
export const generateLabelFromTime = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'pm' : 'am';
  let displayHours = hours % 12;
  if (displayHours === 0) displayHours = 12;
  return `${displayHours}${period}`;
};

// ✅ Helper: "08:00" → "8am", "17:00" → "5pm"
export const formatTime12h = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'pm' : 'am';
  let displayHours = hours % 12;
  if (displayHours === 0) displayHours = 12;
  return `${displayHours}${minutes > 0 ? ':' + String(minutes).padStart(2, '0') : ''}${period}`;
};

// ✅ Helper: Format date for display (Today/Tomorrow only)
const formatDateForDisplay = (dateStr) => {
  if (!dateStr) return '—';
  const slotDate = new Date(dateStr);
  if (isNaN(slotDate.getTime())) return '—';
  
  const today = new Date();
  today.setHours(0,0,0,0);
  slotDate.setHours(0,0,0,0);

  const diffDays = Math.floor((slotDate - today) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  
  // ✅ For other dates, return the formatted date (not "Day after tomorrow")
  return new Date(dateStr).toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'short'
  }).replace(/,/g, '');
};

// ✅ NEW: Get next available date based on menu's open slots
export const getNextAvailableDate = (openSlots, maxDays = 30) => {
  if (!openSlots || openSlots.length === 0) return null;
  
  // Find the earliest date with active slots
  const activeSlots = openSlots.filter(slot => 
    slot.status === 'active' && slot.inventory > 0
  );
  
  if (activeSlots.length === 0) return null;
  
  // Sort by date and return the first one
  const sortedSlots = [...activeSlots].sort((a, b) => new Date(a.date) - new Date(b.date));
  return sortedSlots[0].date;
};

// ✅ NEW: Get available delivery times for a menu on a specific date
export const getAvailableDeliveryTimes = (menu, date) => {
  if (!menu.openSlots) return [];
  
  const availableTimes = menu.openSlots.filter(slot => 
    slot.date === date && 
    slot.status === 'active' && 
    slot.inventory > 0
  );
  
  // ✅ NEW: Auto-generate labels if not present
  return availableTimes.map(time => ({
    ...time,
    label: time.label || generateLabelFromTime(time.time)
  }));
};

// ✅ NEW: Get next available delivery info for a menu
export const getNextAvailableSlot = (menu) => {
  // ✅ SAFETY: Check if menu exists and has status
  if (!menu) return null;
  if (!menu.status) return null; // If no status field, treat as unapproved
  if (menu.status !== 'approved') return null; // Only approved menus
  if (!menu.openSlots || menu.openSlots.length === 0) return null;
  
  const nextDate = getNextAvailableDate(menu.openSlots);
  if (!nextDate) return null;
  
  const availableTimes = getAvailableDeliveryTimes(menu, nextDate);
  
  if (availableTimes.length > 0) {
    return {
      date: nextDate,
      times: availableTimes,
      totalInventory: availableTimes.reduce((sum, time) => sum + time.inventory, 0)
    };
  }
  
  return null;
};

// ✅ NEW: Check if a delivery time is available (not past cutoff)
export const isDeliveryTimeAvailable = (time, date, cutoff) => {
  const now = new Date();
  const cutoffDateTime = new Date(date);
  const [cutoffHours, cutoffMinutes] = cutoff.split(':').map(Number);
  cutoffDateTime.setHours(cutoffHours, cutoffMinutes, 0, 0);
  
  return now < cutoffDateTime;
};

// ✅ NEW: Get all available dates for a menu (for date picker)
export const getAllAvailableDates = (menu, daysToLook = 14) => {
  // ✅ SAFETY: Check if menu exists and has status
  if (!menu) return [];
  if (!menu.status) return []; // If no status field, treat as unapproved
  if (menu.status !== 'approved') return [];
  if (!menu.openSlots) return [];
  
  const availableDates = new Set();
  const today = new Date();
  
  for (let i = 0; i <= daysToLook; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    const slotsForDate = menu.openSlots.filter(slot => 
      slot.date === dateStr && 
      slot.status === 'active' && 
      slot.inventory > 0
    );
    
    if (slotsForDate.length > 0) {
      availableDates.add(dateStr);
    }
  }
  
  return [...availableDates].sort((a, b) => new Date(a) - new Date(b));
};

// ✅ FIXED: Group only approved menus by their next available date
export const groupMenusByDate = (vendor) => {
  const grouped = {};
  
  if (!vendor?.menus) return grouped;
  
  // ✅ SAFETY: Only process menus that have status and are approved
  const approvedMenus = vendor.menus.filter(menu => 
    menu && 
    menu.status && 
    menu.status === 'approved'
  );
  
  approvedMenus.forEach(menu => {
    const nextSlot = getNextAvailableSlot(menu);
    
    if (nextSlot) {
      if (!grouped[nextSlot.date]) {
        grouped[nextSlot.date] = [];
      }
      
      // Check if menu is already added for this date
      const existingMenu = grouped[nextSlot.date].find(m => m.id === menu.id);
      if (!existingMenu) {
        grouped[nextSlot.date].push({
          ...menu,
          nextAvailableSlot: nextSlot
        });
      }
    }
  });
  
  return grouped;
};

// ✅ Helper: Get delivery pattern from open slots
export const getDeliveryPattern = (menu) => {
  // ✅ SAFETY: Check if menu exists and has status
  if (!menu) return '—';
  if (!menu.status) return '—'; // If no status field, treat as unapproved
  if (menu.status !== 'approved') return '—';
  if (!menu.openSlots) return '—';
  
  const days = [...new Set(menu.openSlots.map(slot => slot.day))].sort();
  return days.join(' • ') || '—';
};

// --- helpers ---
// ✅ UPDATED: Include slot & delivery in cart key for accurate deduplication
export const getCartKey = (item) =>
  JSON.stringify({
    vendorId: item.vendorId,
    menuId: item.menuId,
    slotKey: `${item.selectedSlot?.date}|${item.selectedSlot?.time}|${item.deliveryType || 'delivery'}`,
    customization: item.customization || {}
  });

export const calculatePrice = (menu, selections = {}) => {
  let total = menu.basePrice || 0;
  
  // Add customization prices
  menu.customizationGroups?.forEach((group) => {
    if (group.type === 'single') {
      const optId = selections[group.id];
      const opt = group.options.find((o) => o.id === optId);
      if (opt) total += opt.price || 0;
    } else if (group.type === 'multi') {
      const ids = selections[group.id] || [];
      ids.forEach((id) => {
        const opt = group.options.find((o) => o.id === id);
        if (opt) total += opt.price || 0;
      });
    }
  });
  
  return total;
};


// ✅ NEW: Check if a slot is still orderable (not past date/time)
export const isSlotOrderable = (slotDate, slotTime, cutoffTime = '10:00') => {
  const now = new Date();
  const slotDateTime = new Date(slotDate);
  const [hours, minutes] = cutoffTime.split(':').map(Number);
  
  // Set cutoff time for the slot date
  slotDateTime.setHours(hours, minutes, 0, 0);
  
  // If slot date is in the past, or cutoff time passed for today
  return new Date(slotDate) > now || now < slotDateTime;
};


// ✅ UPDATED: Full multi-vendor logic
export const useVendorsLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vendorData = location.state?.vendor;

  const touchStartX = useRef(0);
  const [cart, setCart] = useAtom(cartAtom);
  const [, setTotalQty] = useAtom(totalQtyAtom);
  const [, setTotalAmt] = useAtom(totalAmtAtom);
  const [, setModal] = useAtom(modalAtom);
  const [, setIsCustomModalOpen] = useAtom(isCustomModalOpenAtom);

  const [customizationModal, setCustomizationModal] = useState({
    isOpen: false,
    menu: null
  });

  useEffect(() => {
    const qty = cart.reduce((sum, item) => sum + item.qty, 0);
    const amt = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotalQty(qty);
    setTotalAmt(amt);
  }, [cart]);

  const gohome = () => navigate('/home');

  const handleTouchStart = (e) => touchStartX.current = e.touches[0].clientX;
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) gohome();
  };

  const getMenuTotalQty = (menuId) => {
    return cart.filter(item => item.menuId === menuId).reduce((sum, item) => sum + item.qty, 0);
  };

  // ✅ NEW: True multi-vendor add-to-cart (no blocking)
  const addToCart = (menu, vendor, customization = {}) => {
    _addToCart(menu, vendor, customization);
  };

  // ✅ UPDATED: Extract slot & delivery, promote to top-level
  const _addToCart = (menu, vendor, customization = {}) => {
    // ✅ Extract slot & delivery from customization (sent by CustomizationModal)
    const { 
      selectedDate, 
      selectedTime, 
      deliveryType = 'delivery', 
      ...restCustom 
    } = customization;

    // ✅ Validate required slot info
    if (!selectedDate || !selectedTime?.time) {
      console.error('Missing delivery slot — cannot add to cart');
      alert('⚠️ Please select a delivery date and time');
      return;
    }

    const newItem = {
      vendorId: vendor.id,
      vendorName: vendor.name,
      menuId: menu.id,
      menuName: menu.name,
      price: calculatePrice(menu, restCustom),
      customization: restCustom,
      qty: 1,
      // ✅ NEW: Top-level slot & delivery
      selectedSlot: {
        date: selectedDate,
        time: selectedTime.time
      },
      deliveryType  // 'delivery' | 'pickup'
    };

    setCart(prev => {
      const key = getCartKey(newItem);
      const idx = prev.findIndex(item => getCartKey(item) === key);
      if (idx >= 0) {
        return prev.map((item, i) => 
          i === idx ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, newItem];
    });
  };

  useEffect(()=>{
    console.log('cart ->',cart)
  },[])

  const decQty = (cartItemKey) => {
    setCart(prev => {
      const idx = prev.findIndex(item => getCartKey(item) === cartItemKey);
      if (idx < 0) return prev;
      if (prev[idx].qty === 1) return prev.filter((_, i) => i !== idx);
      return prev.map((item, i) => i === idx ? { ...item, qty: item.qty - 1 } : item);
    });
  };

  const openCustomizationModal = (menu) => {
    setCustomizationModal({ isOpen: true, menu });
    setModal(true);
    setIsCustomModalOpen(true);
  };

  const closeCustomizationModal = () => {
    setCustomizationModal({ isOpen: false, menu: null });
    setModal(false);
    setIsCustomModalOpen(false);
  };

  const confirmCustomization = (selections) => {
    // ✅ Now just call addToCart (no vendor restriction)
    addToCart(customizationModal.menu, vendorData, selections);
    closeCustomizationModal();
  };

  return {
    vendorData,
    cart,
    customizationModal,
    gohome,
    handleTouchStart,
    handleTouchEnd,
    // ✅ Expose addToCart (renamed from safeAddToCart)
    addToCart,
    decQty,
    getMenuTotalQty,
    openCustomizationModal,
    closeCustomizationModal,
    confirmCustomization,
    // Keep all helpers
    generateLabelFromTime,
    formatTime12h,
    formatDateForDisplay,
    getNextAvailableDate,
    getAvailableDeliveryTimes,
    getNextAvailableSlot,
    isDeliveryTimeAvailable,
    getAllAvailableDates,
    groupMenusByDate,
    getDeliveryPattern,
    isSlotOrderable
  };
};