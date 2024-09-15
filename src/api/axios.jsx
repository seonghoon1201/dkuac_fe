import axios from "axios";
import userInfoStore from "../stores/userInfoStore";

export const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;
const clearUserInfoStorage = userInfoStore.persist.clearStorage;

// 기본 인스턴스
export const basicAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 인증이 필요한 인스턴스
export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken") || ''}`,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// JWT 디코딩 함수
const decodeJwt = (token) => {
  try {
    const base64Payload = token.split('.')[1]; // JWT의 페이로드 부분
    const decodedPayload = atob(base64Payload); // Base64 디코딩
    return JSON.parse(decodedPayload); // JSON으로 파싱
  } catch (e) {
    console.error("JWT 디코딩 오류:", e);
    return null;
  }
};

// 요청을 보내기 전 토큰 확인 및 처리
const makeRequest = async (axiosInstance, config) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // JWT 디코딩 (유효성 검사)
      const decodedToken = decodeJwt(token);
      const isTokenExpired = decodedToken && decodedToken.exp * 1000 < Date.now();

      if (isTokenExpired) {
        // Token이 만료된 경우
        localStorage.removeItem("accessToken"); // accessToken 제거
        clearUserInfoStorage(); // 사용자 정보 저장소 초기화
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login"; // 로그인 페이지로 리다이렉트
        return; // 이후 코드 실행 중단
      }

      // 토큰이 만료되지 않았으면 Authorization 헤더를 설정합니다.
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    }
    
    return await axiosInstance(config); // 요청 실행
  } catch (error) {
    console.error("요청 중 오류 발생:", error);
    throw error; // 오류를 외부로 전파
  }
};

// 기본 인스턴스와 인증 인스턴스에 대해 makeRequest 함수를 사용
export const basicRequest = (config) => makeRequest(basicAxios, config);
export const authRequest = (config) => makeRequest(authAxios, config);

/* 
리프레시 토큰을 활용한 기존 코드
-------------------------------
        try {
          // 새로운 access token 요청 (리프레시 토큰 사용 부분 제거)
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
-------------------------------
*/

// 응답 인터셉터 설정 (사용하지 않음)
/*
authAxios.interceptors.response.use(
  (response) => {
    return response; // 그대로 응답을 반환
  },
  async (error) => {
    console.log("error occurred in authAxios.interceptors.response.use");
    
    const userStore = userInfoStore(); // userInfoStore가 함수일 경우에 호출
    const { isLoggedIn } = userStore;
    console.log("isLoggedIn: ", isLoggedIn);
    
    // error.response가 있는지 확인
    if (error.response && isLoggedIn === true) {
      const originalRequest = error.config;
      
      // 401 Unauthorized 에러 처리
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 재시도 플래그 설정

        try {
          // **리프레시 토큰 없이 바로 로그아웃 처리** 
          localStorage.removeItem("accessToken"); // accessToken 제거
          clearUserInfoStorage(); // 사용자 정보 저장소 초기화
          alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/login"; // 로그인 페이지로 리다이렉트
          return; // 이후 코드 실행 중단
        } catch (logoutError) {
          console.error("로그아웃 처리 중 오류:", logoutError);
          return Promise.reject(logoutError);
        }
      }
    }
    
    return Promise.reject(error); // 다른 에러는 그대로 거부
  }
);
*/
