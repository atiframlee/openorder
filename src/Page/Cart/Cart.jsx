// src/Page/Cart/Cart.js
import React, { useEffect, useRef, useMemo } from 'react';
import './Cart.css';
import {
  IconChevronLeft,
  IconTrash,
  IconBuildingStore,
  IconShoppingCart,
  IconReceipt,
  IconCalendar,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { cartAtom } from '../../store/atoms';
import { motion } from 'framer-motion';
import { mockVendors } from '../../Data/MockVendors';

function Cart() {
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const gohome = () => navigate(-1);

  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    if (cart.length === 0) navigate(-1);
  }, [cart, navigate]);

  // ✅ Group cart: vendor → date → time
  const groupedCart = useMemo(() => {
    const result = {};

    cart.forEach(item => {
      const { vendorId, vendorName, selectedSlot, deliveryType = 'delivery' } = item;
      const { date, time } = selectedSlot;

      if (!result[vendorId]) result[vendorId] = { vendorName, dates: {} };
      if (!result[vendorId].dates[date]) result[vendorId].dates[date] = {};
      if (!result[vendorId].dates[date][time]) {
        result[vendorId].dates[date][time] = { deliveryType, items: [] };
      }

      result[vendorId].dates[date][time].items.push(item);
    });

    return result;
  }, [cart]);

  // ✅ Calculate per-vendor summary with per-slot delivery fees
  const vendorSummaries = useMemo(() => {
    const summaries = {};

    Object.entries(groupedCart).forEach(([vendorId, vendorData]) => {
      let vendorSubtotal = 0;
      let vendorDeliveryFee = 0;
      const slotFees = [];

      // Calculate subtotal for all items under this vendor
      Object.values(vendorData.dates).forEach(dateData => {
        Object.entries(dateData).forEach(([time, slotData]) => {
          // Calculate subtotal for this slot
          const slotSubtotal = slotData.items.reduce((sum, item) => sum + item.qty * item.price, 0);
          vendorSubtotal += slotSubtotal;

          // Calculate delivery fee for this slot (CURRENTLY: RM5 per delivery)
          // TODO: LATER - Allow vendor to set their own delivery fee per slot
          // TODO: LATER - Allow vendor to set min order for free delivery per slot
          let slotFee = 0;
          if (slotData.deliveryType === 'delivery') {
            slotFee = 5; // ✅ FIXED: RM5 per delivery (to be dynamic later)
          }
          vendorDeliveryFee += slotFee;

          // Store slot fee info for detailed display
          slotFees.push({
            time,
            fee: slotFee,
            deliveryType: slotData.deliveryType
          });
        });
      });

      summaries[vendorId] = {
        vendorName: vendorData.vendorName,
        subtotal: vendorSubtotal,
        deliveryFee: vendorDeliveryFee,
        total: vendorSubtotal + vendorDeliveryFee,
        slotFees // ✅ Store per-slot fee info
      };
    });

    return summaries;
  }, [groupedCart]);

  // ✅ Global totals (for final checkout button)
  const globalSubtotal = useMemo(() => cart.reduce((sum, item) => sum + item.qty * item.price, 0), [cart]);
  const globalDeliveryFee = useMemo(() => {
    let totalFee = 0;
    const bundles = {};
    cart.forEach(item => {
      const key = `${item.vendorId}|${item.selectedSlot.date}|${item.selectedSlot.time}|${item.deliveryType}`;
      if (!bundles[key]) bundles[key] = { subtotal: 0, deliveryType: item.deliveryType };
      bundles[key].subtotal += item.qty * item.price;
    });
    Object.values(bundles).forEach(bundle => {
      if (bundle.deliveryType === 'delivery') {
        // TODO: LATER - Allow vendor to set their own delivery fee per bundle
        totalFee += 5; // ✅ FIXED: RM5 per delivery (to be dynamic later)
      }
    });
    return totalFee;
  }, [cart]);
  const globalTotal = globalSubtotal + globalDeliveryFee;

  // ✅ Helper: Format date (e.g., '2025-12-08' → '8 Dec')
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('en-MY', {
      day: 'numeric',
      month: 'short'
    });
  };

  // ✅ Helper: 24h → 12h (e.g., '08:00' → '8am')
  const formatTime12h = (time24) => {
    if (!time24) return '';
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'pm' : 'am';
    let displayH = h % 12;
    if (displayH === 0) displayH = 12;
    return `${displayH}${m > 0 ? ':' + String(m).padStart(2, '0') : ''}${period}`;
  };

  // ✅ Reuse your existing customization formatter
  const formatCustomization = (menuId, customization = {}) => {
    let targetMenu = null;
    for (const vendor of mockVendors) {
      targetMenu = vendor.menus?.find(m => m.id === menuId);
      if (targetMenu) break;
    }
    if (!targetMenu) return null;

    const lines = [];
    Object.entries(customization).forEach(([groupId, value]) => {
      const group = targetMenu.customizationGroups?.find(g => g.id === groupId);
      if (!group) return;

      if (Array.isArray(value)) {
        value.forEach(id => {
          const opt = group.options.find(o => o.id === id);
          if (opt && (opt.price > 0 || !opt.included)) {
            lines.push(opt.name);
          }
        });
      } else {
        const opt = group.options.find(o => o.id === value);
        if (opt) lines.push(opt.name);
      }
    });
    return lines.length > 0 ? lines.join(', ') : null;
  };

  // ✅ Composite-key operations (fixes multi-vendor/slot updates)
  const getCompositeKey = (item) => {
    return `${item.vendorId}|${item.selectedSlot.date}|${item.selectedSlot.time}|${item.deliveryType}|${JSON.stringify(item.customization)}`;
  };

  const incQty = (item) => {
    const key = getCompositeKey(item);
    setCart(prev => prev.map(i => getCompositeKey(i) === key ? { ...i, qty: i.qty + 1 } : i));
  };

  const decQty = (item) => {
    const key = getCompositeKey(item);
    setCart(prev => {
      const updated = prev.map(i => 
        getCompositeKey(i) === key && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
      );
      return updated.filter(i => getCompositeKey(i) !== key || i.qty > 0);
    });
  };

  // ✅ FIXED: Remove specific item by index (not all with same key)
  const removeItem = (item) => {
    const key = getCompositeKey(item);
    setCart(prev => {
      // Find the FIRST item that matches the key
      const idx = prev.findIndex(i => getCompositeKey(i) === key);
      if (idx >= 0) {
        // Remove only that specific item (not all with same key)
        return prev.filter((_, i) => i !== idx);
      }
      return prev;
    });
  };

  const clearCart = () => {
    if (window.confirm("Clear cart?")) setCart([]);
  };

  const handleTouchStart = (e) => touchStartX.current = e.touches[0].clientX;
  const handleTouchEnd = (e) => {
    if (e.changedTouches[0].clientX - touchStartX.current > 50) gohome();
  };

  return (
    <motion.div
      className="cart"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.15 }}
    >
      {/* Header */}
      <div className="cartHeader">
        <div className="cartHeaderBlock" onClick={gohome}>
          <IconChevronLeft className="cartBack" />
          <span>Back</span>
        </div>
        <div className="cartHeaderBlock">Your Cart</div>
        <div className="cartHeaderBlock">
          <span className="clearCart" onClick={clearCart}>
            <IconTrash className="clearCartI" size={18} /> Clear
          </span>
        </div>
      </div>

      {/* ✅ Bundled Rendering: Vendor → Date → Time → Items */}
      {Object.entries(groupedCart).length === 0 ? (
        <div className="emptyCartContainer">
          <div className="emptyCart">Your cart is empty.</div>
        </div>
      ) : (
        Object.entries(groupedCart).map(([vendorId, vendorData]) => (
          <div key={vendorId} className="cartVendorSection">
            {/* Vendor Header */}
            <div className="cartVenName">
              <div className="cartSectionTitle">
                <IconBuildingStore className="cartSectionIcon" size={15} />
                <span className="cartVenTitle">Vendor</span>
              </div>
              <span className="cartVendorName">{vendorData.vendorName}</span>
            </div>

            {/* Dates for this vendor */}
            {Object.entries(vendorData.dates).map(([date, times]) => (
              <div key={date} className="cartDateSection">
                <div className="cartDateHeader">
                  <IconCalendar className="cartSectionIcon" size={15} />
                  <span className="cartDateTitle">{formatDate(date)}</span>
                </div>

                {/* Times under this date */}
                {Object.entries(times).map(([time, slotData]) => (
                  <div key={time} className="cartTimeSection">
                    <div className="cartTimeHeader">
                     <span className="cartTimeBorder">
                      <span className="cartTimeTitle">{formatTime12h(time)}</span>
                     </span>
                      <span className={`cartDeliveryTag ${slotData.deliveryType}`}>
                        {slotData.deliveryType === 'delivery' ? '🚚 Delivery' : '🏠 Pickup'}
                      </span>
                    </div>

                    {/* Items under this time slot */}
                    <div className="cartTimeItems">
                      {slotData.items.map((item, idx) => {
                        const customizationText = formatCustomization(item.menuId, item.customization);
                        return (
                          <div key={idx} className="cartMenu">
                            <div className="cartMenuLeft">
                              <div className="cartMenuName">{item.menuName}</div>
                              {customizationText && (
                                <div className="cartCustomization">
                                  ({customizationText})
                                </div>
                              )}
                              <div className="cartMenuPrice">
                                RM{item.price.toFixed(2)} × {item.qty}
                              </div>
                            </div>
                            <div className="cartMenuRight">
                              <div className="cartQtyControls">
                                <button
                                  className="qtyBtn minus"
                                  onClick={() => decQty(item)}
                                  disabled={item.qty === 1}
                                >
                                  −
                                </button>
                                <span className="cartQty">{item.qty}</span>
                                <button
                                  className="qtyBtn plus"
                                  onClick={() => incQty(item)}
                                >
                                  +
                                </button>
                              </div>
                              <div className="cartItemTotal">
                                RM{(item.qty * item.price).toFixed(2)}
                              </div>
                              <button
                                className="removeBtn"
                                onClick={() => removeItem(item)}
                              >
                                <IconTrash size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* ✅ Per-Vendor Summary with Per-Slot Fees */}
            <div className="cartVendorSummary">
              <div className="cartSectionTitle">
                <IconReceipt className="cartSectionIcon" size={15} />
                <span className="cartVenTitle">Order Summary</span>
              </div>
              <div className="totalLine">
                <span className="totalLabel">Subtotal:</span>
                <span className="totalAmountS">RM{vendorSummaries[vendorId].subtotal.toFixed(2)}</span>
              </div>
              
              {/* ✅ Per-slot delivery fees */}
              {vendorSummaries[vendorId].slotFees.length === 1 ? (
                // ✅ Single slot: show as "Delivery Fee"
                vendorSummaries[vendorId].slotFees[0].deliveryType === 'delivery' && (
                  <div className="totalLine">
                    <span className="totalLabel">Delivery Fee:</span>
                    <span className="totalAmountS">
                      RM{vendorSummaries[vendorId].slotFees[0].fee.toFixed(2)}
                    </span>
                  </div>
                )
              ) : (
                // ✅ Multiple slots: show per-slot fees
                vendorSummaries[vendorId].slotFees.map((slot, idx) => (
                  slot.deliveryType === 'delivery' && (
                    <div key={idx} className="totalLine">
                      <span className="totalLabel">
                        Delivery ({formatTime12h(slot.time)})
                      </span>
                      <span className="totalAmountS">
                        RM{slot.fee.toFixed(2)}
                      </span>
                    </div>
                  )
                ))
              )}
              
              <div className="totalLine grandTotal">
                <span className="totalLabel">Total:</span>
                <span className="totalAmount">RM{vendorSummaries[vendorId].total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="cartDamper"></div>

      {/* ✅ Fixed Checkout Button at Bottom */}
      {cart.length > 0 && (
        <div className="fixedCheckoutSection">
          <div className="totalLine grandTotal">
            <span className="totalLabel">Grand Total:</span>
            <span className="totalAmount">RM{globalTotal.toFixed(2)}</span>
          </div>
          <button className="checkoutBtn">
            Proceed to Checkout
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default Cart;