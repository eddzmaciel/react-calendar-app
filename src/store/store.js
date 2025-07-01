import { configureStore } from "@reduxjs/toolkit";

// importing our slice reducers
import { uiSlice } from "./";


export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
    }
});