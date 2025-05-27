"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Home from "./pages/Home"
import AddStudent from "./pages/AddStudent"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import CheckAttendance from "./pages/CheckAttendance"
import AttendanceHistory from "./pages/AttendanceHistory"
import CheckStudents from "./pages/CheckStudents"
import Courses from "./pages/Courses"
import Admins from "./pages/Admins"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Router>
      <div className="app-container">
        <div className="ambient-light"></div>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/admin-login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
            <Route
              path="/admin-dashboard"
              element={<AdminDashboard />}
            />
            <Route
              path="/check-attendance"
              element={<CheckAttendance />} 
            />
            <Route
              path="/attendance-history"
              element={<AttendanceHistory />}
            />
            <Route
              path="/check-students"
              element={<CheckStudents />}
            />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admins" element={<Admins />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App
