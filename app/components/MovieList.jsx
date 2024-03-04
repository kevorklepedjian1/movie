// MovieList.js
"use client"
import React, { useState, useEffect } from 'react';
import { fetchUpcomingMovies } from '@/app/api/upcoming';

function MovieList({ category }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      if (category === 'upcoming') {
        const data = await fetchUpcomingMovies(1);
        setMovies(data.results);
      }
    }

    fetchMovies();
  }, [category]);

  return (
    <div>
      <h1>{category === 'upcoming' ? 'Upcoming Movies' : 'Unknown Category'}</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            )}
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
