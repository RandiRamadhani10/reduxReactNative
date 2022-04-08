import {LOGIN, API_BASE} from '../../../service/ApiConstants';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
const getLogin = createAsyncThunk(
  'login/getLogin',
  async (data, {rejectWithValue}) => {
    try {
      const request = {
        uri: API_BASE + LOGIN,
        data: {
          email: data.email,
          password: data.password,
        },
      };
      const response = await axios.post(request.uri, request.data);
      const result = {
        email: data.email,
        password: data.password,
        token: response.data,
      };
      return result;
    } catch (error) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  },
);
export default getLogin;
