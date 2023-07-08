import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchExpenseRecords, fetchYears, saveExpense } from './expenseAPI';

const initialState = {
  status: 'idle',
  msg: '',
  expenseRecords: [],
  monthFilters: [],
  yearFilters: [],
};

export const saveExpenseAsync = createAsyncThunk(
  'expense/saveExpense',
  async (expenseData) => {
    const res = await saveExpense(expenseData);
    return res.msg;
  }
);

export const fetchExpenseRecordsAsync = createAsyncThunk(
  'expense/fetchExpenseRecord',
  async (filter) => {
    const res = await fetchExpenseRecords(filter);
    return res.expenseData;
  }
);

export const fetchYearsAsync = createAsyncThunk(
  'expense/fetchYears',
  async () => {
    const res = await fetchYears();
    return res.years;
  }
);

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveExpenseAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveExpenseAsync.fulfilled, (state, action) => {
        state.status = 'loading';
        state.msg = action.payload;
      })
      .addCase(fetchExpenseRecordsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpenseRecordsAsync.fulfilled, (state, action) => {
        state.status = 'loading';
        state.expenseRecords = action.payload;
      })
      .addCase(fetchYearsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchYearsAsync.fulfilled, (state, action) => {
        state.status = 'loading';
        state.yearFilters = action.payload;
      });
  },
});

export const selectExpenseRecords = (state) => state.expense.expenseRecords;
export const selectLoading = (state) => state.expense.status;
export const selectYearFilters = (state) => state.expense.yearFilters;

export default expenseSlice.reducer;
