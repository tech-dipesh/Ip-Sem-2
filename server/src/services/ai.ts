console.log(process.env.GEMINI_API_KEY);
import fetch from 'node-fetch';
const apiKey: any=process.env.GEMINI_API_KEY;
if(!apiKey) throw new Error ("api Key is not exist")
export const reviewText = async (text: string): Promise<any> => {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Analyze this resume for ATS compatibility. Provide:\n
          1. ATS score (0-100)\n
          2. Missing keywords\n
          3. Improvement suggestions\n\n
          Resume: ${text}`
        }]
      }]
    }),
  });
  
  const data: any = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Analysis failed';
};