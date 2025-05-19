import { fetchMoviesWithSearch } from "../api/movies";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/ MovieList";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-hot-toast";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const search = searchParams.get("search") || "";

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set(key, value);

    setSearchParams(updatedParams);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const search = searchParams.get("search") || "";
        if (search === "") {
          return;
        }
        setError(false);
        setLoading(true);

        const { results } = await fetchMoviesWithSearch(search);
        setMovies(results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [searchParams]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const search = form.elements.search.value.trim();
    if (search === "") {
      toast.error("Please, enter your search.");
      return;
    }
    updateSearchParams("search", search);
    form.reset();
  };

  return (
    <>
      <h1></h1>
      <form onSubmit={handleSubmit}>
        <input
          defaultValue={search}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          className="search-input"
        />
        <button className="search-button" type="submit">
          <CiSearch />
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
