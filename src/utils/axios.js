import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8800',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Credentials': true,
  },
  withCredentials: true,
});

export default instance;
