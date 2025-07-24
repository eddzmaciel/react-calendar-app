import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, Navbar, FabDelete } from "..";
import { localizer, getCalendarMessagesES } from "../../helpers";

// mock
import { useState } from 'react';

// 
import { useUiStore, useCalendarStore } from '../../hooks'; // Adjust the path if your hook is in a different location
import { useSelector } from 'react-redux';




export const CalendarPage = () => {

  // importing our reducers - custom hook
  const { openDateModal } = useUiStore();

  const { events, setActiveEvent } = useCalendarStore(); // Assuming you have a custom hook to manage calendar state

  // using state for calendar
  const { activeEvent } = useSelector(state => state.calendar);

  // Assuming you have a custom hook to manage UI state
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
    openDateModal(); // Open the date modal

  }
  const onSelect = (event) => {
    console.log('Event onSelect:', event);
    setActiveEvent(event); // Set the active event
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
      <FabAddNew />
      {/* show button only if there is an active event */}
      { activeEvent && <FabDelete /> }
    </>
  )
}
