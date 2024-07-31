import React from "react";
import styles from "./styles";

function Contact() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={styles.wrapper}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif" }}>Contact Page</h1>
        <div style={styles.upperBox}>
          <div style={styles.leftHalfBox}>
            <h4 style={styles.h4}>건의할 것이 있다면 말해주세요!</h4>
            <h4 style={styles.h4}>24시간 건의 받습니다.</h4>
          </div>
          <div style={styles.rightHalfBox}>곰돌이 사진 넣을 예정</div>
        </div>
        <div className="lowerBox" style={styles.lowerBox}>
          <div className="formContainer" style={styles.formContainer}>
            <input
              style={styles.input}
              type="text"
              placeholder="여러분의 의견을 말해주세요!"
            />
            <button style={styles.button}>제출</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
