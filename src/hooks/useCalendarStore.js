import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";


// creating my custom hooks to manage the reducers

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) =>{
        // TODO: call the API to save the event
        // 
        if(calendarEvent._id){
            // * update
            console.log('Updating event', calendarEvent);
            dispatch(onUpdateEvent({...calendarEvent}));

        } else{
            // * create
            console.log('Creating event', calendarEvent);
            // * este id va a ser removido cuando se haga la llamada a la API
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime() }));
        }
    };

    const startDeletingEvent = async () => {
        dispatch(onDeleteEvent());;
    }


    return {
        // * properties
        events, 
        activeEvent,
        // * methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}