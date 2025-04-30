import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './roomSlice'; 
import employeeReducer from './employeeSlice'
import guestsReducer from './guestSlice'

const store = configureStore({
  reducer: {
    rooms: roomReducer, 
    employees: employeeReducer,
    guests: guestsReducer
  },
});

export default store;