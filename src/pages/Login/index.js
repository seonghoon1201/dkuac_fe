import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userInfoStore from "../../stores/userInfoStore";

function Login() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#3a5ba0", // 기존 테마 배경색 사용
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "300px",
    },
    inputField: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-around", // 가운데 정렬 및 간격 조정
      width: "100%",
      marginTop: "20px", // 버튼과 입력 필드 사이의 간격 조정
    },
    button: {
      width: "100%", // 버튼이 가로로 길도록 설정
      padding: "10px",
      margin: "10px 0",
      marginRight: "10px", // 버튼 사이의 오른쪽 여백
      border: "none",
      borderRadius: "20px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "#fff", // 흰색 버튼
      color: "#3a5ba0", // 기존 페이지 배경색 글씨
      textAlign: "center", // 텍스트 가운데 정렬
      textDecoration: "none", // 링크 텍스트 밑줄 제거
      fontWeight: "bold",
    },
  };
  const { setUserInfo, isLoggedIn } = userInfoStore();
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    if (studentNumber === "" || password === "") {
      alert("학번과 비밀번호를 입력해주세요.");
      return;
    }

    const input = {
      studentNumber,
      password,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/login`, input, {
        withCredentials: true,
      })
      .then((res) => {
        const {
          user: { id },
          accessToken,
          refreshToken,
        } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setUserInfo({ id, isLoggedIn: true });
        navigate("/");
      })
      .catch((err) => {
        alert(err.errorMessage);
        setStudentNumber("");
        setPassword("");
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2>로그인</h2>
      <form style={styles.form}>
        <input
          type="text"
          placeholder="학번을 입력해주세요."
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="password"
          placeholder="첫 비번은 010을 제외한 전화번호 8자리입니다."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.inputField}
        />
        <div style={styles.buttonContainer}>
          <button type="submit" onClick={handleClick} style={styles.button}>
            로그인
          </button>
          <Link to="/signup" style={{ width: "100%" }}>
            <button type="button" style={styles.button}>
              회원가입
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
