import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router';
import './MovieDetails.css';

const MovieDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const movie_id = location.state;

  const [movies, setMovies] = useState([]);
  const api = `https://yts.mx/api/v2/movie_details.json?movie_id=${movie_id}`;

  const fetchMovie = () => {
    axios
      .get(api)
      .then((res) => {
        setMovies(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [suggestions, setSuggestions] = useState([]);
  const suggestMovies = () => {
    axios
      .get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movie_id}`)
      .then((res) => {
        setSuggestions(res.data.data.movies);
      })
      .catch((error) => {
        alert("error");
      });
  };
  useEffect(() => {
    fetchMovie();
    suggestMovies();
  }, []);
  console.log(suggestions);
  return (
    <>
      {movies.movie !== undefined && (
        <section className="movie__wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${movies.movie.yt_trailer_code}`}
            frameborder="0"
            className="trailer__movie"
          ></iframe>

          <article className="context__movie">
            <div
              className="image__movie"
              style={{
                backgroundImage: `url(${movies.movie.medium_cover_image})`,
              }}
            ></div>

            <div className="info__movie">
              <h2 className="title__movie">{movies.movie.title}</h2>

              <p className="rating__movie">Rating : {movies.movie.rating}</p>
              <ul className="gener__movie">
                Genre:{" "}
                {movies.movie.genres.map((genre) => {
                  return <li className="list__genre">{genre}</li>;
                })}
              </ul>
              <p className="duration__movie">
                Duration: {movies.movie.runtime}min
              </p>

              <p className="desc__movie">
                Descripiton: {movies.movie.description_full}
              </p>

              <ul className="links__movie">
                Torren Links:{" "}
                {movies.movie.torrents.map((torren) => {
                  return (
                    <div>
                      <a href={torren.url} className="url__links">
                        {torren.url}
                      </a>
                      <div className="info__links">
                        <p>Quality:{torren.quality}</p>
                        <p>Size{torren.size}</p>
                      </div>
                    </div>
                  );
                })}
              </ul>

              <div className="buttons__movie">
                <button className="subbutton">Add to WatchList</button>
                <button className="subbutton">Mark as Watched</button>
              </div>
            </div>
          </article>
        </section>
      )}

      <div className="suggestions">
        <h1>Suggestions</h1>
        <div className="second">
          {suggestions.map((suggest) => {
            return (
              <div className="item__second">
                <img
                  src={suggest.medium_cover_image}
                  className="movieImage__second"
                />
                <h3>Movie Name:{suggest.title}</h3>
                <p>Rating:{suggest.rating}</p>
                <p>Genre:{suggest.genres}</p>
                <p>Duration:{suggest.runtime} minutes</p>
                <p>Full Description:{suggest.description_full}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;