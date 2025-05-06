import { useState } from 'react';
import { analyzeResumeText } from '../services/api';
import { useAuth } from '@clerk/clerk-react';

// only for the  catch case
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
      setError(err.response?.data?.error || 'Analysis failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return { handleTextSubmit, suggestions, error, isProcessing };
};
export default useResumeText;