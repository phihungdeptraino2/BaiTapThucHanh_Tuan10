"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addEvent,
  editEvent,
  closeModal,
} from "../../store/slices/eventsSlice";
import "./EventForm.css";

function EventForm() {
  const dispatch = useDispatch();
  const { currentEvent, modalMode, isModalOpen } = useSelector(
    (state) => state.events
  );

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentEvent && modalMode === "edit") {
      setFormData({
        id: currentEvent.id,
        title: currentEvent.title,
        date: currentEvent.date,
        time: currentEvent.time,
        location: currentEvent.location,
        description: currentEvent.description || "",
      });
    } else {
      // Set default date to today and time to now
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");

      setFormData({
        title: "",
        date: formattedDate,
        time: `${hours}:${minutes}`,
        location: "",
        description: "",
      });
    }
    setErrors({});
  }, [currentEvent, modalMode, isModalOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim())
      newErrors.title = "Vui lòng nhập tiêu đề sự kiện";
    if (!formData.date) newErrors.date = "Vui lòng chọn ngày";
    if (!formData.time) newErrors.time = "Vui lòng chọn giờ";
    if (!formData.location.trim())
      newErrors.location = "Vui lòng nhập địa điểm";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (modalMode === "add") {
      dispatch(addEvent(formData));
    } else {
      dispatch(editEvent(formData));
    }

    dispatch(closeModal());
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            {modalMode === "add" ? "Thêm sự kiện mới" : "Chỉnh sửa sự kiện"}
          </h3>
          <button
            className="close-button"
            onClick={() => dispatch(closeModal())}
          >
            ✕
          </button>
        </div>

        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Tiêu đề sự kiện *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "error" : ""}
            />
            {errors.title && (
              <div className="error-message">{errors.title}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Ngày *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? "error" : ""}
              />
              {errors.date && (
                <div className="error-message">{errors.date}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="time">Giờ *</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={errors.time ? "error" : ""}
              />
              {errors.time && (
                <div className="error-message">{errors.time}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Địa điểm *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? "error" : ""}
            />
            {errors.location && (
              <div className="error-message">{errors.location}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => dispatch(closeModal())}
            >
              Hủy
            </button>
            <button type="submit" className="submit-button">
              {modalMode === "add" ? "Thêm sự kiện" : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
