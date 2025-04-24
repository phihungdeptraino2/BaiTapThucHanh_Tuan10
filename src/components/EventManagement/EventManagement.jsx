import EventList from "./EventList";
import EventForm from "./EventForm";

function EventManagement() {
  return (
    <div className="event-management">
      <EventList />
      <EventForm />
    </div>
  );
}

export default EventManagement;
