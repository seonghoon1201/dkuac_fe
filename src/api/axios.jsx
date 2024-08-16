import axios from "axios";
import userInfoStore from "../stores/userInfoStore";

export const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;
const clearUserInfoStorage = userInfoStore.persist.clearStorage;
// 기본 인스턴스
export const basicAxios = axios.create({
  baseURL: BASE_URL,
  header: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

// 인증이 필요한 인스턴스
export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 응답 인터셉터 설정
authAxios.interceptors.response.use(
  // 요청이 성공적으로 완료되었을 때 호출되는 함수
  (response) => {
    return response; // 그대로 응답을 반환
  },
  // 요청이 실패했을 때 호출되는 함수 (예: 401 에러)
  async (error) => {
    console.log("error occured in authAxios.interceptors.response.use");
    const { isLoggedIn } = userInfoStore();
    if (isLoggedIn === true) {
      const originalRequest = error.config; // 원래의 요청 객체를 저장
      // 401 Unauthorized 에러이고, 재시도 플래그가 설정되지 않았을 경우
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 재시도 플래그 설정
        try {
          // 새로운 access token을 얻기 위해 refresh token을 사용하여 요청을 보냄
          const res = await basicAxios.get("/auth/token/access");
          const newAccessToken = res.data.accessToken; // 새로운 access token을 응답에서 추출
          localStorage.setItem("accessToken", newAccessToken); // 새로운 access token을 로컬 스토리지에 저장
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // 원래의 요청에 새로운 access token을 설정
          return authAxios(originalRequest); // 원래의 요청을 새로운 access token으로 다시 시도
        } catch (error) {
          // refresh token이 유효하지 않거나 만료된 경우
          console.error("Refresh token is invalid or expired:", error); // 콘솔에 에러를 출력
          localStorage.removeItem("accessToken"); // 로컬 스토리지에서 access token 제거
          clearUserInfoStorage(); // 사용자 정보 저장소 초기화
          alert("로그인이 필요한 기능입니다.");
          window.location.href = "/login"; // 로그인 페이지로 이동
        }
      }
    }
    return Promise.reject(error); // 다른 에러는 그대로 거부
  }
);
