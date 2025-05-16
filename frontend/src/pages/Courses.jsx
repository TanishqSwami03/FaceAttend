"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import PageTransition from "../components/PageTransition"
import Button from "../components/Button"
import Popup from "../components/Popup"
import Logo from "../components/Logo"

// Mock data for courses
const mockCourses = [
  { id: 1, name: "Computer Science", students: 45 },
  { id: 2, name: "Information Technology", students: 38 },
  { id: 3, name: "Electrical Engineering", students: 32 },
  { id: 4, name: "Mechanical Engineering", students: 28 },
  { id: 5, name: "Civil Engineering", students: 25 },
]

const Courses = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState(mockCourses)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCourse, setNewCourse] = useState("")
  const [popup, setPopup] = useState({ show: false, type: "", message: "" })

  const handleAddCourse = (e) => {
    e.preventDefault()
    if (newCourse.trim() === "") return

    const newId = Math.max(...courses.map((course) => course.id)) + 1
    setCourses([...courses, { id: newId, name: newCourse, students: 0 }])
    setNewCourse("")
    setShowAddForm(false)
    setPopup({
      show: true,
      type: "success",
      message: "Course added successfully!",
    })
  }

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id))
    setPopup({
      show: true,
      type: "success",
      message: "Course deleted successfully!",
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

      <h1 className="page-title">Courses</h1>

      <div
        style={{ width: "100%", maxWidth: "800px", marginBottom: "2rem", display: "flex", justifyContent: "flex-end" }}
      >
        <Button variant="primary" onClick={() => setShowAddForm(true)}>
          <FaPlus />
          Add Course
        </Button>
      </div>

      {showAddForm && (
        <div className="form-container" style={{ marginBottom: "2rem", maxWidth: "800px" }}>
          <form onSubmit={handleAddCourse}>
            <div className="form-group">
              <label htmlFor="courseName" className="form-label">
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                className="form-input"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                required
                placeholder="Enter course name"
              />
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                <FaPlus />
                Add Course
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
              <th>Course Name</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.students}</td>
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
                      onClick={() => handleDelete(course.id)}
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

export default Courses
