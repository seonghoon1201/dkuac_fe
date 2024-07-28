import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 캘린더 기본 스타일 가져오기
import { format, getDay } from "date-fns";
import { ko } from "date-fns/locale"; // locale 임포트
import { FaPlus, FaTrash } from "react-icons/fa"; // 아이콘 추가
import styles from "./styles";
import { basicAxios, authAxios } from "../../api/axios";
import Sidebar from "../../components/Sidebar";
import userInfoStore from "../../stores/userInfoStore";

const customWeekDays = ["일", "월", "화", "수", "목", "금", "토"];

function Schedules() {
  const { isStaff } = userInfoStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [dayEvents, setDayEvents] = useState([]); // 선택된 날짜의 일정 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventContent, setNewEventContent] = useState("");
  const activityRef = useRef(null);
  const calendarRef = useRef(null);

  const formmatingDate = (selectedDate) => {
    return selectedDate
      .toLocaleString()
      .split(" 오")[0]
      .replaceAll(". ", "-")
      .replaceAll(".", "");
  };

  let formattedDate = formmatingDate(selectedDate);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await basicAxios.get(`/schedule/day/${formattedDate}`);
        if (typeof response.data === "string") {
          setDayEvents([]);
          return;
        }
        setDayEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setDayEvents([]); // 일정이 없는 경우 dayEvents를 빈 배열로 설정
      }
    };
    fetchEvents();
  }, [selectedDate]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showCalendar]); // showCalendar가 변할 때마다 useEffect가 실행

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (activityRef.current) {
      activityRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddEvent = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setNewEventTitle("");
    setNewEventContent("");
  };

  const handleEventSubmit = async () => {
    const newEvent = {
      title: newEventTitle,
      content: newEventContent,
      date: formattedDate, // 날짜를 "YYYY-MM-DD" 형식으로 변환
    };

    try {
      const response = await authAxios.post("/schedule", newEvent);
      const createdEvent = response.data;

      // 이벤트 리스트에 추가
      setDayEvents([...dayEvents, createdEvent]);

      // 팝업을 닫고 입력 필드를 초기화
      setIsPopupOpen(false);
      setNewEventTitle("");
      setNewEventContent("");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await authAxios.delete(`/schedule`, {
        data: {
          scheduleId: parseInt(eventId),
        },
      });
      setDayEvents(dayEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("일정 삭제에 실패했습니다. 다시 시도하거나 관리자에게 문의하세요.");
    }
  };

  const formatShortWeekday = (_, date) => {
    return customWeekDays[getDay(date)];
  };

  return (
    <div style={{ ...styles.home, overflowX: "hidden" }}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.calendarAndEventContainer}>
          <div style={styles.calendarContainer} ref={calendarRef}>
            <div style={styles.calendarWrapper}>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={({ date, view }) =>
                  view === "month" &&
                  dayEvents.some(
                    (event) => event.date === date.toISOString().split("T")[0]
                  ) ? (
                    <div
                      style={{
                        backgroundColor: "blue",
                        borderRadius: "50%",
                        width: "8px",
                        height: "8px",
                        margin: "auto",
                      }}
                    ></div>
                  ) : null
                }
                tileClassName={styles.calendarTile}
                showWeekDayNames={true}
                locale="ko-KR"
                formatShortWeekday={(locale, date) =>
                  formatShortWeekday(locale, date)
                }
                style={styles.calendar}
              />
            </div>
          </div>
          <div style={styles.selectedDateContainer}>
            <div style={styles.selectedDate}>
              {format(selectedDate, "PPP", { locale: ko })}{" "}
              {isStaff && (
                <FaPlus style={styles.addIcon} onClick={handleAddEvent} />
              )}
            </div>
            <div style={styles.eventList}>
              {dayEvents.length > 0 ? (
                dayEvents.map((event, index) => (
                  <div key={index} style={styles.eventItem}>
                    <div style={styles.eventTitle}>{event.title}</div>
                    <div style={styles.eventContent}>{event.content}</div>
                    {isStaff && (
                      <FaTrash
                        style={styles.deleteIcon}
                        onClick={handleDeleteEvent}
                      />
                    )}
                  </div>
                ))
              ) : (
                <div style={styles.noEventsMessage}>일정이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h2>일정 등록</h2>
            <input
              type="text"
              placeholder="일정 제목"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="일정 내용"
              value={newEventContent}
              onChange={(e) => setNewEventContent(e.target.value)}
              style={styles.textarea}
            />
            <div style={styles.popupButtonsContainer}>
              <button onClick={handleEventSubmit} style={styles.submitButton}>
                등록
              </button>
              <button onClick={handlePopupClose} style={styles.cancelButton}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedules;
