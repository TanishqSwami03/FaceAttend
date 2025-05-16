"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaSearch } from "react-icons/fa"
import PageTransition from "../components/PageTransition"
import Button from "../components/Button"
import Logo from "../components/Logo"

// Mock data for today's attendance
const mockAttendance = [
  { id: 1, name: "John Doe", section: "A", course: "Computer Science", time: "09:15 AM" },
  { id: 2, name: "Jane Smith", section: "B", course: "Information Technology", time: "09:22 AM" },
  { id: 3, name: "Michael Johnson", section: "A", course: "Computer Science", time: "09:30 AM" },
  { id: 4, name: "Emily Williams", section: "C", course: "Electrical Engineering", time: "09:45 AM" },
  { id: 5, name: "David Brown", section: "B", course: "Information Technology", time: "10:05 AM" },
]

const CheckAttendance = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAttendance = mockAttendance.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <PageTransition>
      <Logo />
      <button className="back-btn" onClick={() => navigate("/admin-dashboard")}>
        <FaArrowLeft />
      </button>

      <h1 className="page-title">Today's Attendance</h1>

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
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.section}</td>
                  <td>{student.course}</td>
                  <td>{student.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageTransition>
  )
}

export default CheckAttendance
