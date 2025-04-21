import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to the Resume Reviewer</h1>
      <p>We will review your resume to help you stand out in the job market.</p>
      <section style={{ marginTop: '2rem' }}>
        <h2>Do you want to check your resume to be ahead in the market?</h2>
        <button
          onClick={() => navigate('/upload')}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--primary-blue)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Upload Resume
        </button>
      </section>
    </main>
  );
};

export default Home;
