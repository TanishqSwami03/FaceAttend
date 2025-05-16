"use client"

import { useNavigate } from "react-router-dom"
import { FaCalendarAlt, FaClipboardList, FaUserGraduate, FaBook, FaUserShield } from "react-icons/fa"
import PageTransition from "../components/PageTransition"
import Card from "../components/Card"
import Logo from "../components/Logo"

const AdminDashboard = () => {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <Logo />
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
