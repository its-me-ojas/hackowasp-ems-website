// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://hackowasp.crestfallen.tech",
});

export const getAllTeams = () => api.get("/teamAll");
export const getAllMembers = () => api.get("/memberAll");
