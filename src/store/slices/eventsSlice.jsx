import { createSlice } from "@reduxjs/toolkit";

// Generate a few sample events
const generateSampleEvents = () => {
  return [
    {
      id: "1",
      title: "Hội thảo Redux Toolkit",
      date: "2023-12-15",
      time: "09:00",
      location: "Hà Nội",
      description:
        "Hội thảo về cách sử dụng Redux Toolkit trong ứng dụng React.",
    },
    {
      id: "2",
      title: "Workshop React Hooks",
      date: "2023-12-20",
      time: "14:00",
      location: "Hồ Chí Minh",
      description: "Workshop thực hành về React Hooks và các ứng dụng thực tế.",
    },
  ];
};

const initialState = {
  events: generateSampleEvents(),
  currentEvent: null,
  isModalOpen: false,
  modalMode: "add", // 'add' or 'edit'
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const newEvent = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.events.push(newEvent);
    },
    editEvent: (state, action) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalMode = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.currentEvent = null;
    },
  },
});

export const {
  addEvent,
  editEvent,
  deleteEvent,
  setCurrentEvent,
  openModal,
  closeModal,
} = eventsSlice.actions;

export default eventsSlice.reducer;
