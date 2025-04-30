import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './roomSlice'; 
import employeeReducer from './employeeSlice'

const store = configureStore({
  reducer: {
    rooms: roomReducer, 
    employees: employeeReducer,
  },
});

export default store;