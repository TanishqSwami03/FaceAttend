"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaSearch, FaEdit, FaTrash } from "react-icons/fa"
import { motion } from "framer-motion"
import PageTransition from "../components/PageTransition"
import Button from "../components/Button"
import Popup from "../components/Popup"
import Header from "../components/Header"

// Mock data for students
const mockStudents = [
  { id: 1, name: "John Doe", section: "A", course: "Computer Science" },
  { id: 2, name: "Jane Smith", section: "B", course: "Information Technology" },
  { id: 3, name: "Michael Johnson", section: "A", course: "Computer Science" },
  { id: 4, name: "Emily Williams", section: "C", course: "Electrical Engineering" },
  { id: 5, name: "David Brown", section: "B", course: "Information Technology" },
  { id: 6, name: "Sarah Davis", section: "A", course: "Computer Science" },
  { id: 7, name: "Robert Wilson", section: "C", course: "Mechanical Engineering" },
  { id: 8, name: "Jennifer Taylor", section: "B", course: "Civil Engineering" },
]

const CheckStudents = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState(mockStudents)
  const [popup, setPopup] = useState({ show: false, type: "", message: "" })

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id))
    setPopup({
      show: true,
      type: "success",
      message: "Student deleted successfully!",
    })
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

      <h1 className="page-title">Registered Students</h1>

      <div style={{ width: "100%", maxWidth: "1000px", marginBottom: "2rem" }}>
        <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: 0 }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by name, section or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="primary" className="search-button">
            <FaSearch />
            Search
          </Button>
        </div>
      </div>

      <div className="table-container" style={{ maxWidth: "1000px" }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Section</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.section}</td>
                  <td>{student.course}</td>
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
                        onClick={() => handleDelete(student.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {popup.show && (
        <Popup type={popup.type} message={popup.message} isVisible={popup.show} onClose={handleClosePopup} />
      )}
    </PageTransition>
  )
}

export default CheckStudents
