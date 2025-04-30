import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import guestsData from '../datas/guests.json';

const initialState = {
  data: [],     
  loading: false,
  error: null,   
};

export const fetchGuestData = createAsyncThunk(
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
        state.error = action.error.message;
      });
  }
});

export const selectAllGuests = (state) => state.guests.data || [];
export const selectGuestsLoading = (state) => state.guests.loading || false;
export const selectGuestsError = (state) => state.guests.error || null;

export default guestSlice.reducer;
