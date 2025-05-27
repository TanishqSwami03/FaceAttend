"use client"

import { FaUserCheck } from "react-icons/fa"
import { motion } from "framer-motion"

const Logo = ({ inHeader = false }) => {
  return (
    <motion.div
      className={`logo-container ${inHeader ? "in-header" : ""}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo">
        <FaUserCheck color="white" size={24} />
      </div>
      <span className="logo-text">FaceAttend</span>
    </motion.div>
  )
}

export default Logo
