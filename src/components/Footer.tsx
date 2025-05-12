import React from 'react';
import logo from './assets/0dbe7a59-0897-42ad-9da1-d11ff6821012.png';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-center py-4 z-50">
      <div className="flex items-center justify-center space-x-2">
        <a href="https://github.com/maneki-neeko" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Maneki Neeko Logo" className="h-8 w-8" />
        </a>
        <a href="https://github.com/maneki-neeko" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:underline flex items-center space-x-1">
          <span>Desenvolvido por</span>
          <Heart className="h-4 w-4 text-red-500" />
            <span className="font-bold">Maneki Neeko</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;