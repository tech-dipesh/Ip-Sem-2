import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import logo from '../assets/profile.jpg';

const Header: React.FC = () => (
  // Header animation
<header className="bg-primary-blue p-4 flex justify-between bg-blue-200 items-center">
  <Link to="/" className="hover:opacity-80 transition-opacity">
    <img src={logo} alt="Logo" className="h-10" />
  </Link>
  <nav className="flex space-x-4">
    <Link 
      to="/" 
      className="text-white hover:opacity-80 transition-opacity"
    >
      Home
    </Link>
    <Link
      to="/upload"
      className="text-white hover:opacity-80 transition-opacity"
    >
      Upload
    </Link>
    <Link
      to="/how"
      className="text-white hover:opacity-80 transition-opacity"
    >
      How It Works
    </Link>
    <Link
      to="/contact"
      className="text-white hover:opacity-80 transition-opacity"
    >
      Contact
    </Link>
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
