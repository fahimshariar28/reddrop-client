import { authKey } from "@/constants/authKey";
import {
  getLocalStorage,
  removeLocalStorage,
  storeLocalStorage,
} from "../utils/localStorage";
import { decode } from "../utils/jwt";

export const storeUserInfo = (token) => {
  storeLocalStorage(authKey, token);
};

export const getUserInfo = () => {
  const token = getLocalStorage(authKey);
  const decodedData = decode(token);
  return decodedData;
};

export const removeUserInfo = () => {
  return removeLocalStorage(authKey);
};
