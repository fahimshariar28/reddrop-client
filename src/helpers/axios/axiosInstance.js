import { authKey } from "@/constants/authKey";
import { getLocalStorage, storeLocalStorage } from "@/services/utils/localStorage";
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
    return {
      success: response.data.success,
      message: response.data.message,
      statusCode: response.data.statusCode,
      data: response.data.data

    };
  },
  async function (error) {

    const config = error.config;

    if (error.response.status === 500 && !config.sent) {
      config.sent = true;
      const response = await axiosInstance.getNewAccessToken();
      const accessToken = response.data.data.accessToken;
      config.headers["Authorization"] = accessToken;
      storeLocalStorage(authKey, accessToken);
      return axiosInstance(config);
    } else {
      const responseObj = {
        statusCode: error.response.data.statusCode,
        success: error.response.data.success,
        message: error.response.data.message,
      };

      return responseObj;
    }
  }
);

export default axiosInstance;
