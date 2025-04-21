import { useState } from 'react';
import axios from 'axios';

const useUpload = () => {
  const [progress, setProgress] = useState(0);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileDrop = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    // Validations
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setError('File size exceeds 3MB.');
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      setSuggestions(response.data.suggestions);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return { handleFileDrop, progress, suggestions, error, isUploading };
};

export default useUpload;
