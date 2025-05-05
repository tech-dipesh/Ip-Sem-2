import React, { useState } from 'react';
import { Button, Box, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import './textInput.css';
// I added the textt input instead of resume file due to difficulty of doing solely

interface ResumeTextInputProps {
  onSubmit: (text: string) => Promise<void>;
  isProcessing: boolean;
}

const ResumeTextInput: React.FC<ResumeTextInputProps> = ({ onSubmit, isProcessing }) => {
  const [resumeText, setResumeText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // You should have at least 50 chars length .
    if (resumeText.trim().length < 50) {
      setError('Please enter a more detailed resume text (minimum 50 characters).');
      return;
    }
    // When i face the api error
    setError('');
    try {
      await onSubmit(resumeText);
    } catch (err) {
      setError('Failed to process resume text. Please try again.');
    }
  };

  return (
    <Paper elevation={3} className="resume-text-container">
      <Typography variant="h5" component="h2" gutterBottom>
        Paste Your Resume Text
      </Typography>
      
      <Typography variant="body2" color="textSecondary" paragraph>
        Copy and paste the content of your resume below for analysis and personalized suggestions.
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          multiline
          fullWidth
          rows={12}
          variant="outlined"
          placeholder="Paste your resume content here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          disabled={isProcessing}
          className="resume-text-field"
        />
        
        {error && (
          <Typography color="error" variant="body2" className="error-message">
            {error}
          </Typography>
        )}
        
        <Box className="submit-container">
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={isProcessing || resumeText.trim().length < 50}
            className="submit-button"
          >
            {isProcessing ? (
              <>
                <CircularProgress size={24} color="inherit" className="button-progress" />
                Analyzing...
              </>
            ) : (
              'Analyze Resume'
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ResumeTextInput;