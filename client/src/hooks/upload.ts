// import { useState } from 'react';
// import { uploadResume } from '../services/api';
// import { useAuth } from '@clerk/clerk-react';

// const useUpload = () => {
//   const {getToken}=useAuth();
//   const [progress, setProgress] = useState(0);
//   const [suggestions, setSuggestions] = useState<string[] | null>(null);
//   const [error, setError] = useState('');
//   const [isUploading, setIsUploading] = useState(false);

//   const handleFileDrop = async (files: FileList) => {
//     const file = files[0];
//     if (!file) return;

//     // Validations
//     if (file.type !== 'application/pdf') {
//       setError('Only PDF files are allowed.');
//       return;
//     }
//     if (file.size > 3 * 1024 * 1024) {
//       setError('File size exceeds 3MB.');
//       return;
//     }

//     setIsUploading(true);
//     setError('');

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const token = await getToken();
//       const response = await uploadResume(
//         formData, 
//         (event) => {
//           const percent = Math.round((event.loaded * 100) / (event.total || 1));
//           setProgress(percent);
//         },
//         token // Pass the token here
//       );


//       // const response = await uploadResume(formData, (event) => {
//       //   const percent = Math.round((event.loaded * 100));
//       //   setProgress(percent);
//       // });

//       // if (response.data && response.data.suggestions) {
//       //   setSuggestions(response.data.suggestions);
//       // } else {
//       //   setError('No suggestions returned. Please try again.');
//       // }
//     } catch (err: any) {
//       console.error('Upload error:', err);
//       if (err.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         setError(`Server error: ${err.response.data.error || 'Unknown error'}`);
//       } else if (err.request) {
//         // The request was made but no response was received
//         setError('No response from server. Please check your connection.');
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         setError(`Upload failed: ${err.message}`);
//       }
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return { handleFileDrop, progress, suggestions, error, isUploading };
// };

// export default useUpload;

// client/src/hooks/upload.ts
import { useState } from 'react';
import { uploadResume } from '../services/api';
import { useAuth } from '@clerk/clerk-react';

const useUpload = () => {
  const { getToken } = useAuth();
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
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = await getToken();
      const response = await uploadResume(
        formData, 
        (event) => {
          const percent = Math.round((event.loaded * 100) / (event.total || 1));
          setProgress(percent);
        },
        token
      );

      if (response.data && response.data.suggestions) {
        setSuggestions(response.data.suggestions);
      } else {
        setError('No suggestions returned. Please try again.');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      if (err.response) {
        setError(`Server error: ${err.response.data.error || 'Unknown error'}`);
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError(`Upload failed: ${err.message}`);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return { handleFileDrop, progress, suggestions, error, isUploading };
};

export default useUpload;