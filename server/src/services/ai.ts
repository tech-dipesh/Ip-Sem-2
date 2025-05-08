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
// server/src/services/ai.ts
import dotenv from 'dotenv';
import path from "path";
import fetch from 'node-fetch';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

//  const apiKey = process.env.GEMINI_API_KEY;
const apiKey = "AIzaSyDW2egOT7NHy7STB06iDFegX9IAnFulujs";

export const reviewText = async (text: string): Promise<string> => {
  try {
    if (!apiKey) throw new Error('Missing Gemini API key');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{
              // const analysisPrompt = (text: string) =>
              // This is the custom prompts that we command to ai, 
              text: `🔍 Resume Analysis Protocol 🔍
              Step 1: Resume Validation
              ${'❗'.repeat(45)}
              If the input is NOT a professional resume (contains code, random text, or invalid format), respond with:
              "ERROR: 🚫 Please provide a proper resume document (PDF/text format). Detected input type: [DESCRIBE_INPUT_TYPE]"
              
              Step 2: Professional Identification
              Analyze resume content to determine primary profession:
              "👤 Professional Identity: [PROFESSION] (Confidence: X%)"
              
              Step 3: Section-by-Section Analysis
              1️⃣ **Headline Review** 🎯
              ${text.includes('Summary') ? '✅' : '❌'} [HEADLINE_FEEDBACK]
              
              2️⃣ **Education Check** 🎓
              ${text.match(/Education|Academic/i) ? '✅' : '❌'} [EDUCATION_FEEDBACK]
              
              3️⃣ **Experience Audit** 💼
              ${text.match(/Experience|Work History/i) ? '✅' : '❌'} [EXPERIENCE_FEEDBACK]
              
              4️⃣ **Skills Evaluation** 🛠️
              ${text.match(/Skills|Technical/i) ? '✅' : '❌'} [SKILLS_FEEDBACK]
              
              Step 4: Final Assessment 📊
              🏆 **Overall Score**: [SCORE]/100
              🌟 [STRENGTH_1]
              🌟 [STRENGTH_2]
              🛑 [WEAKNESS_1]
              🛑 [WEAKNESS_2]
              💡 Top Improvement: [TOP_IMPROVEMENT]
              
              You are not allowed to use the any bold content that could appear on the j
              Format Rules:
              • You shouldn't make content on the bold as it shows like this: ** , which don't look good so don't add these ** on the any content. 
              • Max 7 bullet points
              • 1 line per bullet
              • Use simple emojis
              • Keep language conversational
              
              Resume Content:
              ${text.substring(0, 30000)}`
            }]
          }]
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorBody}`);
    }

    const data = await response.json() as any;
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No suggestions available';
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to analyze resume. Please try again later.');
  }
};