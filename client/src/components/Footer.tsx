import React from 'react';

const Footer: React.FC = () => (
  <footer style={{ backgroundColor: 'var(--secondary-blue)', padding: '1rem', textAlign: 'center', color: '#fff' }}>
    <p>All rights reserved</p>
    <div>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 0.5rem' }}>LinkedIn</a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 0.5rem' }}>Facebook</a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 0.5rem' }}>Instagram</a>
    </div>
  </footer>
);

export default Footer;
