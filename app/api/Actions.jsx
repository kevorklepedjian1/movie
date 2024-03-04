"use server";
const API_KEY = "cea842aab7a44713ffbefd1876491443";

export async function fetchMovies(query, page) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&sort_by=popularity.desc`
  );

  const data = await response.json();

  return data;
}

export async function fetchNowPlayingMovies(page) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`
  );

  const data = await response.json();

  return data;
}

export async function fetchPopularMovies(page) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  const data = await response.json();

  return data;
}

export async function fetchUpcomingMovies(page) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`
  );

  const data = await response.json();

  return data;
}

export async function fetchTopRatedMovies(page) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
  );

  const data = await response.json();

  return data;
}
