
// import React from 'react';
// import ResumeTextInput from '../components/textInput';
// import Suggestions from '../components/Suggestion';
// import useResumeText from '../hooks/resumetext';

// const Upload: React.FC = () => {
//   const {
//     handleTextSubmit,
//     suggestions,
//     error,
//     isProcessing,
//   } = useResumeText();

//   return (
//     <div className="upload-page">
//       <h1>Resume Analysis</h1>
//       <ResumeTextInput onSubmit={handleTextSubmit} isProcessing={isProcessing} />
//       {error && <p className="error">{error}</p>}
//       {suggestions && <Suggestions data={suggestions} />}
//     </div>
//   );
// };

// export default Upload;
import React from 'react';
import ResumeTextInput from '../components/textInput';
import useResumeText from '../hooks/resumetext';
import { motion } from 'framer-motion';

const Upload: React.FC = () => {
  const {
    handleTextSubmit,
    suggestions,
    error,
    isProcessing,
  } = useResumeText();

  return (
    // Upload main client page
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div className="max-w-3xl w-full mx-auto"> 
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-900 text-center mb-8"
      >
        AI Resume Analysis
      </motion.h1>

        <ResumeTextInput 
          onSubmit={handleTextSubmit} 
          isProcessing={isProcessing} 
        />

        {error && (
          <div className={`
            animate-shake border-l-4 mt-8
            ${error.includes('ERROR:') ? 'border-red-500 bg-red-100/30' : 'border-yellow-500 bg-yellow-100/30'}
            p-4 rounded-lg transition-all duration-300
            hover:scale-[1.005] hover:shadow-sm
          `}>
            <div className="flex items-start gap-3">
              <span className={`shrink-0 text-2xl ${error.includes('ERROR:') ? 'text-red-500' : 'text-yellow-600'}`}>
                {error.includes('ERROR:') ? '🚨' : '⚠️'}
              </span>
              <div>
                <h3 className={`
                  font-semibold mb-1
                  ${error.includes('ERROR:') ? 'text-red-700' : 'text-yellow-800'}
                  text-lg
                `}>
                  {error.includes('ERROR:') ? 'Invalid Resume Format' : 'Analysis Warning'}
                </h3>
                <p className={`leading-relaxed ${error.includes('ERROR:') ? 'text-red-600' : 'text-yellow-700'}`}>
                  {error.replace('ERROR:', '').trim()}
                </p>
              </div>
            </div>
          </div>
        )}

        {suggestions && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mt-8"
          >
            {/* Output user will see after getting review from the api */}
            <div className="bg-emerald-50/40 border border-emerald-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  👤
                </span>
                <h3 className="text-emerald-800 font-semibold text-lg">
                  Professional Identity
                </h3>
              </div>
              <p className="text-emerald-700 font-medium">
                {suggestions[0]}
              </p>
            </div>

{/* score that user get out of 100 */}
            <div className="bg-blue-50/40 border border-blue-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  🏆
                </span>
                <h3 className="text-blue-800 font-semibold text-lg">
                  Overall Score
                </h3>
              </div>
              <div className="text-4xl font-bold text-blue-700 text-center">
                {suggestions.find(s => s.includes('/100'))?.split(': ')[1]}
              </div>
            </div>

{/*  in the form of list, i need the better styling */}
            <div className="space-y-4">
              {suggestions.slice(1).map((suggestion, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <span className={`shrink-0 pt-1 ${index < 2 ? 'text-green-500' : 'text-amber-500'}`}>
                    {index < 2 ? '✅' : ''}
                  </span>
                  <p className="text-gray-700 leading-relaxed">
                    {suggestion}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Upload;