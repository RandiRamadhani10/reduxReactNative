import {API_BASE, BOOKS} from '../../../service/ApiConstants';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

const getDetailBook = createAsyncThunk(
  'detailBook/getDetailBook',
  async (datas, {rejectWithValue}) => {
    try {
      const request = {
        uri: API_BASE + BOOKS + datas.id,
      };
      console.log('here');
      const response = await axios.get(request.uri, {
        headers: {Authorization: `Bearer ${datas.token}`},
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
export default getDetailBook;
