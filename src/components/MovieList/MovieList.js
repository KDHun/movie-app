import React, { useEffect, useState } from "react";
import styles from "./MovieList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { movieActions } from "../../store/movieSlice";
import Error from "../Error/Error";
import Pagination from "../UI/Pagination";
import Movie from "../Movie/Movie";
import Fetch from "../Function/Fetch";
function MovieList({ onSelect, totalPage, initialMovies, url }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    setMovies(initialMovies);
  }, [initialMovies]);

  const saveData = (data) => {
    totalPage = data.total_pages;
    dispatch(movieActions.addPage({ currentPage, results: data.results }));
    setError(null);
    setMovies(data.results);
  };
  const errors = (error) => {
    setError(error.message);
    setMovies([]);
  };
  const final = () => {
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    if (movie && movie[page]) {
      setMovies(movie[page]);
      setLoading(false);
      return;
    }
    Fetch({ url: url + page, saveData, errors, final });
  };

  return (
    <div className={styles.MovieList}>
      {error && <Error message={error} />}
      {loading && <p>Loading...</p>}

      <div className={styles.movies}>
        {!loading &&
          !error &&
          movies?.map((movie) => (
            <Movie key={movie.id} movie={movie} onSelect={onSelect} />
          ))}
      </div>
      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default MovieList;
