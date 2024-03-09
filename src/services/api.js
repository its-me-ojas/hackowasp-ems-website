// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getAllTeams = () => api.get("/teamAll");
export const getAllMembers = () => api.get("/memberAll");
