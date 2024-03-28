import axios from "axios";

export const baseURL = "http://localhost/api";
const axiosI = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

axiosI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosI };