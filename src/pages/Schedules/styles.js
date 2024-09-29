const styles = {
  home: {
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    backgroundColor: "#3a5ba0",
    color: "white",
    overflowX: "hidden",
  },

  content: {
    flex: 1,
    padding: "2rem",
    width: "100%",
    display: "flex",
  },

  calendarAndEventContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start",
    gap: "1rem", // 추가된 부분: 달력과 일정 사이의 간격을 줄이기 위해 gap을 추가합니다.
  },

  calendarContainer: {
    flex: 2, // 달력 영역을 좀 더 넓게 설정
    marginRight: "1rem", // 줄어든 여백
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  calendarWrapper: {
    width: "100%",
  },

  calendar: {
    width: "100%", // 달력의 너비를 100%로 설정하여 부모 요소에 맞게 크기 조정
    maxWidth: "600px", // 최대 너비를 설정하여 크기를 제한
  },
  eventDot: {
    color: "#ff0000",
    textAlign: "center",
    marginTop: "0.5rem",
  },
  selectedDateContainer: {
    flex: 3, // 일정 영역을 넓게 설정
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 0.5vw 1vw rgba(0, 0, 0, 0.1)",
    color: "#3a5ba0",
  },
  selectedDate: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    alignItems: "center",
    boxShadow: "0 0.5vw 1vw rgba(0, 0, 0, 0.1)",
  },
  addIcon: {
    cursor: "pointer",
    marginLeft: "0.5rem",
  },
  eventList: {
    marginTop: "1rem",
  },
  eventItem: {
    backgroundColor: "#f0f0f0",
    padding: "0.5rem",
    borderRadius: "4px",
    marginBottom: "0.5rem",
    display: "flex",
    boxShadow: "0 0.5vw 1vw rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
    color: "#3a5ba0",
  },
  eventTitle: {
    fontWeight: "bold",
  },
  eventContent: {
    marginLeft: "1rem",
    flex: 1,
  },
  deleteIcon: {
    cursor: "pointer",
    color: "#ff0000",
  },
  noEventsMessage: {
    textAlign: "center",
    color: "#888888",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#ffffff",
    color: "#3a5ba0",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 1vw 2vw rgba(0, 0, 0, 0.2)",
    width: "90%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    border: "1px solid #cccccc",
  },
  textarea: {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    border: "1px solid #cccccc",
    resize: "vertical",
  },
  popupButtonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "#ffffff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default styles;
