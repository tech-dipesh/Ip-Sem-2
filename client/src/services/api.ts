// import axios, { AxiosProgressEvent } from 'axios';
import axios from 'axios';

// client/src/services/api.ts
import { useAuth } from '@clerk/clerk-react';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

export const uploadResume = async (formData: FormData, onUploadProgress: any) => {
  const { getToken } = useAuth();
  const token = await getToken();
  
  return API.post('/api/upload', formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    },
    onUploadProgress
  });
};