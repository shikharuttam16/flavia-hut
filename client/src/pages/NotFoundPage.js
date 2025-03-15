import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../assest/images/notfound.png';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col py-8  h-screen px-4 text-center md:flex-row md:text-left md:px-8">
      <div className="md:w-1/2 mt-8">
        <h1 className="text-4xl font-bold text-red-600 md:text-5xl">Oops....</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page not found</h2>
        <p className="mt-2 text-lg text-gray-600">
          This page doesn’t exist or was removed!
          <br />
          We suggest you go back to the home page.
        </p>
        <Link to="/" className="inline-flex items-center mt-6 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to home
        </Link>
      </div>
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src={notfound} 
          alt="404 Illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
