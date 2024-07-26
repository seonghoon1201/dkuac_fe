const styles = {
  home: {
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    backgroundColor: '#3a5ba0',
    color: 'white',
  },
  sidebar: {
    width: '150px', // 고정 너비로 설정
    backgroundColor: '#ffffff',
    padding: '2vw 1vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  sidebarLink: {
    color: '#3a5ba0',
    fontSize: '14px', // 고정 글씨 크기
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '2vw',
    position: 'relative',
  },
  sidebarLinkText: {
    display: 'flex',
    alignItems: 'center',
  },
  caretIcon: {
    marginRight: '0.5vw',
  },
  rightCaret: {
    marginRight: '0.5vw',
  },
  termList: {
    marginTop: '1vw',
    paddingLeft: '1.8vw', // Ensure the terms are aligned under the "활동" text
  },
  termItem: {
    color: '#3a5ba0',
    fontSize: '12px', // 고정 글씨 크기
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5vw 0',
  },
  content: {
    flex: 1, // 컨텐츠가 남은 공간을 차지하도록 설정
    padding: '2vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  banner: {
    backgroundColor: '#ffffff',
    borderRadius: '1vw',
    padding: '2vw',
    boxShadow: '0 0.5vw 1vw rgba(0, 0, 0, 0.1)',
    color: '#3a5ba0',
  },
  bannerItem: {
    marginBottom: '2vw',
    color: '#3a5ba0',
  },
  bannerTitle: {
    fontSize: '2vw',
    fontWeight: 'bold',
    color: '#3a5ba0',
    marginBottom: '1vw',
  },
  activityContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  activityBox: {
    width: '30%',
    backgroundColor: '#f1f1f1',
    borderRadius: '1vw',
    padding: '1vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 0.5vw 1vw rgba(0, 0, 0, 0.1)',
  },
  activityImage: {
    width: '100%',
    height: '100%',
    borderRadius: '0.5vw',
  },
  activityName: {
    fontSize: '1.2vw',
    fontWeight: 'bold',
    color: '#3a5ba0',
    marginTop: '0.5vw',
  },
  calendarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: '3vw',
  },
  calendarWrapper: {
    flex: 3, // 더 많은 공간을 차지하도록 설정
    padding: '1vw',
    boxSizing: 'border-box',
    width: '100%',
    height: 'auto',
    color: 'black',
  },
  calendar: {
    width: '100%', // 캘린더가 컨테이너 너비에 맞춰서 커지도록 설정
    height: 'auto', // 자동 높이 설정
  },
  selectedDateContainer: {
    flex: 1, // 남은 공간을 차지하도록 설정
    padding: '1vw',
    boxSizing: 'border-box',
  },
  selectedDate: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.5vw',
    fontWeight: 'bold',
    color: '#3a5ba0',
    padding: '1vw',
    backgroundColor: '#ffffff',
    borderRadius: '0.5vw',
    boxShadow: '0 0.5vw 1vw rgba(0, 0, 0, 0.1)',
  },
  addIcon: {
    cursor: 'pointer',
    color: '#3a5ba0',
  },
  eventList: {
    marginTop: '1vw',
  },
  eventItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '1vw',
    borderRadius: '0.5vw',
    boxShadow: '0 0.5vw 1vw rgba(0, 0, 0, 0.1)',
    marginBottom: '1vw',
    color: '#3a5ba0', // Change event text color to blue
  },
  deleteIcon: {
    cursor: 'pointer',
    color: '#ff6347',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '50vw',
    backgroundColor: '#ffffff',
    color: '#3a5ba0',
    padding: '2vw',
    borderRadius: '1vw',
    boxShadow: '0 1vw 2vw rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '1vw',
    fontSize: '1vw',
    marginBottom: '1vw',
    borderRadius: '0.5vw',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '1vw',
    fontSize: '1vw',
    marginBottom: '1vw',
    borderRadius: '0.5vw',
    border: '1px solid #ccc',
  },
  popupButtonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  submitButton: {
    padding: '1vw 2vw',
    fontSize: '1vw',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#3a5ba0',
    border: 'none',
    borderRadius: '0.5vw',
    cursor: 'pointer',
    marginBottom: '1vw',
    marginRight: '1vw', // 버튼 사이에 여백 추가
  },
  cancelButton: {
    padding: '1vw 2vw',
    fontSize: '1vw',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#ff6347',
    border: 'none',
    borderRadius: '0.5vw',
    cursor: 'pointer',
  },
};

export default styles;