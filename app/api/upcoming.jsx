"use server";
const API_KEY = "cea842aab7a44713ffbefd1876491443";



export async function fetchUpcomingMovies(page) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`
  );

  const data = await response.json();

  return data;
}

