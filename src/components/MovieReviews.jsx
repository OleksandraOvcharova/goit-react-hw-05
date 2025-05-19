import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieReviews } from "../api/movies";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setError(false);
        setLoading(true);
        const { results } = await fetchMovieReviews(movieId);

        setReviews(results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {(reviews.length === 0 && (
        <p>We don't have any reviews for this movie.</p>
      )) || (
        <ul>
          {reviews.map(({ author, id, content }) => {
            return (
              <li key={id}>
                <h3>Author: {author}</h3>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
