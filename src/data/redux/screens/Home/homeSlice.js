import {createSlice} from '@reduxjs/toolkit';
import getBooks from './action';
export const homeSlice = createSlice({
  name: 'book',
  initialState: {
    data: [],
    isLoading: false,
    isMsg: false,
    msg: '',
  },
  extraReducers: {
    [getBooks.pending]: state => {
      console.log('pending');
      return {...state, isLoading: true};
    },
    [getBooks.fulfilled]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        data: action.payload.results,
        isLoading: false,
        isMsg: false,
      };
    },
    [getBooks.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isMsg: true,
        msg: action.payload.message,
      };
    },
  },
});
export default homeSlice.reducer;
