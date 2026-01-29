import React, { useState, useEffect, useMemo } from 'react';
import './MiniCart.css';
import { useAtom } from 'jotai';
import { cartAtom } from '../store/atoms';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function MiniCart() {
  const [cart] = useAtom(cartAtom);
  const [totalQty, setTotalQty] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    setTotalQty(total);
    const amount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotalAmt(amount);
  }, [cart]);

  // ✅ Count distinct vendors (by vendorId)
  const vendorCount = useMemo(() => {
    const vendorIds = new Set(cart.map(item => item.vendorId));
    return vendorIds.size;
  }, [cart]);

  // Optional: Count distinct bundles (vendor + slot + deliveryType)
  // const bundleCount = useMemo(() => {
  //   const keys = new Set(
  //     cart.map(item => 
  //       `${item.vendorId}|${item.selectedSlot?.date}|${item.selectedSlot?.time}|${item.deliveryType}`
  //     )
  //   );
  //   return keys.size;
  // }, [cart]);

  if (cart.length === 0) return null;

  return (
    <motion.div
      className='miniCart'
      onClick={() => navigate('/cart')}
      initial={{ translateY: 200, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: 200, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
        mass: 0.8
      }}
    >
      <span className="miniCartBlockQty">
        <span className="miniCartQty">{totalQty}</span>
      </span>

      <span className="miniCartBlockCenter">
        <span className="miniCartView">View Your Cart</span>
        {vendorCount > 1 ? (
          <span className="miniCartVendor">From <b>{vendorCount}</b> vendors</span>
        ) : (
          <span className="miniCartVendor">{cart[0]?.vendorName || '1 vendor'}</span>
        )}
      </span>

      <span className="miniCartBlockAmt">RM{totalAmt.toFixed(2)}</span>
    </motion.div>
  );
}

export default MiniCart;