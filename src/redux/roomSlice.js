import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomsData from '../datas/rooms.json';

const initialState = {
  data: JSON.parse(localStorage.getItem("rooms")) || [],     
  loading: false,
  error: null,   
};

export const fetchRoomData = createAsyncThunk(
  'rooms/fetchRoomData',
  async () => {
    const local = localStorage.getItem("rooms");
    const response = local ? JSON.parse(local) : roomsData;
    return response;
  }
);

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addRoom: (state, action) => {
      if (!Array.isArray(state.data)) {
        state.data = [];
      }
      state.data.push(action.payload);
      localStorage.setItem("rooms", JSON.stringify(state.data)); 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRoomData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addRoom } = roomSlice.actions;

export const selectAllRooms = (state) => state.rooms.data || [];
export const selectRoomsLoading = (state) => state.rooms.loading || false;
export const selectRoomsError = (state) => state.rooms.error || null;

export default roomSlice.reducer;
