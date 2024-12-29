import { jwtDecode } from "jwt-decode";

export const decode = (token) => {
  if (!token) {
    return;
  }
  return jwtDecode(token);
};
