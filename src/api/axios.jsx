import axios from "axios";
import userInfoStore from "../stores/userInfoStore";

export const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;
const clearUserInfoStorage = userInfoStore.persist.clearStorage;

// 기본 인스턴스
export const basicAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 인증이 필요한 인스턴스
export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `bearer ${localStorage.getItem("accessToken") || ""}`,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ContentType이 multipart/form-data인 경우
export const formDataAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `bearer ${localStorage.getItem("accessToken") || ""}`,
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

formDataAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
