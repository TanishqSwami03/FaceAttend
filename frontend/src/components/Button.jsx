"use client"

import { motion } from "framer-motion"

const Button = ({ children, type = "button", variant = "primary", onClick }) => {
  return (
    <motion.button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

export default Button
