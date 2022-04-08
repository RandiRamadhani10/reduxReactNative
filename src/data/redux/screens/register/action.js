import {REGISTER, API_BASE} from '../../../service/ApiConstants';
import axios from 'axios';
const getRegister = async data => {
  const request = {
    uri: API_BASE + REGISTER,
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
    },
  };
  const response = await axios.post(request.uri, request.data);
  return await response.data;
};
export default getRegister;
