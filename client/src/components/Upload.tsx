import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiLoader } from 'react-icons/fi';
import './Upload.css';
// It is not funcinal at the moment
interface UploadAreaProps {
  onDrop: (files: FileList) => void;
  isUploading: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onDrop, isUploading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {'application/pdf': ['.pdf']},
    multiple: false,
    onDrop: acceptedFiles => onDrop(acceptedFiles as unknown as FileList),
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    disabled: isUploading
  });

  const handleClick = () => {
    if (!isUploading && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div 
      {...getRootProps()}
      className={`upload-container ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
      ref={areaRef}
    >
      <input {...getInputProps()} ref={inputRef} />
      
      <div className="upload-content">
        <div className="icon-container">
          {isUploading ? (
            <FiLoader className="spin-animation" />
          ) : (
            <FiUploadCloud className="pulse-animation" />
          )}
        </div>

        <div className="text-container">
          {isUploading ? (
            <h2>Analyzing Resume...</h2>
          ) : (
            <>
              <h2>Drag & Drop PDF Resume</h2>
              <p>or <span className="browse-button" onClick={handleClick}>browse files</span></p>
              <p className="support-text">Supports: PDF (max 5MB)</p>
            </>
          )}
        </div>

        {isUploading && (
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadArea;