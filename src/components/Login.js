import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#3a5ba0', // 기존 테마 배경색 사용
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
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-around', // 가운데 정렬 및 간격 조정
      width: '100%',
      marginTop: '20px', // 버튼과 입력 필드 사이의 간격 조정
    },
    button: {
      width: '100%', // 버튼이 가로로 길도록 설정
      padding: '10px',
      margin: '10px 0',
      marginRight: '10px', // 버튼 사이의 오른쪽 여백
      border: 'none',
      borderRadius: '20px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#fff', // 흰색 버튼
      color: '#3a5ba0', // 기존 페이지 배경색 글씨
      textAlign: 'center', // 텍스트 가운데 정렬
      textDecoration: 'none', // 링크 텍스트 밑줄 제거
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h2>로그인</h2>
      <form style={styles.form}>
        <input type="text" placeholder="ID" style={styles.inputField} />
        <input type="password" placeholder="Password" style={styles.inputField} />
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            로그인
          </button>
          <Link to="/signup" style={{ width: '100%' }}>
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
