import { createSlice } from '@reduxjs/toolkit';
import roomsData from '../datas/rooms.json';

const initialState = {
  data: [],     
  loading: false,
  error: null,   
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    fetchRoomDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRoomDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchRoomDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRoomDataStart, fetchRoomDataSuccess, fetchRoomDataFailure } = roomSlice.actions;

export const fetchRoomData = () => async (dispatch) => {
    dispatch(fetchRoomDataStart()); 
    try {
        const response = roomsData;  
        dispatch(fetchRoomDataSuccess(response));
    } catch (error) {
        dispatch(fetchRoomDataFailure(error.message)); 
    }
};

export const selectAllRooms = (state) => state.rooms.data;  
export const selectRoomsLoading = (state) => state.rooms.loading;  
export const selectRoomsError = (state) => state.rooms.error; 

export default roomSlice.reducer;