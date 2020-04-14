export const getLocalStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeLocalStorageItem = () => {
  return localStorage.clear();
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
