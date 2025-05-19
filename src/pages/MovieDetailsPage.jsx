import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchMovieDetails } from "../api/movies";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkHref = useRef(location.state);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setError(false);
        setLoading(true);
        const movieDetails = await fetchMovieDetails(movieId);

        setMovie(movieDetails);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {movie && (
        <div>
          <Link to={backLinkHref.current || "/movies"}>Go back</Link>
          <div>
            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
          </div>
          <div>
            <h1>{movie.title}</h1>
            <p>User Score: {Math.round(movie.vote_average * 10.0)}%</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <h2>Genres</h2>
            <p>{movie.genres.map(({ name }) => name).join(", ")}</p>
          </div>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </>
  );
}
