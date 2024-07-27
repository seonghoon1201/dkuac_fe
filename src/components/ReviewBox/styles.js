const styles = {
  reviewBox: {
    backgroundColor: "white",
    color: "#3a5ba0",
    borderRadius: "1vw",
    padding: "2vw",
    position: "relative",
    width: "40%",
    minWidth: "300px",
    boxSizing: "border-box", // Padding을 포함하여 크기를 계산
  },
  quotationIcon: {
    position: "absolute",
    top: "1vw",
    left: "1vw",
    width: "2.5vw",
  },
  reviewText: {
    fontSize: "1.5vw", // 글씨 크기 조정
    marginTop: "1vw", // 큰따옴표 아래에 공간 추가
  },
  reviewAuthor: {
    marginTop: "1.5vw",
    fontSize: "1.2vw", // 글씨 크기 조정
    fontWeight: "bold",
  },
  reviewDepartment: {
    fontSize: "1vw", // 글씨 크기 조정
    marginTop: "0.5vw",
  },
};

export default styles;
