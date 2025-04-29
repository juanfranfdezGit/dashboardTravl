import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './roomSlice'; 

const store = configureStore({
  reducer: {
    rooms: roomReducer, 
  },
});

export default store;