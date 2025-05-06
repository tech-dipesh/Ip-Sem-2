// import axios, { AxiosProgressEvent } from 'axios';
import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:3001',
// });

// // Remove useAuth from here and accept token as parameter
// export const uploadResume = (
//   formData: FormData,
//   onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
//   token: string | null
// ) => {
//   return API.post('/api/upload', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       ...(token && { Authorization: `Bearer ${token}` })
//     },
//     onUploadProgress
//   });
// };
// client/src/services/api.ts

// Function for submitting resume text
// export const analyzeResumeText = (text: string, token: string | null) => {
//   return API.post('/api/analyze-text', { text }, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token && { Authorization: `Bearer ${token}` })
//     }
//   });
// };
const API = axios.create({
  baseURL: 'https://ip-sem-2.onrender.com',
  timeout: 30000,
  // higher timer would be beter for me learning
});

// Api error handling with the promise calling for me.
API.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Url from the backend
export const analyzeResumeText = (text: string, token: string | null) => {
  return API.post('/api/analyze-text', { text }, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });
};
