import React from 'react';
import './Modal.css';
import { useAtom } from 'jotai';
import { modalAtom } from '../AtomStore';
import { motion } from 'framer-motion';

function CompAAModal({ children }) {
  const [, setModal] = useAtom(modalAtom);

  const handleDragEnd = (_, info) => {
    // Check if the modal was dragged down far enough
    if (info.offset.y > 30) {
      setModal(false); // Close the modal
    }
  };

  return (
    <motion.div
      className="modal"
      drag="y" // Enable vertical dragging
      dragConstraints={{ top: 0, bottom: 0 }} // Prevent dragging upward
      onDragEnd={handleDragEnd} // Handle drag end
      initial={{ y: "100%" }} // Start off-screen (below the viewport)
      animate={{ y: 0 }} // Animate into view
      exit={{ y: "100%" }} // Animate out of view when unmounted
      transition={{ type: "spring", stiffness: 300, damping: 30 }} // Smooth spring animation
    >
      <div className="modalContent">
        <div className="modalDragHandle"></div>
        {children}
      </div>
    </motion.div>
  );
}

export default CompAAModal;