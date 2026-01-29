import React, { useRef } from 'react';
import './Modal.css';
import { useAtom } from 'jotai';
import { modalAtom } from '../store/atoms';
import { motion } from 'framer-motion';

function CompAAModal({ children }) {
  const [, setModal] = useAtom(modalAtom);
  const contentRef = useRef(null);

  const handleDragEnd = (event, info) => {
    // Close when dragged down significantly
    if (info.offset.y > 100 || info.velocity.y > 400) {
      setModal(false);
    }
  };

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="modalContent"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 35,
        }}
        ref={contentRef}
      >
        <div className="modalDragHandle"></div>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default CompAAModal;