"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaUserPlus } from "react-icons/fa"
import PageTransition from "../components/PageTransition"
import Button from "../components/Button"
import Popup from "../components/Popup"
import Logo from "../components/Logo"

const AddStudent = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    section: "",
    course: "",
    image: null,
  })
  const [popup, setPopup] = useState({ show: false, type: "", message: "" })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    console.log("Form submitted:", formData)

    // Show success popup
    setPopup({
      show: true,
      type: "success",
      message: "Student added successfully!",
    })

    // Reset form
    setFormData({
      name: "",
      section: "",
      course: "",
      image: null,
    })
  }

  const handleClosePopup = () => {
    setPopup({ show: false, type: "", message: "" })
  }

  return (
    <PageTransition>
      <Logo />
      <button className="back-btn" onClick={() => navigate("/")}>
        <FaArrowLeft />
      </button>

      <h1 className="page-title">Add New Student</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter student's full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="section" className="form-label">
              Section
            </label>
            <input
              type="text"
              id="section"
              name="section"
              className="form-input"
              value={formData.section}
              onChange={handleChange}
              required
              placeholder="Enter section (e.g. A, B, C)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="course" className="form-label">
              Course
            </label>
            <select
              id="course"
              name="course"
              className="form-select"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select a course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Student Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-file"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <Button type="submit" variant="primary">
              <FaUserPlus />
              Add Student
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

export default AddStudent
