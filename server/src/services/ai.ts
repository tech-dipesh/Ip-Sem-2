  // import dotenv from 'dotenv';
  // import path from "path"

  // // dotenv.config({ path: path.resolve(__dirname, '../.env') });
  // // dotenv.config()
  // dotenv.config({ path: path.resolve(__dirname, '../../.env') });

  // // console.log("__dirname is", __dirname);

  // import fetch from 'node-fetch';
  // const apiKey="AAIzaSyA77IdQ0IOvUqhrzjgz3SrrpPQ1EkWfOSw";
  // if(!apiKey) throw new Error ("api Key is not exist")
  // // server/src/services/ai.ts
  // export const reviewText = async (text: string): Promise<string> => {
  //   try {
  //     const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-goog-api-key': apiKey,
  //       },
  //       body: JSON.stringify({
  //         contents: [{
  //           parts: [{
  //             text: `Analyze this resume and provide specific, actionable suggestions. Focus on:
  //             1. ATS optimization (score 0-100)
  //             2. Missing hard skills
  //             3. Missing soft skills
  //             4. Formatting issues
  //             5. Keyword optimization
              
  //             Resume: ${text.substring(0, 30000)}` // Limit input size
  //           }]
  //         }]
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`AI API error: ${response.statusText}`);
  //     }

  //     // const data = await response.json();
  //     const data = await response.json() as any; // Add type assertion
  //     return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No suggestions available';
  //   } catch (error) {
  //     console.error('AI Service Error:', error);
  //     throw new Error('Failed to analyze resume');
  //   }
  // };

  // server/src/services/ai.ts
import dotenv from 'dotenv';
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import fetch from 'node-fetch';

// Get API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY is not set in environment variables");

export const reviewText = async (text: string): Promise<string> => {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this resume and provide specific, actionable suggestions. Focus on:
            1. ATS optimization (score 0-100)
            2. Missing hard skills
            3. Missing soft skills
            4. Formatting issues
            5. Keyword optimization
            
            Resume: ${text.substring(0, 30000)}` // Limit input size
          }]
        }]
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.statusText}`);
    }

    const data = await response.json() as any; // Add type assertion
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No suggestions available';
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to analyze resume');
  }
};