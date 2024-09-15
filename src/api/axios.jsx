import axios from "axios";
import { decode as jwt_decode } from "jwt-decode";
import userInfoStore from "../stores/userInfoStore";

// 기본 설정 및 유틸리티
export const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;
const clearUserInfoStorage = userInfoStore.persist.clearStorage;

// JWT 토큰 만료 여부를 확인하는 함수
export const isTokenExpired = (token) => {
  if (!token) return true; // 토큰이 없으면 만료로 간주

  try {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // 현재 시간을 초 단위로 변환
    return decodedToken.exp < currentTime; // 토큰의 만료 시간을 비교
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // 오류 발생 시 토큰이 만료된 것으로 간주
  }
};

// 기본 인스턴스
export const basicAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// // 인터셉터를 사용한 리프레시 토큰 로직 (주석 처리)
// // 인증이 필요한 인스턴스
// export const authAxios = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("accessToken") || ''}`, // AccessToken이 없을 경우 빈 문자열 처리
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// // 응답 인터셉터 설정 (주석 처리)
// authAxios.interceptors.response.use(
//   (response) => {
//     return response; // 그대로 응답을 반환
//   },
//   async (error) => {
//     console.log("error occurred in authAxios.interceptors.response.use");
    
//     const userStore = userInfoStore(); // userInfoStore가 함수일 경우에 호출
//     const { isLoggedIn } = userStore;
//     console.log("isLoggedIn: ", isLoggedIn);
    
//     if (error.response && isLoggedIn === true) {
//       const originalRequest = error.config;
      
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true; // 재시도 플래그 설정

//         try {
//           localStorage.removeItem("accessToken"); // accessToken 제거
//           clearUserInfoStorage(); // 사용자 정보 저장소 초기화
//           alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
//           window.location.href = "/login"; // 로그인 페이지로 리다이렉트
//           return; // 이후 코드 실행 중단
//         } catch (logoutError) {
//           console.error("로그아웃 처리 중 오류:", logoutError);
//           return Promise.reject(logoutError);
//         }
//       }
//     }
    
//     return Promise.reject(error); // 다른 에러는 그대로 거부
//   }
// );

// 인증이 필요한 인스턴스 (수정된 방식)
export const authAxios = async (endpoint, config = {}) => {
  const accessToken = localStorage.getItem("accessToken");

  // 토큰이 만료되었는지 확인
  if (!accessToken || isTokenExpired(accessToken)) {
    alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
    clearUserInfoStorage(); // 사용자 정보 저장소 초기화
    localStorage.removeItem("accessToken"); // accessToken 제거
    window.location.href = "/login"; // 로그인 페이지로 리다이렉트
    return; // 요청 중단
  }

  // 토큰이 유효하면 요청 진행
  const authHeaders = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios({
      method: config.method || "get", // 기본 메서드는 GET
      url: `${BASE_URL}${endpoint}`,
      headers: authHeaders,
      data: config.data || {}, // POST 등의 메서드를 위한 데이터
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error; // 오류를 그대로 반환
  }
};

/* 
리프레시 토큰을 활용한 기존 코드 (주석 처리)
-------------------------------
        try {
          const res = await basicAxios.get("/auth/token/access");
          const newAccessToken = res.data.accessToken; // 새로운 access token을 추출
          localStorage.setItem("accessToken", newAccessToken); // localStorage에 저장
          
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // 새 토큰으로 Authorization 헤더 수정
          return authAxios(originalRequest); // 요청 재시도
        } catch (refreshError) {
          console.error("Refresh token is invalid or expired:", refreshError);
          localStorage.removeItem("accessToken"); // accessToken 제거
          clearUserInfoStorage(); // 사용자 정보 저장소 초기화
          alert("로그인이 필요한 기능입니다.");
          window.location.href = "/login"; // 로그인 페이지로 리다이렉트
          return; // 이후 코드 실행 중단
        }
-------------------------------
*/
