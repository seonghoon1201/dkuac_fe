const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    padding: "2vw",
    fontFamily: "'Poppins', sans-serif",
    color: "#486BAD",
    backgroundColor: "#F5F5F5",
  },
  upperBox: {
    textAlign: "center",
    color: "white",
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1vw",
    color: "#486BAD",
    border: "1px solid white",
    borderRadius: "10px",
    backgroundColor: "white",
    fontFamily: "'Poppins', sans-serif",
  },

  leftHalfBox: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    minHeight: "50vh",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "2rem",
  },

  h4: {
    margin: "0",
    padding: "0",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "1.7rem",
    textAlign: "left",
  },

  rightHalfBox: {
    width: "50%",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  lowerBox: {
    color: "white",
    minHeight: "25vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1vw",
    color: "#486BAD",
    fontFamily: "'Poppins', sans-serif",
    width: "95vw", // lowerBox의 width 설정
  },

  formContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "100%", // lowerBox와 일치시키기 위해 width를 100%로 설정
  },

  input: {
    flex: 1,
    padding: "1vw",
    paddingRight: "4vw", // 버튼이 들어갈 공간 확보
    border: "1px solid #486BAD",
    borderRadius: "5px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "1.5rem",
    position: "relative",
    border: "none",
  },

  button: {
    position: "absolute",
    right: "0",
    bottom: "0",
    padding: "1vw",
    border: "1px solid #486BAD",
    borderRadius: "0 5px 5px 0",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "1.5rem",
    backgroundColor: "#486BAD",
    color: "white",
    cursor: "pointer",
    border: "none",
  },
};

export default styles;