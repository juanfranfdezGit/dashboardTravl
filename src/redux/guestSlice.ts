import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import guestsData from '../datas/guests.json';
import Guest from '../types/Guest';

const initialState: GuestState = {
  data: [],
  loading: false,
  error: null,
};

interface GuestState {
  data: Guest[];
  loading: boolean;
  error: string | null
}

export const fetchGuestData = createAsyncThunk<Guest[]>(
  'guests/fetchGuestData',
  async () => {
    const local = localStorage.getItem("guests");
    const response = local ? JSON.parse(local) : guestsData;
    return response;
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
