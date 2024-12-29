export const storeLocalStorage = (key, value) => {
  if (!key || typeof window === "undefined") {
    return;
  }
  return localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return;
  }
  return localStorage.getItem(key);
};

export const removeLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return;
  }
  return localStorage.removeItem(key);
};
