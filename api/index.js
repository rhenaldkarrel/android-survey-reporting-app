import axios from 'axios';

const resource = axios.create({
  baseURL: 'http://192.168.1.11:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default resource;