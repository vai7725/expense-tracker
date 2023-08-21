import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser, logoutUser } from './authAPI';

const initialState = {
  status: 'idle',
  user: null,
};

export const fetchUserAsync = createAsyncThunk('user/fetchUser', async () => {
  const res = await fetchUser();
  return res.user;
});

export const logoutUserAsync = createAsyncThunk('user/logoutUser', async () => {
  try {
    const res = await logoutUser();
    return res;
  } catch (error) {}
});

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.status = 'idle';
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.status = 'idle';
      });
  },
});

export const selectUser = (state) => state.auth.user;
export const selectUserStatus = (state) => state.auth.status;

export default userSlice.reducer;
