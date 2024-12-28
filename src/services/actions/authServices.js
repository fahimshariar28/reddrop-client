import { authKey } from "@/constants/authKey";
import { storeLocalStorage } from "../utils/storeLocalStorage";

export const storeUserInfo = (token) => {
  storeLocalStorage(authKey, token);
};
