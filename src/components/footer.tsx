import React from 'react';
import Animation from "./animation";
import Logo from "../assets/json/logo.json";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link href="/">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Animation animation={Logo} />
            <span className="text-xl font-bold">NFT COLLECTIONS</span>
          </a>
        </Link>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2022 NFT Collections —
          <a href="/" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@geonil</a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start"></span>
      </div>
    </footer>
  );
};

export default Footer;
