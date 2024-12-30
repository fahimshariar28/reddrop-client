import { authKey } from "@/constants/authKey";
import { getLocalStorage } from "@/services/utils/localStorage";
import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getLocalStorage(authKey);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    const responseData = response.data;
    return responseData;
  },
  function (error) {
    const responseObj = error.response.data;

    return responseObj;
  }
);

export default axiosInstance;
