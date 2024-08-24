const styles = {
  peopleContainer: {
    display: "flex",
    flexDirection: "row", // 기본적으로 가로 방향 배치
    justifyContent: "center",
    alignItems: "center",
    padding: "32px",
    flexWrap: "wrap",
  },
  departmentLink: {
    textDecoration: "none",
    color: "inherit",
  },
  department: {
    position: "relative", // 부모 요소에 위치 설정
    width: "300px", // 부서 카드의 너비 조절
    height: "200px", // 이미지 높이에 맞춰 설정
    margin: "16px",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "10px",
    transition: "transform 0.2s",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  },
  departmentImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute", // 부모 요소를 기준으로 절대 위치
    bottom: "0", // 이미지의 아래쪽에 배치
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // 반투명한 검정색으로 설정
    color: "white",
    textAlign: "center", // 글씨 가운데 정렬
    padding: "10px 0",
  },
  departmentName: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  departmentDescription: {
    fontSize: "14px",
  },
  // 반응형 스타일 추가
  "@media (max-width: 350px)": {
    peopleContainer: {
      flexDirection: "column", // 350px 이하의 화면에서는 세로 방향으로 배치
    },
  },
};

export default styles;
