"use client"

import { useNavigate } from "react-router-dom"
import { FaCalendarAlt, FaClipboardList, FaUserGraduate, FaBook, FaUserShield, FaArrowLeft } from "react-icons/fa"
import { motion } from "framer-motion"
import PageTransition from "../components/PageTransition"
import Card from "../components/Card"
import Header from "../components/Header"

const AdminDashboard = () => {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <Header username="Admin" />

      <motion.div
        className="enhanced-back-button"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 15px rgba(0, 198, 255, 0.5)",
          borderColor: "rgba(0, 198, 255, 0.8)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
        <span>Back</span>
      </motion.div>

      <h1 className="page-title">Admin Dashboard</h1>

      <div className="cards-container">
        <Card title="Check Attendance" icon={<FaClipboardList />} onClick={() => navigate("/check-attendance")} />
        <Card title="Attendance History" icon={<FaCalendarAlt />} onClick={() => navigate("/attendance-history")} />
        <Card title="Check Students" icon={<FaUserGraduate />} onClick={() => navigate("/check-students")} />
      </div>

      <div style={{ display: "flex", width: "100%", maxWidth: "1200px", gap: "2rem", marginTop: "2rem" }}>
        <div style={{ flex: 1 }}>
          <Card title="Courses" icon={<FaBook />} onClick={() => navigate("/courses")} />
        </div>
        <div style={{ flex: 1 }}>
          <Card title="Admins" icon={<FaUserShield />} onClick={() => navigate("/admins")} />
        </div>
      </div>
    </PageTransition>
  )
}

export default AdminDashboard
