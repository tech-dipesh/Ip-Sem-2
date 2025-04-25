import axios, { AxiosProgressEvent } from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001', // This should match your server URL
});

export const uploadResume = (formData: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) =>
  API.post('/api/upload', formData, { // Add '/api' prefix to match your server routes
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });