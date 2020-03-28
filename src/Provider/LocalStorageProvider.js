export const getLocalStorageItem = (key) =>{
    return localStorage.getItem(key);
}

export const removeLocalStorageItem = () =>{
    return localStorage.clear();
}