import { basicAxios } from "../api/axios";
import userInfoStore from "../stores/userInfoStore";

const logoutUtil = () => {
  const clearUserInfoStorage = userInfoStore.persist.clearStorage;
  localStorage.removeItem("accessToken");
  clearUserInfoStorage();
  basicAxios.post("/auth/logout");
  alert("다시 로그인해주세요.");
  window.location.href = "/login";
};

export default logoutUtil;
