import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [major, setmajor] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [isSignupComplete, setIsSignupComplete] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#3a5ba0',
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
      backgroundColor: '#fff',
      color: '#3a5ba0',
      fontWeight: 'bold',
    },
    emailButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      marginBottom: '10px',
    },
    errorMessage: {
      color: 'red',
      fontSize: '14px',
    },
    link: {
      textDecoration: 'none',
      color: '#3a5ba0',
      fontWeight: 'bold',
      backgroundColor: '#fff',
      padding: '10px 20px',
      borderRadius: '20px',
      marginTop: '10px',
    },
  };

  const handleEmailVerification = () => {
    console.log('이메일 인증 클릭됨');
    axios.post('http://localhost:3000/auth/create-verification-code', {
      studentNumber: studentNumber,
    }, {
      withCredentials: true
    })
    .then(response => {
      console.log('인증 코드 전송 성공:', response.data);
      setVerificationSent(true);
      setVerificationError(''); // 이메일 인증 코드가 성공적으로 전송됨을 설정합니다.
    })
    .catch(error => {
      console.error('인증 코드 전송 오류:', error);
      alert('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
    });
  };

  const handleVerificationSubmit = () => {
    axios.post('http://localhost:3000/auth/is-verified', {
      studentNumber: studentNumber,
      codeFromUser: verificationCode
    }, {
      withCredentials: true
    })
    .then(response => {
      console.log(response);
      if (response.data == true) {
        alert('인증이 완료되었습니다!');
        setVerificationError('');
      } else {
        setVerificationError('인증번호가 일치하지 않습니다.');
      }
    })
    .catch(error => {
      console.error('인증 오류:', error);
      setVerificationError('인증번호가 일치하지 않습니다.');
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!name || !major || !studentNumber || !birthDate || !phoneNumber) {
      alert('모든 정보를 입력해주세요!');
      return;
    }

    axios.post('http://localhost:3000/auth/signup', {
      name: name,
      major: major,
      studentNumber: studentNumber,
      birth: birthDate,
      phone: phoneNumber
    }, {
      withCredentials: true
    })
    .then(response => {
      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다!');
      setIsSignupComplete(true); // 회원가입 성공 시 상태 업데이트
    })
    .catch(error => {
      console.error('회원가입 오류:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    });
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
            onChange={(e) => setStudentNumber(e.target.value)}
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
            {verificationError && (
              <div style={styles.errorMessage}>{verificationError}</div>
            )}
            <button type="button" style={styles.button} onClick={handleEmailVerification}>
              재전송
            </button>
          </>
        )}
        <input
          type="text"
          placeholder="학과"
          value={major}
          onChange={(e) => setmajor(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="date"
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
        {isSignupComplete && (
          <Link to="/login" style={styles.link}>
            로그인 페이지로 이동
          </Link>
        )}
      </form>
    </div>
  );
}

export default Signup;
