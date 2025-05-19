import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTA1NjkzMzI0NzEyZTIwZGJmYTJiYzQwYjUwYjYzMyIsIm5iZiI6MTc0NzMxNTkyMi43NzMsInN1YiI6IjY4MjVlY2QyMjE4NmQ1YWU3ZWFkYTJhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ty2BGI2nvrcc64hr2dJBbI-xEXTNvHcYw3DLqsXeb_o";

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`/trending/movie/day`);
  return response.data;
};

export const fetchMoviesWithSearch = async (search) => {
  const response = await axios.get(`/search/movie?query=${search}`);
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data;
};
