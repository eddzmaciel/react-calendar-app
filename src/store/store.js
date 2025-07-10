import { configureStore } from "@reduxjs/toolkit";

// importing our slice reducers
import { calendarSlice, uiSlice } from "./";


export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    }
});