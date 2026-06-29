import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getJobs = () => api.get("/jobs");

export const createJob = (data) =>
  api.post("/jobs", data);

export const updateJob = (id, data) =>
  api.put(`/jobs/${id}`, data);

export const deleteJob = (id) =>
  api.delete(`/jobs/${id}`);

export default api;