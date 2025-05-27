import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaSignInAlt } from "react-icons/fa"
import PageTransition from "../components/PageTransition"
import Button from "../components/Button"
import Popup from "../components/Popup"
import Header from "../components/Header"
import { loginAdmin } from "../api/admin"

const AdminLogin = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [popup, setPopup] = useState({ show: false, type: "", message: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginAdmin(formData.email, formData.password)

      // Save token and org name in localStorage
      localStorage.setItem("token", res.token)
      localStorage.setItem("organization", res.organization)

      setIsAuthenticated(true)
      navigate("/admin-dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setPopup({
        show: true,
        type: "error",
        message: "Invalid credentials. Please try again.",
      })
    }
  }

  const handleClosePopup = () => {
    setPopup({ show: false, type: "", message: "" })
  }

  return (
    <PageTransition>
      <Header username="Guest" />
      <button className="back-btn" onClick={() => navigate("/")}>
        <FaArrowLeft />
      </button>

      <h1 className="page-title">Admin Login</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
          </div>

          <div className="form-actions">
            <Button type="submit" variant="primary">
              <FaSignInAlt />
              Login
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate("/")}>
              Go Back
            </Button>
          </div>
        </form>
      </div>

      {popup.show && (
        <Popup type={popup.type} message={popup.message} isVisible={popup.show} onClose={handleClosePopup} />
      )}
    </PageTransition>
  )
}

export default AdminLogin
