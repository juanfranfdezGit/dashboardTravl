import { createSlice } from '@reduxjs/toolkit';
import roomsData from '../datas/rooms.json';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'data',
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
        dispatch(fetchRoomDataSuccess(roomsData));
    } catch (error) {
        dispatch(fetchRoomDataFailure(error.message)); 
    }
};

export default roomSlice.reducer;