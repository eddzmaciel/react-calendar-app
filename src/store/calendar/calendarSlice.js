import { createSlice } from '@reduxjs/toolkit';
import { mockEvents } from '../../assets/mockData/mockEvents';


export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    // temporal events
    events: [...mockEvents],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent:(state,{payload})=>{
      // * esto es posible por que tenemos el middleware de redux toolkit
      state.events.push(payload);
      // limpiar el evento activo
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(event => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if(!state.activeEvent) return;
      // aqui vamos a eliminar la nota activa
      state.events = state.events.filter(event => event._id !== state.activeEvent._id);
      // limpiar el evento activo
      state.activeEvent = null;
    }
  },
});
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;