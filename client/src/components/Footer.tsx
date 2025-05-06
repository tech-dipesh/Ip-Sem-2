import React from 'react';
import { motion } from 'framer-motion';
import { LinkedIn, Instagram, Facebook, Code, Favorite } from '@mui/icons-material';
import { SiTypescript, SiReact, SiExpress } from 'react-icons/si';

const Footer: React.FC = () => (
  // Our main footer file
  <footer className="bg-blue-600 text-white p-12 relative overflow-hidden">
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-8">
        <div className="col-span-12 md:col-span-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <h6 className="text-lg font-bold mb-4">About Project Creations</h6>
            <p className="text-sm">
              Build a tool that can be useful for the students and emplooyees, who want to improve their resume.
            </p>
          </motion.div>
        </div>

        <div className="col-span-6 md:col-span-2">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <h6 className="text-lg font-bold mb-4">Quick Links</h6>
            <ul className="list-none pl-">
              {[
                { text: 'Home', href: '/' },
                { text: 'Upload Resume', href: '/upload' },
                { text: 'Contact Us', href: '/contact' },
                { text: 'Privacy Policy', href: '/privacy' },
              ].map((link) => (
                <li key={link.text} className="mb-3 text-green-500">
                  <a href={link.href} className="text-blue-500 no-underline  hover:text-blue-300">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

{/* Contact us where anyone can contact us */}
        <div className="col-span-6 md:col-span-3">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <h6 className="text-lg font-bold mb-4">Contact Us</h6>
            <p className="text-sm mb-4">
              📧 dipeshgautambusiness@gmail.com<br />
              📱 +91-9745400194 <br />
              📍 Cu Students
            </p>
            <div className="flex gap-4 mt-4">
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-white">
                <Instagram fontSize="large" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-white">
                <LinkedIn fontSize="large" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-white">
                <Facebook fontSize="large" />
              </motion.a>
            </div>
          </motion.div>
        </div>

{/* All of the tech stack used on the tool */}
        <div className="col-span-12 md:col-span-3">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <h6 className="text-lg font-bold mb-4">Built With</h6>
            <div className="flex gap-4 items-center">
              <SiTypescript className="text-2xl" />
              <SiReact className="text-2xl" />
              <SiExpress className="text-2xl" />
              <Code className="text-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

{/* Footer bottom side */}
      <div className="pt-4 mt-8 border-t border-white/10 text-center">
        <p className="text-sm">
          © 2025 College Creations. All Rights Reserved.<br />
          Made with <Favorite className="text-red-500 text-base" /> 
          by Dipesh, Robin, Mohit, Krisy
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="/privacy" className="text-white text-sm hover:text-blue-300">
            Privacy Policy
          </a>
          <a href="/terms" className="text-white text-sm hover:text-blue-300">
            Terms of Use
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;