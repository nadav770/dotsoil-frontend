import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api', // Placeholder for future REST API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;