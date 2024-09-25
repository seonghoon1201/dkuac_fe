import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles";
import userInfoStore from "../../stores/userInfoStore";
import { basicAxios } from "../../api/axios";

function SignUp() {
  const [name, setName] = useState("");
  const [emailID, setEmailID] = useState(""); // 이메일 ID 입력
  const [studentNumber, setStudentNumber] = useState("");
  const [major, setMajor] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [isSignupComplete, setIsSignupComplete] = useState(false);
  const { isLoggedIn } = userInfoStore();

  const navigate = useNavigate();

  const handleEmailVerification = () => {
    const email = `${emailID}@dankook.ac.kr`; // 완성된 이메일을 생성
    basicAxios
      .post("/auth/create-verification-code", {
        email,
      })
      .then(() => {
        setVerificationSent(true);
        setVerificationError("");
      })
      .catch((error) => {
        console.error("인증 코드 전송 오류:", error);
        alert("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const handleVerificationSubmit = () => {
    const email = `${emailID}@dankook.ac.kr`; // 인증 시에도 동일한 이메일 사용
    basicAxios
      .post("/auth/is-verified", {
        email,
        codeFromUser: verificationCode,
      })
      .then((response) => {
        if (response.data === true) {
          alert("인증이 완료되었습니다!");
          setVerificationError("");
        } else {
          setVerificationError("인증번호가 일치하지 않습니다.");
        }
      })
      .catch((error) => {
        console.error("인증 오류:", error);
        setVerificationError("인증번호가 일치하지 않습니다.");
      });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !emailID ||
      !major ||
      !studentNumber ||
      !birthDate ||
      !phoneNumber
    ) {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    const email = `${emailID}@dankook.ac.kr`; // 회원가입 시에도 완성된 이메일을 사용
    basicAxios
      .post("/auth/signup", {
        name: name,
        email,
        major: major,
        studentNumber: +studentNumber,
        birth: birthDate,
        phone: phoneNumber,
      })
      .then(() => {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("회원가입 오류:", error);
        alert(`${error.errorMessage}`);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div style={styles.container}>
      <h2>회원가입</h2>
      <form style={styles.form}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.inputField}
        />
        <div style={styles.emailContainer}>
          <input
            type="text"
            placeholder="이메일 ID"
            value={emailID}
            onChange={(e) => setEmailID(e.target.value)}
            style={styles.emailInput}
          />
          <span style={styles.emailDomain}>@dankook.ac.kr</span>
        </div>
        <div style={styles.emailButtonContainer}>
          <button
            type="button"
            style={{ ...styles.button, minWidth: "120px" }}
            onClick={handleEmailVerification}
          >
            이메일 인증
          </button>
        </div>
        {verificationSent && (
          <>
            <input
              type="text"
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              style={styles.inputField}
            />
            <button
              type="button"
              style={styles.button}
              onClick={handleVerificationSubmit}
            >
              인증번호 확인하기
            </button>
            {verificationError && (
              <div style={styles.errorMessage}>{verificationError}</div>
            )}
            <button
              type="button"
              style={styles.button}
              onClick={handleEmailVerification}
            >
              재전송
            </button>
          </>
        )}
        <input
          type="text"
          placeholder="학과 - ex) 소프트웨어학과"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="text"
          placeholder="학번 - ex) 32241234"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          style={styles.inputField}
        />
        <label htmlFor="birthDate" style={styles.label}>
          생년월일
        </label>
        <input
          type="date"
          placeholder="생년월일"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="text"
          placeholder="핸드폰 번호('-'제외하고 입력해 주세요)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={styles.inputField}
        />
        <button
          type="button"
          style={styles.button}
          onClick={handleSignupSubmit}
        >
          회원가입하기
        </button>
        {isSignupComplete && (
          <Link to="/login" style={styles.link}>
            로그인 페이지로 이동
          </Link>
        )}
      </form>
    </div>
  );
}

export default SignUp;
