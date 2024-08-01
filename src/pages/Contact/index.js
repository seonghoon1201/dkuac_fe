import React, { useState } from "react";
import userInfoStore from "../../stores/userInfoStore";
import styles from "./styles";
import { authAxios } from "../../api/axios";
import contactBear from "../../images/contact_bear.png"; // 곰돌이 이미지 추가

function Contact() {
  const { isLoggedIn, userId } = userInfoStore();
  const [suggestions, setSuggestions] = useState("");

  const handleChangeSuggestion = (e) => {
    e.preventDefault();
    setSuggestions(e.target.value);
  };

  const handleClickButton = async (e) => {
    e.preventDefault();
    if (suggestions.replaceAll(" ", "").length === 0) {
      alert("빈칸이에요!");
      setSuggestions("");
      return;
    }
    const res = await authAxios.post("/suggestion", { content: suggestions });
    if (res.status === 201) {
      alert("성공적으로 제출되었습니다!");
    } else {
      console.error("Error submitting suggestion:", res);
      alert("제출에 실패했습니다.");
    }
    setSuggestions("");
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={styles.wrapper}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif" }}>Contact Page</h1>
        <div style={styles.upperBox}>
          <div style={styles.leftHalfBox}>
            <h4 style={styles.h4}>
              동아리 발전을 위해 건의할 것이 있다면 말해주세요!
            </h4>
            <h4 style={styles.h4}>24시간 건의 받습니다.</h4>
          </div>
          <div style={styles.rightHalfBox}>
            {/* 곰돌이 이미지 추가 */}
            <img
              src={contactBear}
              alt="곰돌이"
              style={{ width: "80%", height: "auto"}}
            />
          </div>
        </div>
        <div className="lowerBox" style={styles.lowerBox}>
          <div className="formContainer" style={styles.formContainer}>
            <input
              style={styles.input}
              type="text"
              placeholder={
                isLoggedIn
                  ? "여러분의 의견을 말해주세요!"
                  : "회원이 아니신가요? 로그인 후 이용해주세요!"
              }
              value={suggestions}
              onChange={handleChangeSuggestion}
              disabled={!isLoggedIn}
            />
            {isLoggedIn && (
              <button
                style={styles.button}
                onClick={handleClickButton}
                disabled={!isLoggedIn}
              >
                제출
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;