import axios from 'axios';
import { HTTP_STATUS_CODE } from '../utils/constants'

const Http = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  },
});

Http.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error);
  }
);

Http.interceptors.response.use(
  function (response) {
    return response;
  }, function (error) {
    if (error != null && error.response != null &&  error.response.status === HTTP_STATUS_CODE.FORBIDDEN ) {

    }
    return Promise.reject(error);
  });

export default Http;