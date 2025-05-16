"use client"

import { motion } from "framer-motion"

const Card = ({ title, icon, onClick }) => {
  return (
    <motion.div
      className="card"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 198, 255, 0.4)",
      }}
      transition={{
        duration: 0.4,
        ease: [0.175, 0.885, 0.32, 1.275],
      }}
    >
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
    </motion.div>
  )
}

export default Card
