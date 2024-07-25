import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 캘린더 기본 스타일 가져오기
import { format, getDay } from 'date-fns';
import { ko } from 'date-fns/locale'; // locale 임포트
import activity1 from '../../images/activity1.png';
import activity2 from '../../images/activity2.png';
import activity3 from '../../images/activity3.png';
import { FaCaretDown, FaCaretRight, FaPlus, FaTrash } from 'react-icons/fa'; // 아이콘 추가
import styles from './styles';
import { basicAxios, authAxios } from "../../api/axios";

function Activities() {
  const [selectedTerm, setSelectedTerm] = useState('2024-1');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [events, setEvents] = useState([]); // 전체 일정 상태
  const [dayEvents, setDayEvents] = useState([]); // 선택된 날짜의 일정 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventContent, setNewEventContent] = useState('');
  const activityRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, [selectedDate]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showCalendar]); // showCalendar가 변할 때마다 useEffect가 실행

  const fetchEvents = async () => {
    try {
      const response = await basicAxios.get('/schedule/day', { params: { date: selectedDate.toISOString().split('T')[0] } });
      setDayEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleTermChange = (term) => {
    setSelectedTerm(term);
    setShowCalendar(false); // 캘린더 닫기
    if (activityRef.current) {
      activityRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchEvents(); // 날짜를 변경할 때마다 이벤트를 새로 가져옴
    if (activityRef.current) {
      activityRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  const handleAddEvent = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setNewEventTitle('');
    setNewEventContent('');
  };

  const handleEventSubmit = async () => {
    const newEvent = {
      title: newEventTitle,
      content: newEventContent,
      date: selectedDate.toISOString().split('T')[0], // 날짜를 "YYYY-MM-DD" 형식으로 변환
    };

    try {
      const response = await authAxios.post('/schedule', newEvent);
      const createdEvent = response.data;

      // 이벤트 리스트에 추가
      setDayEvents([...dayEvents, createdEvent]);

      // 팝업을 닫고 입력 필드를 초기화
      setIsPopupOpen(false);
      setNewEventTitle('');
      setNewEventContent('');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await authAxios.delete(`/schedule/${eventId}`);
      setDayEvents(dayEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const terms = ['2023-1', '2023-2', '2024-1'];

  const activities = {
    '2023-1': [
      { image: activity1, name: '외벽' },
      { image: activity2, name: '등산' },
      { image: activity3, name: 'MT' },
    ],
    '2023-2': [
      { image: activity2, name: '등산' },
      { image: activity3, name: 'MT' },
      { image: activity1, name: '외벽' },
    ],
    '2024-1': [
      { image: activity3, name: 'MT' },
      { image: activity1, name: '외벽' },
      { image: activity2, name: '등산' },
    ],
  };

  const customWeekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const formatShortWeekday = (locale, date) => {
    return customWeekDays[getDay(date)];
  };

  return (
    <div style={{ ...styles.home, overflowX: 'hidden' }}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarLink}>
          <div style={styles.sidebarLinkText}>
            <FaCaretDown style={styles.caretIcon} />
            <span>활동</span>
          </div>
          <div style={styles.termList}>
            {terms.map((term, index) => (
              <div key={index} style={styles.termItem} onClick={() => handleTermChange(term)}>
                <FaCaretRight style={styles.rightCaret} />
                <span>{term}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.sidebarLink} onClick={handleCalendarToggle}>
          <FaCaretRight style={styles.rightCaret} />
          <span>캘린더</span>
        </div>
      </div>
      <div style={styles.content}>
        {!showCalendar ? (
          <div style={styles.banner}>
            <div style={styles.bannerItem} ref={activityRef}>
              <div style={styles.bannerTitle}>{selectedTerm} 활동</div>
              <div style={styles.activityContainer}>
                {activities[selectedTerm].map((activity, index) => (
                  <div key={index} style={styles.activityBox}>
                    <img src={activity.image} alt={activity.name} style={styles.activityImage} />
                    <div style={styles.activityName}>{activity.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.calendarAndEventContainer}>
            <div style={styles.calendarContainer} ref={calendarRef}>
              <div style={styles.calendarWrapper}>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  tileContent={({ date, view }) =>
                    view === 'month' && events.some((event) => event.date === date.toISOString().split('T')[0]) ? (
                      <div style={{ backgroundColor: 'blue', borderRadius: '50%', width: '8px', height: '8px', margin: 'auto' }}></div>
                    ) : null
                  }
                  tileClassName={styles.calendarTile}
                  showWeekDayNames={true}
                  locale="ko-KR"
                  formatShortWeekday={(locale, date) => formatShortWeekday(locale, date)}
                  style={styles.calendar}
                />
              </div>
            </div>
            <div style={styles.eventContainer}>
              <div style={styles.selectedDate}>
                {format(selectedDate, 'PPP', { locale: ko })} <FaPlus style={styles.addIcon} onClick={handleAddEvent} />
              </div>
              <div style={styles.eventList}>
                {dayEvents.length > 0 ? (
                  dayEvents.map((event, index) => (
                    <div key={index} style={styles.eventItem}>
                      <div>{event.title}</div>
                      <div>{event.content}</div>
                      <FaTrash style={styles.deleteIcon} onClick={() => handleDeleteEvent(event.id)} />
                    </div>
                  ))
                ) : (
                  <div style={styles.noEvent}>일정이 없습니다.</div>
                )}
              </div>
            </div>
          </div>
        )}
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
              <button onClick={handleEventSubmit} style={styles.submitButton}>등록</button>
              <button onClick={handlePopupClose} style={styles.cancelButton}>취소하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;