// import { useState } from 'react';
// import { analyzeResumeText } from '../services/api';
// import { useAuth } from '@clerk/clerk-react';

// const useResumeText = () => {
//   const { getToken } = useAuth();
//   const [suggestions, setSuggestions] = useState<string[] | null>(null);
//   const [error, setError] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleTextSubmit = async (text: string) => {
//     if (!text || text.trim().length < 50) {
//       setError('Please provide a more detailed resume text.');
//       return;
//     }

//     setIsProcessing(true);
//     setError('');

//     try {
//       const token = await getToken();
//       const response = await analyzeResumeText(text, token);

//       if (response.data && response.data.suggestions) {
//         setSuggestions(response.data.suggestions);
//       } else {
//         setError('No suggestions returned. Please try again.');
//       }
//     // Update the error handling block (Lines ~29-37)
// }
// // resumetext.tsx - Add specific error case
// catch (err: any) {
//   console.error('Analysis error:', err);
//   let errorMessage = 'Analysis failed';
  
//   if (err.response?.data?.error) {
//     errorMessage = err.response.data.error;
//   } else if (err.message.includes('Network Error')) {
//     errorMessage = 'Network error - check your internet connection';
//   } else if (err.message.includes('400')) { // Add this
//     errorMessage = 'Invalid request format';
//   }
  
//   setError(errorMessage);
// }
//      finally {
//       setIsProcessing(false);
//     }
//   };

//   return { handleTextSubmit, suggestions, error, isProcessing };
// };

// export default useResumeText;

import { useState } from 'react';
import { analyzeResumeText } from '../services/api';
import { useAuth } from '@clerk/clerk-react';

const useResumeText = () => {
  const { getToken } = useAuth();
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTextSubmit = async (text: string) => {
    if (!text || text.trim().length < 50) {
      setError('Please provide a resume text with at least 50 characters');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuggestions(null);

    try {
      const token = await getToken();
      const response = await analyzeResumeText(text, token);

      if (response.data?.suggestions) {
        setSuggestions(response.data.suggestions);
      } else {
        setError('No suggestions received from server');
      }
    } catch (err: any) {
      console.error('Analysis Error:', err);
      
      let errorMessage = 'Analysis failed';
      if (err.response) {
        errorMessage = err.response.data?.error || 
                      err.response.data?.message || 
                      `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = 'No response from server - check your connection';
      } else if (err.message.includes('Network Error')) {
        errorMessage = 'Network error - please check internet connection';
      }

      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return { handleTextSubmit, suggestions, error, isProcessing };
};

export default useResumeText;