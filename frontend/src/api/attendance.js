import axios from "./axios";

export const markAttendance = async (imageData) => {
  const res = await axios.post("/api/mark-attendance/", imageData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getTodayAttendance = async () => {
  const res = await axios.get("/api/today-attendance/");
  return res.data;
};

export const getAllAttendance = async (filters = {}) => {
  const res = await axios.get("/api/attendance-history/", { params: filters });
  return res.data;
};
