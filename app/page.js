"use client"
import { useState } from 'react';
import MovieSearch from './components/MovieSearch';
import Link from 'next/link';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center  max-w-full">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 ">Welcome to Movie Search</h1>
        <p className="text-lg text-gray-600 mb-4">Search for your favorite movies and explore!</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-2 focus:outline-none transition duration-300 ease-in-out"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </header>

      {/* Animated menu */}
      <nav className={`menu ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition duration-300 ease-in-out mb-8`}>
        <ul className="text-center">
          {/* Menu items */}
          <MenuItem href="/popular">Popular Movies</MenuItem>
          <MenuItem href="/now-playing">Now Playing Movies</MenuItem>
          <MenuItem href="/upcoming">Upcoming Movies</MenuItem>
          <MenuItem href="/top-rated">Top Rated Movies</MenuItem>
        </ul>
      </nav>

      {/* Search component */}
      <MovieSearch />
    </div>
  );
};

// Custom menu item component
const MenuItem = ({ href, children }) => (
  <li className="mb-4">
    <Link href={href} className="text-xl text-gray-800 hover:text-blue-500 transition-colors">{children}</Link>
  </li>
);

export default Home;
