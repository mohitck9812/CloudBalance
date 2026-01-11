import axios from "axios";
import { getToken, removeToken } from "../util/Utils";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token && !config.url.includes("/auth/login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 403 &&
      !error.config?.url.includes("/auth/login")
    ) {
      // removeToken();
      // window.location.replace("/");
      // console.log(error)
      toast.error("Authorization Error");
    }
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    }
    toast.error();
    return Promise.reject(error);
  }
);

export default api;
