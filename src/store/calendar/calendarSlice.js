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
    }
  },
});
export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;