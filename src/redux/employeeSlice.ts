import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../types/Employee';
import axios from 'axios';

const initialState: EmployeeState = {
  data: JSON.parse(localStorage.getItem("employees") || 'null') ?? [],
  loading: false,
  error: null,   
};

const EMPLOYEES_API_URL = 'https://localhost:3000/api/employees';

interface EmployeeState {
  data: Employee[];
  loading: boolean;
  error: string | null
}

export const fetchEmployeeData = createAsyncThunk<Employee[]>('guests/fetchEmployeeData', async () => {
    const local = localStorage.getItem("employees");

    if (local) {
      return JSON.parse(local);
    }

    const response = await axios.get<Employee[]>(EMPLOYEES_API_URL);
    return response.data;
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
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
        state.error = action.error.message ?? 'Failed to fetch employees';
      });
  }
});

export const { addEmployee } = employeeSlice.actions;

export const selectAllEmployees = (state: { employees: EmployeeState }) => state.employees.data;
export const selectEmployeesLoading = (state: { employees: EmployeeState }) => state.employees.loading;
export const selectEmployeesError = (state: { employees: EmployeeState }) => state.employees.error;

export default employeeSlice.reducer;
