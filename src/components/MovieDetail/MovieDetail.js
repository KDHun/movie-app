import React, { useState } from "react";
import styles from "./MovieDetail.module.css";
import img from "../../images/default-img.jpg";
import Fetch from "../Function/Fetch";

function MovieDetail(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  if (!props.movie) return null;

  const saveData = (response) => {
    setData(response);
    setError(null);
  };
  const errors = (error) => {
    setError(error.message);
  };

  const final = () => {
    setLoading(false);
  };
  Fetch({
    url: `https://api.themoviedb.org/3/movie/347201?language=en-US`,
    saveData,
    errors,
    final,
  });

  const {
    title,
    poster_path,
    overview,
    genres,
    production_companies,
    production_countries,
    spoken_languages,
    status,
    release_date,
  } = data;
  return (
    <div className={styles.MovieDetailOverlay}>
      {loading && <div>Loading....</div>}
      {error && <div className={styles.error}>{error.message}</div>}
      {data && !loading && !error && (
        <div className={styles.MovieDetail}>
          <div className={styles.MoviePoster}>
            <img
              src={"https://image.tmdb.org/t/p/w500/" + poster_path}
              alt={title}
              onError={(e) => {
                e.target.src = img;
              }}
            />
          </div>
          <div className={styles.MovieTitle}>{title}</div>
          <div className={styles.MovieOverview}>{overview}</div>

          <div className={styles.MovieInfo}>
            <div className={styles.MovieInfoItem}>
              <span className={styles.InfoLabel}>Genres:</span>
              <span className={styles.InfoValue}>
                {genres?.map((genre) => genre.name).join(", ")}
              </span>
            </div>
            <div className={styles.MovieInfoItem}>
              <span className={styles.InfoLabel}>Production Companies:</span>
              <span className={styles.InfoValue}>
                {production_companies.map((company) => company.name).join(", ")}
              </span>
            </div>
            <div className={styles.MovieInfoItem}>
              <span className={styles.InfoLabel}>Production Countries:</span>
              <span className={styles.InfoValue}>
                {production_countries
                  ?.map((country) => country.name)
                  .join(", ")}
              </span>
            </div>
            <div className={styles.MovieInfoItem}>
              <span className={styles.InfoLabel}>Languages:</span>
              <span className={styles.InfoValue}>
                {spoken_languages
                  ?.map((language) => language.english_name)
                  .join(", ")}
              </span>
            </div>
            <div className={styles.MovieInfoItem}>
              <span className={styles.InfoLabel}>Status:</span>
              <span className={styles.InfoValue}>{status}</span>
            </div>
            <div className={styles.MovieInfoItem}>
              <span className={styles.InfoLabel}>Release Date:</span>
              <span className={styles.InfoValue}>{release_date}</span>
            </div>
          </div>

          <button className={styles.CloseButton} onClick={props.onClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
