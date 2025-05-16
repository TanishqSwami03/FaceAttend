"use client"

import { motion } from "framer-motion"

const PageTransition = ({ children }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div className="page-container" initial="initial" animate="animate" exit="exit" variants={pageVariants}>
      {children}
    </motion.div>
  )
}

export default PageTransition
