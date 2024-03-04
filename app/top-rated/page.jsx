"use client"
import React, { useState, useEffect } from 'react';
import { fetchTopRatedMovies } from '@/app/api/Actions';
import Link from 'next/link';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTopRatedMovies(1);
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
       <Link className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-2 focus:outline-none transition duration-300 ease-in-out" href="/">Back to Home</Link>
      {isLoading ? (
        // Skeleton loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
              <div className="w-full h-80 bg-gray-300 rounded-t-lg"></div>
              <div className="p-6">
                <div className="w-3/4 h-4 bg-gray-300 mb-4 rounded-md"></div>
                <div className="w-full h-12 bg-gray-300 mb-4 rounded-md"></div>
                <div className="w-full h-12 bg-gray-300 mb-4 rounded-md"></div>
                <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Display movie list
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-6">Top Rated Movies</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
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
                  <p className="text-gray-700 text-base">Release Date: {movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
