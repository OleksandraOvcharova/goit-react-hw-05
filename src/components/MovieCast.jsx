import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieCast } from "../api/movies";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      try {
        setError(false);
        setLoading(true);
        const { cast } = await fetchMovieCast(movieId);

        setCast(cast);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCast();
  }, []);
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {(cast.length === 0 && <p>There is no data for this movie.</p>) || (
        <ul>
          {cast.map(({ id, name, character, profile_path }) => {
            return (
              <li key={id}>
                <img src={`https://image.tmdb.org/t/p/w200/${profile_path}`} />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
