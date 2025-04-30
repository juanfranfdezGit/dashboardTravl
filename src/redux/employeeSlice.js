import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import employeesData from '../datas/employees.json';

const initialState = {
  data: JSON.parse(localStorage.getItem("employees")) || [],     
  loading: false,
  error: null,   
};

export const fetchEmployeeData = createAsyncThunk(
  'employees/fetchEmployeeData',
  async () => {
    const local = localStorage.getItem("employees");
    const response = local ? JSON.parse(local) : employeesData;
    return response;
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      if (!Array.isArray(state.data)) {
        state.data = [];
      }
      state.data.push(action.payload);
      localStorage.setItem("employees", JSON.stringify(state.data)); 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchEmployeeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addEmployee } = employeeSlice.actions;

export const selectAllEmployees = (state) => state.employees.data || [];
export const selectEmployeesLoading = (state) => state.employees.loading || false;
export const selectEmployeesError = (state) => state.employees.error || null;

export default employeeSlice.reducer;
