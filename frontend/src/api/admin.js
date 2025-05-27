import axios from "./axios"

// Admin login
export const loginAdmin = async (data) => {
  try {
    const res = await axios.post("/api/admin-login/", data)
    return res.data
  } catch (err) {
    console.log(err)
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    }
  }
}

// Get all admins (organization-scoped for logged-in admin)
export const getAllAdmins = async () => {
  const res = await axios.get("/api/admins/")
  return res.data
}

// Add a new admin — used in both Register and Admins page
export const addAdmin = async (data) => {
  const res = await axios.post("/api/admins/", data)
  return res.data
}

// Delete an admin (used on Admins page only)
export const deleteAdmin = async (id) => {
  const res = await axios.delete(`/api/admins/${id}/`)
  return res.data
}
