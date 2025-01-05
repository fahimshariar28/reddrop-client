import { authKey } from "@/constants/authKey";
import {
  getLocalStorage,
  removeLocalStorage,
  storeLocalStorage,
} from "../utils/localStorage";
import { decode } from "../utils/jwt";
import axiosInstance from "@/helpers/axios/axiosInstance";

export const storeUserInfo = (token) => {
  storeLocalStorage(authKey, token);
};

export const getUserInfo = () => {
  const token = getLocalStorage(authKey);
  const decodedData = decode(token);
  return decodedData;
};

export const isUserLoggedIn = () => {
  const token = getLocalStorage(authKey);
  return !!token
};

export const removeUserInfo = () => {
  return removeLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: "/auth/refresh",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  })
}