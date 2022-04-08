import {API_BASE, BOOKS} from '../../../service/ApiConstants';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

const getBooks = createAsyncThunk(
  'book/getBook',
  async (token, {rejectWithValue}) => {
    try {
      const request = {
        uri: API_BASE + BOOKS,
      };

      const response = await axios.get(request.uri, {
        headers: {Authorization: `Bearer ${token}`},
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
export default getBooks;
