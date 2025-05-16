"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaUserPlus, FaEdit, FaTrash } from "react-icons/fa"
import PageTransition from "../components/PageTransition"
import Button from "../components/Button"
import Popup from "../components/Popup"
import Logo from "../components/Logo"

// Mock data for admins
const mockAdmins = [
  { id: 1, name: "Admin User", email: "admin@example.com" },
  { id: 2, name: "John Admin", email: "john@example.com" },
  { id: 3, name: "Jane Admin", email: "jane@example.com" },
]

const Admins = () => {
  const navigate = useNavigate()
  const [admins, setAdmins] = useState(mockAdmins)
  const [showAddForm, setShowAddForm] = useState(false)
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

  const handleAddAdmin = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setPopup({
        show: true,
        type: "error",
        message: "Passwords do not match!",
      })
      return
    }

    const newId = Math.max(...admins.map((admin) => admin.id)) + 1
    setAdmins([...admins, { id: newId, name: formData.name, email: formData.email }])
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setShowAddForm(false)
    setPopup({
      show: true,
      type: "success",
      message: "Admin added successfully!",
    })
  }

  const handleDelete = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id))
    setPopup({
      show: true,
      type: "success",
      message: "Admin deleted successfully!",
    })
  }

  const handleClosePopup = () => {
    setPopup({ show: false, type: "", message: "" })
  }

  return (
    <PageTransition>
      <Logo />
      <button className="back-btn" onClick={() => navigate("/admin-dashboard")}>
        <FaArrowLeft />
      </button>

      <h1 className="page-title">Admins</h1>

      <div
        style={{ width: "100%", maxWidth: "800px", marginBottom: "2rem", display: "flex", justifyContent: "flex-end" }}
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
              <label htmlFor="name" className="form-label">
                Name
              </label>
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
              <label htmlFor="email" className="form-label">
                Email
              </label>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
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
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
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
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
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
