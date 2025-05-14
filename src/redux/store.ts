import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './roomSlice'; 
import employeeReducer from './employeeSlice';
import guestsReducer from './guestSlice';

const store = configureStore({
  reducer: {
    rooms: roomReducer, 
    employees: employeeReducer,
    guests: guestsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;