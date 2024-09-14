import axios from "axios";
import userInfoStore from "../stores/userInfoStore";

export const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;
const clearUserInfoStorage = userInfoStore.persist.clearStorage;

// 기본 인스턴스
export const basicAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // 'header'를 'headers'로 수정
  },
  withCredentials: true,
});

// 인증이 필요한 인스턴스
export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken") || ''}`, // AccessToken이 없을 경우 빈 문자열 처리
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 응답 인터셉터 설정
authAxios.interceptors.response.use(
  (response) => {
    return response; // 그대로 응답을 반환
  },
  async (error) => {
    console.log("error occurred in authAxios.interceptors.response.use");
    
    const userStore = userInfoStore(); // userInfoStore가 함수일 경우에 호출
    const { isLoggedIn } = userStore; // isLoggedIn을 올바르게 가져오기
    console.log("isLoggedIn: ", isLoggedIn);
    
    // error.response가 있는지 확인
    if (error.response && isLoggedIn === true) {
      const originalRequest = error.config;
      
      // 401 Unauthorized 에러 처리
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 재시도 플래그 설정
        try {
          // 새로운 access token 요청
          const res = await basicAxios.get("/auth/token/access");
          const newAccessToken = res.data.accessToken; // 새로운 access token을 추출
          localStorage.setItem("accessToken", newAccessToken); // localStorage에 저장
          
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // 새 토큰으로 Authorization 헤더 수정
          return authAxios(originalRequest); // 요청 재시도
        } catch (refreshError) {
          // Refresh token이 만료되었거나 유효하지 않을 경우 처리
          console.error("Refresh token is invalid or expired:", refreshError);
          localStorage.removeItem("accessToken"); // accessToken 제거
          clearUserInfoStorage(); // 사용자 정보 저장소 초기화
          alert("로그인이 필요한 기능입니다.");
          window.location.href = "/login"; // 로그인 페이지로 리다이렉트
          return; // 이후 코드 실행 중단
        }
      }
    }
    
    return Promise.reject(error); // 다른 에러는 그대로 거부
  }
);
