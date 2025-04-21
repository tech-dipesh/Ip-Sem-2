import React from 'react';
import UploadArea from '../components/Upload';
import Suggestions from '../components/Suggestion';
import useUpload from '../hooks/upload';
import ProgressBar from '../components/Progress';

const Upload: React.FC = () => {
  const {
    handleFileDrop,
    progress,
    suggestions,
    error,
    isUploading,
  } = useUpload();

  return (
    <div className="upload-page">
      <h1>Upload Your Resume</h1>
      <UploadArea onDrop={handleFileDrop} isUploading={isUploading} />
      {error && <p className="error">{error}</p>}
      {isUploading && <ProgressBar progress={progress} />}
      {suggestions && <Suggestions data={suggestions} />}
    </div>
  );
};

export default Upload;
