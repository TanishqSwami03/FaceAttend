"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaCalendarAlt, FaSearch } from "react-icons/fa"
import PageTransition from "../components/PageTransition"
import Button from "../components/Button"
import Logo from "../components/Logo"

// Mock data for attendance history
const mockHistory = [
  { id: 1, name: "John Doe", section: "A", course: "Computer Science", date: "2023-05-15", time: "09:15 AM" },
  { id: 2, name: "Jane Smith", section: "B", course: "Information Technology", date: "2023-05-15", time: "09:22 AM" },
  { id: 3, name: "Michael Johnson", section: "A", course: "Computer Science", date: "2023-05-15", time: "09:30 AM" },
  {
    id: 4,
    name: "Emily Williams",
    section: "C",
    course: "Electrical Engineering",
    date: "2023-05-15",
    time: "09:45 AM",
  },
  { id: 5, name: "David Brown", section: "B", course: "Information Technology", date: "2023-05-15", time: "10:05 AM" },
  { id: 6, name: "John Doe", section: "A", course: "Computer Science", date: "2023-05-14", time: "09:10 AM" },
  { id: 7, name: "Jane Smith", section: "B", course: "Information Technology", date: "2023-05-14", time: "09:18 AM" },
  { id: 8, name: "Michael Johnson", section: "A", course: "Computer Science", date: "2023-05-14", time: "09:25 AM" },
  {
    id: 9,
    name: "Emily Williams",
    section: "C",
    course: "Electrical Engineering",
    date: "2023-05-13",
    time: "09:40 AM",
  },
  { id: 10, name: "David Brown", section: "B", course: "Information Technology", date: "2023-05-13", time: "10:00 AM" },
]

const AttendanceHistory = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const filteredHistory = mockHistory.filter(
    (record) =>
      (record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.course.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (dateFilter === "" || record.date === dateFilter),
  )

  return (
    <PageTransition>
      <Logo />
      <button className="back-btn" onClick={() => navigate("/admin-dashboard")}>
        <FaArrowLeft />
      </button>

      <h1 className="page-title">Attendance History</h1>

      <div style={{ width: "100%", maxWidth: "1000px", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <div className="form-group" style={{ flex: "1", marginBottom: 0 }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search by name, section or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ width: "200px", marginBottom: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FaCalendarAlt style={{ color: "var(--accent-color)" }} />
              <input
                type="date"
                className="form-input"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>

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
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((record, index) => (
                <tr key={index}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>{record.section}</td>
                  <td>{record.course}</td>
                  <td>{record.date}</td>
                  <td>{record.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
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

export default AttendanceHistory
