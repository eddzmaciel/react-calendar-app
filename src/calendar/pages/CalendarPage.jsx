import { Navbar } from "../";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer, getCalendarMessagesES } from "../../helpers/";
// mock
import { mockEvents } from "../../assets/";


const events = mockEvents;


export const CalendarPage = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({ event, start, end, isSelected });
    const style = {
      backgroundColor:  '#3174ad',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return { style };
  }


  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getCalendarMessagesES()}
        eventPropGetter={eventStyleGetter}
      />
    </>
  )
}
