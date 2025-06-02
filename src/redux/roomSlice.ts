import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Room from '../types/Room';
import axios from 'axios';

const initialState: RoomState = {
  data: JSON.parse(localStorage.getItem("rooms") || 'null' ) ?? [],     
  loading: false,
  error: null,   
};

const ROOMS_API_URL = 'https://localhost:3000/api/rooms';

interface RoomState {
  data: Room[];
  loading: boolean;
  error: string | null
}

export const fetchRoomData = createAsyncThunk<Room[]>('guests/fetchRoomData', async () => {
    const local = localStorage.getItem("rooms");

    if (local) {
      return JSON.parse(local);
    }

    const response = await axios.get<Room[]>(ROOMS_API_URL);
    return response.data;
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
        state.error = action.error.message ?? 'Failed to fetch room';
      });
  }
});

export const { addRoom } = roomSlice.actions;

export const selectAllEmployees = (state: { rooms: RoomState }) => state.rooms.data;
export const selectEmployeesLoading = (state: { rooms: RoomState }) => state.rooms.loading;
export const selectEmployeesError = (state: { rooms: RoomState }) => state.rooms.error;

export default roomSlice.reducer;
