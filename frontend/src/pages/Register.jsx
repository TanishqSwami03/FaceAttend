"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaShieldAlt, FaArrowLeft } from "react-icons/fa"
import { motion } from "framer-motion"
import Button from "../components/Button"
import Popup from "../components/Popup"
import Logo from "../components/Logo"
import { registerOrganization } from "../api/organization"
import { addAdmin } from "../api/admin"

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setPopup({
        show: true,
        type: "error",
        message: "Passwords do not match!",
      });
      return;
    }

    try {
      // Step 1: Register organization
      const orgRes = await registerOrganization({ name: formData.name });

      if (!orgRes.id) {
        setPopup({
          show: true,
          type: "error",
          message: "Organization registration failed!",
        });
        return;
      }

      const orgId = orgRes.id;

      // Step 2: Register admin linked to that organization
      const adminRes = await addAdmin({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        organization: orgId,
      });

      if (!adminRes.id) {
        // Step 3: Rollback — delete the organization if admin creation failed
        await deleteOrganization(orgId);
        setPopup({
          show: true,
          type: "error",
          message: "Admin registration failed. Organization rolled back.",
        });
        return;
      }

      // ✅ Success: Save admin data
      localStorage.setItem("admin", JSON.stringify(adminRes));
      localStorage.setItem("token", "dummy-token"); // Replace with real token logic

      setPopup({
        show: true,
        type: "success",
        message: "Registration successful!",
      });

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setPopup({
        show: true,
        type: "error",
        message: "An error occurred during registration.",
      });
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };



  const handleClosePopup = () => {
    setPopup({ show: false, type: "", message: "" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="auth-page">
      <div className="auth-lighting"></div>

      {/* <motion.div
        className="auth-back-button"
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
      </motion.div> */}

      <motion.div className="auth-container" initial="hidden" animate="visible" variants={containerVariants}>
        {/* Left Column */}
        <motion.div className="auth-left" variants={itemVariants}>
          <div className="auth-logo-container">
            <Logo />
          </div>

          <div className="auth-features">
            <motion.div className="auth-feature" variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <div className="auth-feature-icon">
                <FaShieldAlt />
              </div>
              <div className="auth-feature-text">
                <h3>Advanced Analytics</h3>
                <p>Get detailed insights and reports on attendance patterns and trends</p>
              </div>
            </motion.div>

            <motion.div className="auth-feature" variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <div className="auth-feature-icon">
                <FaUserPlus />
              </div>
              <div className="auth-feature-text">
                <h3>Easy Management</h3>
                <p>Effortlessly manage students, courses, and attendance records in one place</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div className="auth-right" variants={itemVariants}>
          <motion.div className="auth-form-container" variants={itemVariants}>
            <motion.h2
              className="auth-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Create New Account
            </motion.h2>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <FaUser /> Organization Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter organization name"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <FaEnvelope /> Admin Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <FaLock /> Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  <FaLock /> Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  autoComplete="off"
                />
              </div>

              <div className="form-actions-auth">
                <Button type="submit" variant="primary">
                  <FaUserPlus />
                  Register
                </Button>
              </div>

              <div className="auth-links">
                <Link to="/login" className="auth-link">
                  Already have an account? Login
                </Link>
                {/* <Link to="/" className="auth-link">
                  Back to Home
                </Link> */}
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

export default Register
