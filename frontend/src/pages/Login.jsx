"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FaUserShield, FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa"
import { motion } from "framer-motion"
import Button from "../components/Button"
import Popup from "../components/Popup"
import Logo from "../components/Logo"
import { loginAdmin } from "../api/admin"

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [popup, setPopup] = useState({ show: false, type: "", message: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAdmin(formData);
      console.log(formData)

      if (response.success) {
        localStorage.setItem("admin", JSON.stringify(response.admin));
        localStorage.setItem("token", response.token);

        setPopup({
          show: true,
          type: "success",
          message: "Login successful!",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setPopup({
          show: true,
          type: "error",
          message: response.message || "Login failed!",
        });
      }
    } catch (err) {
      setPopup({
        show: true,
        type: "error",
        message: "An error occurred during login.",
      });
    }

    setFormData({ email: "", password: "" });
  };

  const handleClosePopup = () => {
    setPopup({ show: false, type: "", message: "" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  return (
    <div className="auth-page">
      <div className="auth-lighting"></div>

      <motion.div className="auth-container" initial="hidden" animate="visible" variants={containerVariants}>
        {/* Left Column */}
        <motion.div className="auth-left" variants={itemVariants}>
          <div className="auth-logo-container">
            <Logo />
          </div>
          <div className="auth-features">
            <motion.div className="auth-feature" variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <div className="auth-feature-icon"><FaUserShield /></div>
              <div className="auth-feature-text">
                <h3>Secure Attendance</h3>
                <p>Our facial recognition system ensures accurate and tamper-proof attendance tracking</p>
              </div>
            </motion.div>
            <motion.div className="auth-feature" variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <div className="auth-feature-icon"><FaSignInAlt /></div>
              <div className="auth-feature-text">
                <h3>Easy Access</h3>
                <p>Mark attendance with a simple face scan - no cards, passwords, or manual entry needed</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div className="auth-right" variants={itemVariants}>
          <motion.div className="auth-form-container" variants={itemVariants}>
            <motion.h2 className="auth-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              Login to Your Account
            </motion.h2>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label"><FaEnvelope /> Email</label>
                <input type="email" id="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label"><FaLock /> Password</label>
                <input type="password" id="password" name="password" className="form-input" value={formData.password} onChange={handleChange} required placeholder="Enter your password" />
              </div>

              <div className="form-actions-auth">
                <Button type="submit" variant="primary"><FaSignInAlt /> Login</Button>
              </div>

              <div className="auth-links">
                <Link to="/register" className="auth-link">Don't have an account? Register</Link>
                {/* <Link to="/" className="auth-link">Back to Home</Link> */}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>

      {popup.show && (
        <Popup type={popup.type} message={popup.message} isVisible={popup.show} onClose={handleClosePopup} />
      )}
    </div>
  )
}

export default Login
