export const getLocalStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeLocalStorageItem = (key) => {
  return localStorage.removeItem(key);
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
