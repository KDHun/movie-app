import React from "react";
import styles from "./Movie.module.css";
import img from "../../images/default-img.jpg";
const Movie = (props) => {
  return (
    <div
      className={styles.container}
      onClick={() => props.onSelect(props.movie)}
    >
      <div className={styles.box}>
        <div className={styles["movie-item"]}>
          <img
            className={styles.movieImg}
            src={"https://image.tmdb.org/t/p/w500/" + props.movie.poster_path}
            alt={props.movie.title}
            onError={(e) => {
              e.target.src = img;
            }}
          />
          <h2 className={styles.movieTitle}>{props.movie.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Movie;
