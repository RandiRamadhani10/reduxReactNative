import {createSlice} from '@reduxjs/toolkit';
import getDetailBook from './action';

export const detailBookSlice = createSlice({
  name: 'detailBook',
  initialState: {
    data: [],
    isLoading: false,
    isMsg: false,
    msg: '',
  },
  extraReducers: {
    [getDetailBook.pending]: state => {
      console.log('pending');
      return {...state, isLoading: true};
    },
    [getDetailBook.fulfilled]: (state, action) => {
      console.log('done');
      return {...state, data: action.payload, isLoading: false, isMsg: false};
    },
    [getDetailBook.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isMsg: true,
        msg: action.payload.message,
      };
    },
  },
});
export default detailBookSlice.reducer;
