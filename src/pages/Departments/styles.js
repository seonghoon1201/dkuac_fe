const styles = {
  membersContainer: {
    display: "flex",
    flexDirection: "row", // 기본적으로 가로 방향 배치
    justifyContent: "center",
    alignItems: "center",
    padding: "32px",
    flexWrap: "wrap",
  },
  member: {
    width: "300px",
    height: "400px",
    margin: "16px",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s",
    borderRadius: "10px",
  },
  memberImage: {
    width: "100%",   // 부모 요소의 너비에 맞춤
    height: "100%",  // 부모 요소의 높이에 맞춤
    objectFit: "cover",
  },
  memberOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",   // 부모 요소의 너비에 맞춤
    height: "50px",  // 오버레이의 높이 고정
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  memberName: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  memberRole: {
    fontSize: "14px",
  },
};

export default styles;
