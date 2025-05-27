"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaUserPlus, FaEdit, FaTrash } from "react-icons/fa"
import { motion } from "framer-motion"
import PageTransition from "../components/PageTransition"
import Button from "../components/Button"
import Popup from "../components/Popup"
import Header from "../components/Header"
import { getAllAdmins, addAdmin, deleteAdmin } from "../api/admin"

const Admins = () => {
  const navigate = useNavigate()
  const [admins, setAdmins] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [popup, setPopup] = useState({ show: false, type: "", message: "" })

  // Fetch admins on load
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getAllAdmins()
        setAdmins(data)
      } catch (error) {
        setPopup({
          show: true,
          type: "error",
          message: "Failed to fetch admins.",
        })
      }
    }
    fetchAdmins()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAdmin = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setPopup({ show: true, type: "error", message: "Passwords do not match!" })
      return
    }

    try {
      await addAdmin({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      const updatedAdmins = await getAllAdmins()
      setAdmins(updatedAdmins)
      setFormData({ name: "", email: "", password: "", confirmPassword: "" })
      setShowAddForm(false)
      setPopup({ show: true, type: "success", message: "Admin added successfully!" })
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to add admin."
      setPopup({ show: true, type: "error", message: msg })
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteAdmin(id)
      const updatedAdmins = await getAllAdmins()
      setAdmins(updatedAdmins)
      setPopup({ show: true, type: "success", message: "Admin deleted successfully!" })
    } catch (error) {
      setPopup({ show: true, type: "error", message: "Failed to delete admin." })
    }
  }

  const handleClosePopup = () => {
    setPopup({ show: false, type: "", message: "" })
  }

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
        onClick={() => navigate("/admin-dashboard")}
      >
        <FaArrowLeft />
        <span>Back</span>
      </motion.div>

      <h1 className="page-title">Admins</h1>

      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="primary" onClick={() => setShowAddForm(true)}>
          <FaUserPlus />
          Add Admin
        </Button>
      </div>

      {showAddForm && (
        <div className="form-container" style={{ marginBottom: "2rem", maxWidth: "800px" }}>
          <form onSubmit={handleAddAdmin}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter admin name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter admin email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm password"
              />
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                <FaUserPlus />
                Add Admin
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container" style={{ maxWidth: "800px" }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin.id}>
                <td>{index + 1}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      style={{
                        background: "rgba(0, 198, 255, 0.2)",
                        border: "none",
                        borderRadius: "4px",
                        padding: "0.5rem",
                        cursor: "pointer",
                        color: "var(--accent-color)",
                      }}
                      disabled
                    >
                      <FaEdit />
                    </button>
                    <button
                      style={{
                        background: "rgba(255, 77, 77, 0.2)",
                        border: "none",
                        borderRadius: "4px",
                        padding: "0.5rem",
                        cursor: "pointer",
                        color: "var(--error-color)",
                      }}
                      onClick={() => handleDelete(admin.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popup.show && (
        <Popup type={popup.type} message={popup.message} isVisible={popup.show} onClose={handleClosePopup} />
      )}
    </PageTransition>
  )
}

export default Admins
