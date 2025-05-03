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
      setError('Please provide a more detailed resume text.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const token = await getToken();
      const response = await analyzeResumeText(text, token);

      if (response.data && response.data.suggestions) {
        setSuggestions(response.data.suggestions);
      } else {
        setError('No suggestions returned. Please try again.');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      if (err.response) {
        setError(`Server error: ${err.response.data.error || 'Unknown error'}`);
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError(`Analysis failed: ${err.message}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return { handleTextSubmit, suggestions, error, isProcessing };
};

export default useResumeText;