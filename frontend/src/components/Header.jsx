"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { FaSignOutAlt } from "react-icons/fa"
import Logo from "./Logo"
import Button from "./Button"
import { getOrganizations } from "../api/organization" // ✅ use your existing service

const Header = () => {
  const navigate = useNavigate()
  const [adminName, setAdminName] = useState("Guest")
  const [organizationName, setOrganizationName] = useState("")

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"))
    if (admin) {
      setAdminName(admin.name)

      const fetchOrgName = async () => {
        try {
          const organizations = await getOrganizations()
          const org = organizations.find((o) => o.id === admin.organization)
          if (org) {
            setOrganizationName(org.name)
          }
        } catch (error) {
          console.error("Failed to fetch organization name", error)
        }
      }

      fetchOrgName()
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("admin")
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <motion.header
      className="app-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-logo">
        <Logo inHeader={true} />
      </div>
      <div className="header-right">
        <div className="welcome-message">
          <span>Welcome, </span>
          <span className="username">{adminName}</span>
          {organizationName && <span className="org-name"> ({organizationName})</span>}
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="secondary" onClick={handleLogout} className="logout-button">
            <FaSignOutAlt />
            Logout
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header
