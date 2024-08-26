import axios from "axios";
import { signOut } from "next-auth/react";
const axiosInstance = axios.create({
  // baseURL: "http://103.119.171.134:5000",
  baseURL: "https://api.eim.digital/",
  // baseURL: "http://10.5.50.33:8080",
});
const requestInterceptor = axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      request.headers["Authorization"] = "Bearer " + accessToken;
      request.headers["Content-Type"] = "application/json";
    }
    return request;
  },
  (error) => {
    throw error;
  }
);
const responseInterceptor = axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;
    if (error?.response?.status == 401 && !originalRequest?.sent) {
      signOut({
        callbackUrl: "/login?error=Session expired. Please log in again.",
        redirect: true,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("loginToken");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      window.location.href = "/login";
      originalRequest.sent = true;
    }
    throw error;
  }
);

export default axiosInstance;
