const styles = {
  sidebar: {
    width: "150px", // 고정 너비로 설정
    backgroundColor: "#ffffff",
    padding: "2vw 1vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  sidebarLink: {
    color: "#3a5ba0",
    fontSize: "14px", // 고정 글씨 크기
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "2vw",
    position: "relative",
  },
  sidebarLinkText: {
    display: "flex",
    alignItems: "center",
  },
  caretIcon: {
    marginRight: "0.5vw",
  },
  rightCaret: {
    marginRight: "0.5vw",
  },
  termList: {
    marginTop: "1vw",
    paddingLeft: "1.8vw", // Ensure the terms are aligned under the "활동" text
  },
  termItem: {
    color: "#3a5ba0",
    fontSize: "12px", // 고정 글씨 크기
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "0.5vw 0",
  },
  selectedTerm: {
    color: "#3a5ba0",
    fontSize: "12px", // 고정 글씨 크기
    fontWeight: "bold",
  },
};

export default styles;
