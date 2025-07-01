import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, Navbar } from "../";
import { localizer, getCalendarMessagesES } from "../../helpers/";

// mock
import { mockEvents } from "../../assets/";
import { useState } from 'react';


const events = mockEvents;

export const CalendarPage = () => {

  // getting the last view from localStorage
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');


  const eventStyleGetter = (event, start, end, isSelected) => {

    // console.log({ event, start, end, isSelected });
    const style = {
      backgroundColor: '#3174ad',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return { style };
  }


  const onDoubleClick = (event) => {
    console.log('Event double clicked:', event);
  }
  const onSelect = (event) => {
    console.log('Event onSelect:', event);
  }


  const onViewChanged = (view) => {
    localStorage.setItem('lastView', view);
    // not really necesary 
    setLastView(view);
  } 



  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getCalendarMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  )
}
