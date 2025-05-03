// import express from 'express';
// import { reviewText } from '../services/ai';

// export const handleTextAnalysis = async (req: express.Request, res: express.Response): Promise<void> => {
//   try {
//     const { text } = req.body;
    
//     if (!text || typeof text !== 'string') {
//       res.status(400).json({ error: 'No resume text provided' });
//       return;
//     }

//     // Basic validation
//     if (text.trim().length < 50) {
//       res.status(400).json({ error: 'Resume text is too short. Please provide more detailed content.' });
//       return;
//     }

//     const aiResponse = await reviewText(text);
//     const suggestions = extractSuggestionsFromAIResponse(aiResponse);

//     res.status(200).json({ suggestions });
//   } catch (err) {
//     console.error('Text analysis error:', err);
//     const error = err as Error;
//     res.status(500).json({ 
//       error: error.message || 'Internal server error',
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// };

// // Helper function to parse AI response - same as in upload.ts
// function extractSuggestionsFromAIResponse(aiResponse: string): string[] {
//   // Simple parsing approach - split by line breaks and filter out empty lines
//   const lines = aiResponse.split('\n').filter(line => line.trim().length > 0);
//   // You may need a more sophisticated parsing approach depending on AI output format
//   return lines;
// }

// server/src/controllers/textAnalysis.ts
import express from 'express';
import { reviewText } from '../services/ai';

export const handleTextAnalysis = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string' || text.trim().length < 50) {
      res.status(400).json({ error: 'Valid resume text is required (minimum 50 characters)' });
      return;
    }

    const aiResponse = await reviewText(text);
    const suggestions = extractSuggestionsFromAIResponse(aiResponse);

    res.status(200).json({ suggestions });
  } catch (err) {
    console.error('Text Analysis error:', err);
    const error = err as Error;
    res.status(500).json({ 
      error: error.message || 'Internal server error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Helper function to parse AI response - same as in upload controller
function extractSuggestionsFromAIResponse(aiResponse: string): string[] {
  // Simple parsing approach - split by line breaks and filter out empty lines
  const lines = aiResponse.split('\n').filter(line => line.trim().length > 0);
  // You may need a more sophisticated parsing approach depending on AI output format
  return lines;
}