import axios from 'axios';


const API = axios.create({
  baseURL: 'https://ip-sem-2.onrender.com',
  timeout: 30000,
  // higher timer would be beter for me j
});

// Api error handling with the promise calling for me with globally
API.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Url from the backend comes on string form.
export const analyzeResumeText = (text: string, token: string | null) => {
  return API.post('/api/analyze-text', { text }, {
    headers: {
      'Content-Type': 'application/json',
      // destructuring and authorization check 
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });
};
