import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, getDay } from "date-fns";
import { ko } from "date-fns/locale";
import { FaPlus, FaTrash } from "react-icons/fa";
import styles from "./styles";
import { basicAxios, authAxios } from "../../api/axios";
import Sidebar from "../../components/Sidebar";
import userInfoStore from "../../stores/userInfoStore";

const customWeekDays = ["일", "월", "화", "수", "목", "금", "토"];

function Schedules() {
  const { isStaff } = userInfoStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayEvents, setDayEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventContent, setNewEventContent] = useState("");
  const activityRef = useRef(null);
  const calendarRef = useRef(null);

  const formattingDate = (date) => {
    return format(date, 'yyyy-MM-dd');
  };

  const formattedDate = formattingDate(selectedDate);

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
        setDayEvents([]);
      }
    };
    fetchEvents();
  }, [formattedDate]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await basicAxios.get("/schedule");
        setAllEvents(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching all events:", error);
        setAllEvents([]);
      }
    };
    fetchAllEvents();
  }, []);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [calendarRef.current]);

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
      date: formattedDate,
    };

    try {
      const response = await authAxios.post("/schedule", newEvent);
      const createdEvent = response.data;
      setDayEvents([...dayEvents, createdEvent]);
      setAllEvents([...allEvents, createdEvent]);
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
      setAllEvents(allEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("일정 삭제에 실패했습니다. 다시 시도하거나 관리자에게 문의하세요.");
    }
  };

  const formatShortWeekday = (_, date) => {
    return customWeekDays[getDay(date)];
  };

  return (
    <div style={styles.home}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.calendarAndEventContainer}>
          <div style={styles.calendarContainer} ref={calendarRef}>
            <div style={styles.calendarWrapper}>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={({ date }) => {
                  const formattedDate = format(date, "yyyy-MM-dd");
                  const hasEvent = Array.isArray(allEvents) &&
                                    allEvents.some(event => event.date === formattedDate);
                  return hasEvent ? <div style={styles.eventDot}>•</div> : null;
                }}
                formatShortWeekday={formatShortWeekday}
                showNeighboringMonth={false}
                locale={ko}
              />
            </div>
          </div>

          <div style={styles.selectedDateContainer} ref={activityRef}>
            <div style={styles.selectedDate}>
              {format(selectedDate, "yyyy-MM-dd")}
              {isStaff && (
                <FaPlus
                  style={styles.addIcon}
                  onClick={handleAddEvent}
                />
              )}
            </div>
            {dayEvents.length === 0 ? (
              <div style={styles.noEventsMessage}>해당일에는 아무 활동이 없습니다.</div>
            ) : (
              <div style={styles.eventList}>
                {dayEvents.map(event => (
                  <div key={event.id} style={styles.eventItem}>
                    <div style={styles.eventContent}>
                      <div style={styles.eventTitle}>{event.title}</div>
                      <div>{event.content}</div>
                    </div>
                    {isStaff && (
                      <FaTrash
                        style={styles.deleteIcon}
                        onClick={() => handleDeleteEvent(event.id)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {isPopupOpen && (
          <div style={styles.popupOverlay}>
            <div style={styles.popup}>
              <input
                style={styles.input}
                type="text"
                placeholder="제목"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
              <textarea
                style={styles.textarea}
                placeholder="내용"
                value={newEventContent}
                onChange={(e) => setNewEventContent(e.target.value)}
              />
              <div style={styles.popupButtonsContainer}>
                <button style={styles.submitButton} onClick={handleEventSubmit}>
                  제출
                </button>
                <button style={styles.cancelButton} onClick={handlePopupClose}>
                  취소
                </button>
              </div>
            </div> 
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedules;
