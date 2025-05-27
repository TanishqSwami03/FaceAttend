"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa"
import { motion } from "framer-motion"
import PageTransition from "../components/PageTransition"
import Button from "../components/Button"
import Popup from "../components/Popup"
import Header from "../components/Header"
import { getCourses, createCourse, deleteCourse, updateCourse } from "../api/course"

const Courses = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCourse, setNewCourse] = useState("")
  const [popup, setPopup] = useState({ show: false, type: "", message: "" })

  const [editingCourse, setEditingCourse] = useState(null) // 🔄 Track course being edited

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses()
        setCourses(response.data)
      } catch (error) {
        setPopup({
          show: true,
          type: "error",
          message: "Failed to load courses.",
        })
      }
    }

    fetchCourses()
  }, [])

  const handleAddCourse = async (e) => {
    e.preventDefault()
    if (newCourse.trim() === "") return

    // 🔍 Check for duplicate name (case insensitive)
    const isDuplicate = courses.some(
      (course) => course.name.trim().toLowerCase() === newCourse.trim().toLowerCase()
    )

    if (isDuplicate) {
      setPopup({ show: true, type: "error", message: "Course already exists!" })
      return
    }

    const adminData = JSON.parse(localStorage.getItem("admin"))
    try {
      console.log(adminData)
      const response = await createCourse({
        name: newCourse,
        organization: adminData?.organization_id,
      })
      setCourses([...courses, response.data])
      setNewCourse("")
      setShowAddForm(false)
      setPopup({ show: true, type: "success", message: "Course added successfully!" })
    } catch (error) {
      setPopup({ show: true, type: "error", message: "Failed to add course." })
    }
  }

  const handleUpdateCourse = async (e) => {
    e.preventDefault()
    if (!editingCourse || editingCourse.name.trim() === "") return

    const isDuplicate = courses.some(
      (course) =>
        course.name.trim().toLowerCase() === editingCourse.name.trim().toLowerCase() &&
        course.id !== editingCourse.id
    )

    if (isDuplicate) {
      setPopup({ show: true, type: "error", message: "Another course with this name already exists!" })
      return
    }

    try {
      const response = await updateCourse(editingCourse.id, {
        name: editingCourse.name,
        organization: editingCourse.organization,
      })
      const updatedList = courses.map((course) =>
        course.id === editingCourse.id ? response.data : course
      )
      setCourses(updatedList)
      setEditingCourse(null)
      setPopup({ show: true, type: "success", message: "Course updated successfully!" })
    } catch (error) {
      setPopup({ show: true, type: "error", message: "Failed to update course." })
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id)
      setCourses(courses.filter((course) => course.id !== id))
      setPopup({ show: true, type: "success", message: "Course deleted successfully!" })
    } catch (error) {
      setPopup({ show: true, type: "error", message: "Failed to delete course." })
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

      <h1 className="page-title">Courses</h1>

      {/* Add Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", maxWidth: "800px", margin: "0 auto 2rem auto" }}>
        {!editingCourse && (
          <Button variant="primary" onClick={() => setShowAddForm(true)}>
            <FaPlus />
            Add Course
          </Button>
        )}
      </div>

      {/* Add or Edit Form */}
      {(showAddForm || editingCourse) && (
        <div className="form-container" style={{ marginBottom: "2rem", maxWidth: "800px", marginInline: "auto" }}>
          <form onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse}>
            <div className="form-group">
              <label htmlFor="courseName" className="form-label">
                {editingCourse ? "Edit Course Name" : "Course Name"}
              </label>
              <input
                type="text"
                id="courseName"
                className="form-input"
                value={editingCourse ? editingCourse.name : newCourse}
                onChange={(e) => {
                  editingCourse
                    ? setEditingCourse({ ...editingCourse, name: e.target.value })
                    : setNewCourse(e.target.value)
                }}
                required
                placeholder="Enter course name"
              />
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                {editingCourse ? <><FaSave /> Save</> : <><FaPlus /> Add Course</>}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingCourse(null)
                  setNewCourse("")
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Courses Table */}
      <div className="table-container" style={{ maxWidth: "800px", marginInline: "auto" }}>
        {courses.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "2rem", color: "#888" }}>
            <p>No courses available.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Course Name</th>
                <th>Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  {/* <td>{course.id}</td> */}
                  <td>{course.name}</td>
                  <td>{course.students_count || 0}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => setEditingCourse(course)}
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
                        onClick={() => handleDelete(course.id)}
                        style={{
                          background: "rgba(255, 77, 77, 0.2)",
                          border: "none",
                          borderRadius: "4px",
                          padding: "0.5rem",
                          cursor: "pointer",
                          color: "var(--error-color)",
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Popup for notifications */}
      {popup.show && (
        <Popup type={popup.type} message={popup.message} isVisible={popup.show} onClose={handleClosePopup} />
      )}
    </PageTransition>
  )
}

export default Courses
