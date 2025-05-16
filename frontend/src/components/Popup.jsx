"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"

const Popup = ({ type, message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div className="popup-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className={`popup-card popup-${type}`}
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="popup-icon">
              {type === "success" ? <FaCheckCircle size={28} /> : <FaExclamationTriangle size={28} />}
            </div>
            <div className="popup-content">
              <p className="popup-message">{message}</p>
            </div>
            <motion.div
              className="popup-progress"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Popup
