import React from 'react';
// This is when i upload the file and while progressing, it is not implementing at the moment on my website
interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }} />
      <span>{progress}%</span>
    </div>
  );
};

export default ProgressBar;
