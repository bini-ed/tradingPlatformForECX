const getLocalStorageData = () => {
  return localStorage.getItem("userInfo");
};
const setLocalStorageData = (value) => {
  return localStorage.setItem("userInfo", value);
};
const removeLocalStorageData = () => {
  return localStorage.removeItem("userInfo");
};

export { getLocalStorageData, setLocalStorageData, removeLocalStorageData };
