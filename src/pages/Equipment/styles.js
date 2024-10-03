const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    margin: "20px 0",
  },
  description: {
    fontSize: "14px",
    color: "white",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  tableHeader: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#3a5ba0",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  sizeCell: (rentable) => ({
    backgroundColor:
      rentable === 0
        ? "red" // 남은 수량 0: 빨간색
        : rentable === 1
        ? "yellow" // 남은 수량 1: 노란색
        : "#90ee90", // 남은 수량 2개 이상: 밝은 연두색
    color: rentable === 0 ? "white" : "black", // 배경색에 따른 텍스트 색상
    border: "1px solid #000",
  }),
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  popupOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "4px",
    textAlign: "center",
  },
  popupTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "#3a5ba0",
  },
  popupContent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  sizeButton: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    cursor: "pointer",
    backgroundColor: "#3a5ba0", // 기본 배경색
    color: "white", // 기본 텍스트 색
  },
  closeButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#3a5ba0",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  rentButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#3a5ba0",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  returnButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  warnTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "red",
  },
  warnContent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    color: "red",
  },
  noticeText: {
    fontSize: "14px",
    color: "#3a5ba0",
    marginBottom: "10px",
  },
  returnMessage: {
    fontSize: "16px",
    color: "#3a5ba0",
  },
  legend: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
    fontSize: "14px",
  },
  square: (color) => ({
    width: "20px",
    height: "20px",
    backgroundColor: color,
    display: "inline-block",
    marginRight: "5px",
  }),
};

export default styles;