import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar({ events }) {
  // const eventSources = [
  //   {
  //     events: [
  //       {
  //         title: "Note for this date",
  //         start: "2024-03-05T10:00:00", // Specify the date and time (in ISO 8601 format)
  //         // Add any other properties as needed, such as color, description, etc.
  //       },
  //       {
  //         title:
  //           "Note for this date Note for this date Note for this date Note for this date",
  //         start: "2024-03-06T12:00:00", // Specify the date and time (in ISO 8601 format)
  //         color: "red",
  //         // Add any other properties as needed, such as color, description, etc.
  //       },
  //     ],
  //   },
  // ];
  const eventSources = [
    {
      events: events,
    },
  ];
  return (
    <div className="px-5 py-2">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"72vh"}
        eventSources={eventSources}
        slotMinTime={"12:00:00"}
        slotMaxTime={"24:00:00"}
      />
    </div>
  );
}

export default Calendar;
