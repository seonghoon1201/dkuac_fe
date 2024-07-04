import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [studentNumber, setstudentNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#3a5ba0', // 기존 테마 배경색 사용
      color: 'white',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '300px',
    },
    inputField: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: 'none',
      borderRadius: '20px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#fff', // 흰색 버튼
      color: '#3a5ba0', // 기존 페이지 배경색 글씨
      fontWeight: 'bold',
    },
    emailButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      marginBottom: '10px',
    },
  };

  const handleEmailVerification = () => {
    console.log('click');
    axios.post('http://localhost:3000/auth/create-verification-code', {
      studentNumber: studentNumber,
    }, {
      withCredentials:true
    })
    .then(response => {
      console.log('Verification code sent successfully:', response.data);
      setVerificationSent(true); // 이메일 인증 코드가 성공적으로 전송됨을 설정합니다.
    })
    .catch(error => {
      console.error('Error sending verification code:', error);
      // 여기서 오류 처리를 원하는 방식으로 구현할 수 있습니다.
    });
  };

  const handleVerificationSubmit = () => {
    // Handle verification code submission
    // Here you would verify the code entered by the user
    // and proceed with signup process if verification is successful
    alert(`Verification code ${verificationCode} confirmed!`);
  };

  const handleSignupSubmit = () => {
    // Handle signup form submission
    // Here you would submit the form data to your backend or perform necessary actions
    alert('Signup form submitted!');
  };

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
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <input
            type="text"
            placeholder="학번"
            value={studentNumber}
            onChange={(e) => setstudentNumber(e.target.value)}
            style={{ ...styles.inputField, marginRight: '10px' }}
          />
          <span style={{ fontSize: '16px', color: 'white' }}>@dankook.ac.kr</span>
        </div>
        <div style={styles.emailButtonContainer}>
          <button type="button" style={{ ...styles.button, minWidth: '120px' }} onClick={handleEmailVerification}>
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
            <button type="button" style={styles.button} onClick={handleVerificationSubmit}>
              인증번호 확인하기
            </button>
          </>
        )}
        <input
          type="text"
          placeholder="학과"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="text"
          placeholder="생년월일"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="text"
          placeholder="핸드폰 번호"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={styles.inputField}
        />
        <button type="button" style={styles.button} onClick={handleSignupSubmit}>
          회원가입하기
        </button>
      </form>
    </div>
  );
}

export default Signup;
