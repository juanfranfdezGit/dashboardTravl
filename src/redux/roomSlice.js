import { createSlice } from '@reduxjs/toolkit';
import roomsData from '../datas/rooms.json';

const initialState = {
  data: JSON.parse(localStorage.getItem("rooms")) || [],     
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
        state.data = Array.isArray(action.payload) ? action.payload : [];
    },
    fetchRoomDataFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addRoom: (state, action) => {
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        state.data.push(action.payload);
        localStorage.setItem("rooms", JSON.stringify(state.data));
    }
  },
});

export const { fetchRoomDataStart, fetchRoomDataSuccess, fetchRoomDataFailure, addRoom } = roomSlice.actions;

export const fetchRoomData = () => async (dispatch) => {
    dispatch(fetchRoomDataStart()); 
    try {
        const local = localStorage.getItem("rooms");
        const response = local ? JSON.parse(local) : roomsData;
        dispatch(fetchRoomDataSuccess(response));
    } catch (error) {
        dispatch(fetchRoomDataFailure(error.message)); 
    }
};

export const selectAllRooms = (state) => state.rooms.data || [];   
export const selectRoomsLoading = (state) => state.rooms.loading || [];  
export const selectRoomsError = (state) => state.rooms.error || []; 

export default roomSlice.reducer;