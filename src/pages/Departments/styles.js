const styles = {
  membersContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "32px",
    flexWrap: "wrap",
  },
  member: {
    width: "300px",
    height: "500px",
    margin: "16px",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s",
    borderRadius: "10px",
  },
  memberImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  memberOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "50px",
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
  modalOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "10px",
    maxWidth: "80%",
    maxHeight: "80%",
  },
  modalImage: {
    width: "300px",
    height: "400px",
    borderRadius: "10px",
    marginRight: "20px",
    objectFit: "cover",
  },
  modalTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
  },
  modalRole: {
    fontSize: "28px", // 이름을 크게 표시
    marginBottom: "10px",
    fontWeight: "bold",
    color: "black",
  },
  modalName: {
    fontSize: "28px", // 이름을 크게 표시
    marginBottom: "10px",
    fontWeight: "bold",
    color: "black",
  },
  modalDepartment: {
    fontSize: "20px", // 학과를 중간 크기로 표시
    marginBottom: "5px",
    color: "black",
  },
  modalYear: {
    fontSize: "18px", // 학번을 작게 표시
    color: "black",
  },
};

export default styles;
