import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  status: 'idle' | 'pending' | 'successfully' | 'failed';
  data: any;
}

const initialState: AuthState = {
  data: null,
  status: 'idle',
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers: builder => {
    builder;
    // .addCase(getMe.fulfilled, (state, action) => {
    //   state.status = 'successfully';
    //   state.data = action.payload.data;
    // });
  },
});

export default authSlice.reducer;
