// axiosConfig.js

import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend API base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    // Add any headers you need for all requests
  },
});
function getToken() {
  return localStorage.getItem("token");
}

export function validateToken(token: string) {
  const decodedToken = jwtDecode(token);

  const { exp } = decodedToken;
  const currentTime = Date.now() / 1000;

  if (exp && exp < currentTime) {
    console.log("token expired");
    return false;
  }
  return true;
}

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    const { url } = config;
    if (token && validateToken(token) && !url?.includes("register")) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      window.localStorage.clear();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiClient;
