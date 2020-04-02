export const getLocalStorageItem = key => {
  return localStorage.getItem(key);
};

export const removeLocalStorageItem = () => {
  return localStorage.clear();
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};
