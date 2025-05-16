"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUserCheck, FaUserPlus, FaUserShield } from "react-icons/fa"
import PageTransition from "../components/PageTransition"
import Card from "../components/Card"
import Webcam from "../components/Webcam"
import Popup from "../components/Popup"
import Logo from "../components/Logo"

const Home = () => {
  const navigate = useNavigate()
  const [showWebcam, setShowWebcam] = useState(false)
  const [popup, setPopup] = useState({ show: false, type: "", message: "" })

  const handleMarkAttendance = () => {
    setShowWebcam(true)
  }

  const handleWebcamCapture = (isRecognized) => {
    if (isRecognized) {
      setPopup({
        show: true,
        type: "success",
        message: "Attendance Marked Successfully!",
      })
    } else {
      setPopup({
        show: true,
        type: "error",
        message: "Face Not Recognized!",
      })
    }
  }

  const handleClosePopup = () => {
    setPopup({ show: false, type: "", message: "" })
  }

  return (
    <PageTransition>
      <Logo />
      <h1 className="page-title">Attendance System Using Face Recognition</h1>

      <div className="cards-container">
        <Card title="Mark Attendance" icon={<FaUserCheck />} onClick={handleMarkAttendance} />
        <Card title="Add Student" icon={<FaUserPlus />} onClick={() => navigate("/add-student")} />
        <Card title="Admin Login" icon={<FaUserShield />} onClick={() => navigate("/admin-login")} />
      </div>

      {showWebcam && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
          }}
        >
          <Webcam onCapture={handleWebcamCapture} onClose={() => setShowWebcam(false)} />
        </div>
      )}

      {popup.show && (
        <Popup type={popup.type} message={popup.message} isVisible={popup.show} onClose={handleClosePopup} />
      )}
    </PageTransition>
  )
}

export default Home
