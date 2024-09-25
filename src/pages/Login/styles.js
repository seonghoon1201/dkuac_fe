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
  password: {
    position : "relative",
    width: "300px",
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
    marginLeft: "10px", // 버튼 사이의 오른쪽 여백
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
  eyeIcon: {
    position: "absolute", // 부모 요소 내부에서의 위치 지정
    right: 10, // 오른쪽에서 10px 떨어진 위치
    top: "45%", // 입력 필드의 중간 높이에 배치
    transform: "translateY(-50%)", // 수직 가운데 정렬
    cursor: "pointer", // 커서를 포인터로 변경
    width: "24px", // 아이콘 크기 지정
    height: "24px", // 아이콘 크기 지정
  },
};

export default styles;
