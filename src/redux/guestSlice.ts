import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import Guest from '../types/Guest';
import axios from 'axios';

const initialState: GuestState = {
  data: [],
  loading: false,
  error: null,
};

const GUESTS_API_URL = 'https://localhost:3000/api/guests';

interface GuestState {
  data: Guest[];
  loading: boolean;
  error: string | null
}

export const fetchGuestData = createAsyncThunk<Guest[]>('guests/fetchGuestData', async () => {
    const local = localStorage.getItem("guests");

    if (local) {
      return JSON.parse(local);
    }

    const response = await axios.get<Guest[]>(GUESTS_API_URL);
    return response.data;
  }
);

const guestSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuestData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuestData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchGuestData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch guests';
      });
  }
});

export const selectAllGuests = (state: { guests: GuestState }) => state.guests.data;
export const selectGuestsLoading = (state: { guests: GuestState }) => state.guests.loading;
export const selectGuestsError = (state: { guests: GuestState }) => state.guests.error;

export default guestSlice.reducer;
