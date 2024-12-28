export const storeLocalStorage = (key, value) => {
  if (!key || typeof window === "undefined") {
    return;
  }
  return localStorage.setItem(key, value);
};
