import React, { useEffect, useState } from "react";
import style from "./App.module.css";
import MovieSearch from "./components/MovieSearch/MovieSearch";
import MovieList from "./components/MovieList/MovieList";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import { useDispatch } from "react-redux";
import { movieActions } from "./store/movieSlice";
import Error from "./components/Error/Error";
import Fetch from "./components/Function/Fetch";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialMovies, setInitialMovies] = useState([]);
  const [isVisible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const saveData = (data) => {
    setTotalPage(data.total_pages);
    dispatch(movieActions.addPage({ page: 1, results: data.results }));
    setError(null);
    setInitialMovies(data.results);
  };
  const errors = (error) => {
    setError(error.message);
    setInitialMovies([]);
  };

  const final = () => {
    setLoading(false);
  };
  const fetchHandler = () => {
    Fetch({
      url: `${process.env.REACT_APP_TRANDING_URL}1`,
      saveData,
      errors,
      final,
    });
  };
  useEffect(() => {
    if (!query) {
      fetchHandler();
    }
  }, []);

  const onSearch = (query) => {
    setQuery(query);
    if (!query) {
      fetchHandler();
      return;
    }
    Fetch({
      url: `${process.env.REACT_APP_SEARCH_URL}?query=${query}&page=1`,
      saveData,
      errors,
      final,
    });
  };

  const openMovieDetail = (movie) => {
    setSelectedMovie(movie);
    setVisible(true);
  };

  const closeMovieDetail = () => {
    setSelectedMovie(null);
    setVisible(false);
  };
  return (
    <div className={style.App}>
      <h1 className={style.AppTitle}>Movie Search App</h1>
      <MovieSearch onSearch={onSearch} />
      <div className={style.trandingTitle}>
        {query ? `Result For : "${query}"` : "🔥Tranding Movies"}
      </div>

      <div className={style["App-container"]}>
        {error && <Error message={error} />}
        {query && (
          <MovieList
            onSelect={(movie) => {
              openMovieDetail(movie);
            }}
            query={query}
            totalPage={totalPage}
            initialMovies={initialMovies}
            url={`${process.env.REACT_APP_SEARCH_URL}?query=${query}&page=`}
          />
        )}
        {!query && (
          <MovieList
            onSelect={(movie) => {
              openMovieDetail(movie);
            }}
            totalPage={totalPage}
            initialMovies={initialMovies}
            url={`${process.env.REACT_APP_TRANDING_URL}`}
          />
        )}
        {isVisible && (
          <MovieDetail movie={selectedMovie} onClose={closeMovieDetail} />
        )}
        {loading && <p className={style.loading}>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
