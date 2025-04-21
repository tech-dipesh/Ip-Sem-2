import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

export const uploadResume = (formData: FormData, onUploadProgress: (progressEvent: ProgressEvent) => void) =>
  API.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });
