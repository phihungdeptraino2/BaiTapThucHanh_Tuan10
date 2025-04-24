"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteEvent,
  setCurrentEvent,
  openModal,
} from "../../store/slices/eventsSlice";
import "./EventList.css";

function EventList() {
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  const handleAddEvent = () => {
    dispatch(setCurrentEvent(null));
    dispatch(openModal("add"));
  };

  const handleEditEvent = (event) => {
    dispatch(setCurrentEvent(event));
    dispatch(openModal("edit"));
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) {
      dispatch(deleteEvent(id));
    }
  };

  // Sort events by date and time
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  return (
    <div className="event-list">
      <div className="event-list-header">
        <h3>Danh sách sự kiện</h3>
        <button className="add-event-button" onClick={handleAddEvent}>
          Thêm sự kiện
        </button>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="no-events">
          Chưa có sự kiện nào. Hãy thêm sự kiện mới!
        </div>
      ) : (
        <div className="events-grid">
          {sortedEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-date">
                {new Date(event.date).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h4 className="event-title">{event.title}</h4>
              <div className="event-details">
                <div className="event-time">
                  <strong>Thời gian:</strong> {event.time}
                </div>
                <div className="event-location">
                  <strong>Địa điểm:</strong> {event.location}
                </div>
                {event.description && (
                  <p className="event-description">{event.description}</p>
                )}
              </div>
              <div className="event-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEditEvent(event)}
                >
                  Sửa
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;
