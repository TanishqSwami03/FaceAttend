import axios from "./axios";

export const getOrganizations = async () => {
  const res = await axios.get("/api/organizations/");
  return res.data;
};

export const registerOrganization = async (data) => {
  try {
    const res = await axios.post("/api/organizations/", data);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Organization registration failed",
    };
  }
};

export const deleteOrganization = async (id) => {
  try {
    const res = await axios.delete(`/api/organizations/${id}/`);
    return res.data;
  } catch (err) {
    console.error("Delete failed:", err);
    return null;
  }
};

