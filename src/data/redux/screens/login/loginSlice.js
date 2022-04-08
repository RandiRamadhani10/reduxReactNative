import {createSlice} from '@reduxjs/toolkit';
import getLogin from './action';
export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    token: null,
    isLogin: false,
  },
  reducers: {
    setLogin: (state, action) => {
      console.log(state);
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
      };
    },
    [getLogin.rejected]: state => {
      return {
        ...state,
        isLogin: false,
      };
    },
  },
});
export const {setLogin} = loginSlice.actions;
export default loginSlice.reducer;
