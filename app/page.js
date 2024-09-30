import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="landing-container h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 via-rose-100 to-gray-200 text-gray-800">
      <div className="text-center p-10 bg-opacity-90 bg-white text-gray-800 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900 animate-fade-in">
          Artwork Showcase
        </h1>
        <p className="text-lg mb-4 font-light">
          Discover "<strong>Silence of Love</strong>", a personal reflection on the beauty of nature.
        </p>
        <p className="text-md mb-6 font-light">
          Dive deep into its story, explore the materials, and leave your thoughts in the comments.
        </p>
        <Link href="/artwork">
          <div className="px-8 py-4 bg-rose-200 text-gray-900 text-lg rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105 hover:bg-rose-300">
            Explore the Artwork
          </div>
        </Link>
      </div>
      <div className="mt-12 flex items-center justify-center space-x-4 animate-slow-fade-in">
        <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-rose-200 to-rose-300"></div>
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-gray-300 to-rose-100"></div>
        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-rose-300 to-gray-200"></div>
      </div>
    </div>
  );
};

export default Home;
