import express from 'express';
import { UploadedFile } from 'express-fileupload';
import { parsePDF } from '../services/pdf-parse';
import { reviewText } from '../services/ai';
export const handleUpload = async (req: express.Request, res: express.Response): Promise<void> => {
  const file = req.files?.file as UploadedFile | undefined;
  if (!file || Array.isArray(file)) {
    res.status(400).json({ error: 'No file provided' });
    return;
  }
  
  const buffer = file.data;
  try {
    // 1. Parse the PDF to extract text
    const text = await parsePDF(buffer);
    
    // 2. Send the text to the AI service for analysis
    const aiResponse = await reviewText(text);
    
    // 3. Format the response
    // Parse AI response to extract suggestions
    const suggestions = extractSuggestionsFromAIResponse(aiResponse);
    
    // 4. Send successful response with suggestions
    res.status(200).json({ 
      success: true,
      suggestions 
    });
  } catch (err) {
    console.error('Upload processing error:', err);
    res.status(422).json({ error: (err as Error).message });
  }
};

// Helper function to parse AI response
function extractSuggestionsFromAIResponse(aiResponse: string): string[] {
  // Simple parsing approach - split by line breaks and filter out empty lines
  const lines = aiResponse.split('\n').filter(line => line.trim().length > 0);
  // You may need a more sophisticated parsing approach depending on AI output format
  return lines;
}