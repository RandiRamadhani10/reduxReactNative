import {createSlice} from '@reduxjs/toolkit';
import getLogin from './action';
export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    token: null,
    isLogin: false,
    isMsg: false,
  },
  reducers: {
    setLogin: state => {
      return {...state, isLogin: false};
    },
  },
  extraReducers: {
    [getLogin.pending]: state => {
      console.log('pending');
    },
    [getLogin.fulfilled]: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        token: action.payload.token.tokens.access.token,
        isLogin: true,
        isMsg: false,
      };
    },
    [getLogin.rejected]: state => {
      console.log('reject');
      return {
        ...state,
        isMsg: true,
        isLogin: true,
      };
    },
  },
});
export const {setLogin} = loginSlice.actions;
export default loginSlice.reducer;
