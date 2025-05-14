import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import employeesData from '../datas/employees.json';
import { Employee } from '../types/Employee';

const initialState: EmployeeState = {
  data: JSON.parse(localStorage.getItem("employees") || 'null') ?? employeesData,
  loading: false,
  error: null,   
};

interface EmployeeState {
  data: Employee[];
  loading: boolean;
  error: string | null
}

export const fetchEmployeeData = createAsyncThunk<Employee[]>(
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
