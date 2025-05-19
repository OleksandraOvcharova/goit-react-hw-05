import { fetchTrendingMovies } from "../api/movies";
import { useState, useEffect } from "react";
import MovieList from "../components/ MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError(false);
        setLoading(true);
        const { results } = await fetchTrendingMovies();
        setMovies(results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <h1>Trending Today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
