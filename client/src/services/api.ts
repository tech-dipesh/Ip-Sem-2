// import axios, { AxiosProgressEvent } from 'axios';

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
import axios, { AxiosProgressEvent } from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

// Function for uploading PDF file
export const uploadResume = (
  formData: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
  token: string | null
) => {
  return API.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    onUploadProgress
  });
};

// Function for submitting resume text
export const analyzeResumeText = (text: string, token: string | null) => {
  return API.post('/api/analyze-text', { text }, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });
};