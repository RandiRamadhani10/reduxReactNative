import {createSlice} from '@reduxjs/toolkit';
import getDetailBook from './action';

export const detailBookSlice = createSlice({
  name: 'detailBook',
  initialState: {
    data: [],
    isLoading: false,
  },
  extraReducers: {
    [getDetailBook.pending]: state => {
      console.log('pending');
      return {...state, isLoading: true};
    },
    [getDetailBook.fulfilled]: (state, action) => {
      console.log('done');
      return {...state, data: action.payload, isLoading: false};
    },
    [getDetailBook.rejected]: (state, action) => {
      console.log('reject');
      return {...state, isLoading: false};
    },
  },
});
export default detailBookSlice.reducer;
