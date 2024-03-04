"use client"
import { useState } from 'react';
import { fetchMovies } from '@/app/api/Actions';
import Link from 'next/link';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchMovies = async () => {
    setIsLoading(true);
    try {
      const data = await fetchMovies(query, 1);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="mb-8 flex justify-center items-center md:flex-col lg:flex-row">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChange}
          className="w-full sm:w-1/4 md:w-3/4 lg:w-1/2 border border-purple-400 rounded-md px-4 py-3 focus:outline-none focus:border-purple-600 text-lg text-gray-800 bg-white placeholder-gray-400 transition duration-300"
        />
        <button type="submit" className="ml-4 px-8 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300 text-lg">
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:w-3/4 lg:w-full">
        {isLoading ? (
          // Skeleton loading
          Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
              <div className="w-full h-80 bg-gray-300 rounded-t-lg"></div>
              <div className="p-6">
                <div className="w-3/4 h-4 bg-gray-300 mb-4 rounded-md"></div>
                <div className="w-full h-12 bg-gray-300 mb-4 rounded-md"></div>
                <div className="w-full h-12 bg-gray-300 mb-4 rounded-md"></div>
                <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          ))
        ) : (
          // Display search results
          searchResults.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-80 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-80 bg-gray-300 flex justify-center items-center">
                  <span className="text-gray-500 text-lg">Image Not Available</span>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-purple-800">{movie.title}</h2>
                <p className="text-gray-700 text-base">{movie.overview}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
