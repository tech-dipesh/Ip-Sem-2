import React from 'react';

interface UploadAreaProps {
  onDrop: (files: FileList) => void;
  isUploading: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onDrop, isUploading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onDrop(e.target.files);
    }
  };

  return (
    <div className="upload-area">
      <input type="file" accept=".pdf" onChange={handleChange} disabled={isUploading} />
      <p>Drag and drop your resume here, or click to select a file.</p>
    </div>
  );
};

export default UploadArea;
