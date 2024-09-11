import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userInfoStore from "../../stores/userInfoStore";
import styles from "./styles";
import { basicAxios } from "../../api/axios";
import openEyeIcon from "../../images/open_eye.png";
import closeEyeIcon from "../../images/close_eye.png";

function Login() {
  const { setUserInfo, isLoggedIn } = userInfoStore();
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태
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

    basicAxios
      .post(`/auth/login`, input, {
        withCredentials: true,
      })
      .then((res) => {
        const {
          user: { id, name, isStaff },
          accessToken,
          expiredTime,
        } = res.data;
        console.log(res.data);
        localStorage.setItem("accessToken", accessToken);
        setUserInfo({ id, name, isStaff, isLoggedIn: true, expiredTime });
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.message);
        setStudentNumber("");
        setPassword("");
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // 비밀번호 표시 토글
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
          required
        />
        <div style={styles.password}>
          <input
            type={showPassword ? "text" : "password"} // 비밀번호가 보이는지 여부에 따라 타입 설정
            placeholder="첫 비번은 010을 제외한 전화번호 8자리입니다."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.inputField}
            required
          />
          <img
            src={showPassword ? closeEyeIcon : openEyeIcon}
            alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            onClick={togglePasswordVisibility}
            style={styles.eyeIcon}
          />
        </div>
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