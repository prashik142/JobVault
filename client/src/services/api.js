import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getJobs = () => api.get("/jobs");

export const createJob = (data) =>
  api.post("/jobs", data);

export const updateJob = (id, data) =>
  api.put(`/jobs/${id}`, data);

export const deleteJob = (id) =>
  api.delete(`/jobs/${id}`);

export default api;