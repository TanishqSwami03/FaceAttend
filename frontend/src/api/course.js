import axios from "./axios"

export const getCourses = async () => {
  return axios.get("/api/courses/")
}

export const createCourse = async (data) => {
  return axios.post("/api/courses/", data)
}

export const deleteCourse = async (id) => {
  return axios.delete(`/api/courses/${id}/`)
}

export const updateCourse = async (id, data) => {
  return axios.put(`/api/courses/${id}/`, data)
}
