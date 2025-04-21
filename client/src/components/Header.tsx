import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import logo from '../assets/logo.svg';

const Header: React.FC = () => (
  <header style={{ backgroundColor: 'var(--primary-blue)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Link to="/">
      <img src={logo} alt="Logo" style={{ height: '40px' }} />
    </Link>
    <nav>
      <Link to="/" style={{ margin: '0 1rem', color: '#fff' }}>Home</Link>
      <Link to="/upload" style={{ margin: '0 1rem', color: '#fff' }}>Upload</Link>
      <Link to="/how" style={{ margin: '0 1rem', color: '#fff' }}>How It Works</Link>
    </nav>
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </header>
);

export default Header;
