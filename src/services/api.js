// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://goprog.crestfallen.tech",
});

export const getAllTeams = () => api.get("/teamAll");
export const getAllMembers = () => api.get("/memberAll");
