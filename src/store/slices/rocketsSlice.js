
import { createSlice } from '@reduxjs/toolkit';

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: {
    rockets: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      
      state.loading = action.payload;
    },
    setRockets(state, action) {
        console.log(action.payload,'///////////')
      state.rockets = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setRockets, setError } = rocketsSlice.actions;

export default rocketsSlice.reducer;
