import React from 'react';
import { useState } from 'react';

const Footer = () => {
  const [year] = useState(new Date().getFullYear());

  return (
    <footer className="flex flex-row justify-evenly items-center p-3 bottom-0 fixed w-full h-12 bg-gradient-to-r from-yellow-500 to-yellow-400" data-testid="footer">
      <p className="text-white uppercase font-bold leading-snug tracking-wider">
        {' '}
        &copy; {year} Game Recommender
      </p>
    </footer>
  );
};

export default Footer;
