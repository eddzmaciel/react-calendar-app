import { configureStore } from "@reduxjs/toolkit";

// importing our slice reducers
import { authSlice, calendarSlice, uiSlice } from "./";


export const store = configureStore({
    reducer: {
        ui:       uiSlice.reducer,
        calendar: calendarSlice.reducer,
        auth:     authSlice.reducer
    },
    // * this is the default configuration for redux toolkit
    // * we can add more configuration here
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});