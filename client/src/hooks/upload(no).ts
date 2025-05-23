// import { useState } from 'react';
// import { analyzeResumeText } from '../services/api';
// import { useAuth } from '@clerk/clerk-react';

// const useUpload = () => {
//   const { getToken } = useAuth();
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
//     setProgress(0);

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const token = await getToken();
//       const response = await analyzeResumeText(formData, {
//         onUploadProgress: (event: ProgressEvent) => {
//           const percent = Math.round((event.loaded * 100) / (event.total || 1));
//           setProgress(percent);
//         },
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (response.data && response.data.suggestions) {
//         setSuggestions(response.data.suggestions);
//       } else {
//         setError('No suggestions returned. Please try again.');
//       }
//     } catch (err: any) {
//       console.error('Upload error:', err);
//       if (err.response) {
//         setError(`Server error: ${err.response.data.error || 'Unknown error'}`);
//       } else if (err.request) {
//         setError('No response from server. Please check your connection.');
//       } else {
//         setError(`Upload failed: ${err.message}`);
//       }
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return { handleFileDrop, progress, suggestions, error, isUploading };
// };

// export default useUpload;