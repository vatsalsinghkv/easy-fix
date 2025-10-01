// src/components/Footer.jsx

import React from 'react';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
} from 'react-icons/fa';

const socialLinks = [
  {
    id: 1,
    icon: <FaGlobe />,
    url: 'https://yourwebsite.com',
  },
  {
    id: 2,
    icon: <FaGithub />,
    url: 'https://github.com/yourhandle',
  },
  {
    id: 3,
    icon: <FaTwitter />,
    url: 'https://twitter.com/yourhandle',
  },
  {
    id: 4,
    icon: <FaLinkedin />,
    url: 'https://linkedin.com/in/yourhandle',
  },
  {
    id: 5,
    icon: <FaInstagram />,
    url: 'https://instagram.com/yourhandle',
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-10 border-t border-gray-300 dark:border-gray-700">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Connect with us
        </p>
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <span className="sr-only">Social Link</span>
              <div className="text-2xl">{link.icon}</div>
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Your Project Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
