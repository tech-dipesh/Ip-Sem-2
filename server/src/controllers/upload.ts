import express from 'express';
import { UploadedFile } from 'express-fileupload';
import { parsePDF } from '../services/pdf-parse';
import { reviewText } from '../services/ai';
// server/src/controllers/upload.ts
export const handleUpload = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const file = req.files?.file as UploadedFile | undefined;
    
    if (!file || Array.isArray(file)) {
      res.status(400).json({ error: 'No file provided' });
      return;
    }

    // Add file validation
    if (file.mimetype !== 'application/pdf') {
      res.status(400).json({ error: 'Only PDF files are allowed' });
      return;
    }

    const buffer = file.data;
    const text = await parsePDF(buffer);
    const aiResponse = await reviewText(text);
    const suggestions = extractSuggestionsFromAIResponse(aiResponse);

    res.status(200).json({ suggestions });
  } catch (err) {
    console.error('Upload error:', err);
    const error = err as Error;
    res.status(500).json({ 
      error: error.message || 'Internal server error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
// Helper function to parse AI response
function extractSuggestionsFromAIResponse(aiResponse: string): string[] {
  // Simple parsing approach - split by line breaks and filter out empty lines
  const lines = aiResponse.split('\n').filter(line => line.trim().length > 0);
  // You may need a more sophisticated parsing approach depending on AI output format
  return lines;
}