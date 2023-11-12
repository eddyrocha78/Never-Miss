import React from "react";
//import { Link } from "react-router-dom";

export const CardFavorite = ({ imgpath, title, release_date, runtime, genres }) => {
  const url = 'https://image.tmdb.org/t/p/w100_and_h150_bestv2' + imgpath;

  return (
    <div className="container">
      <div className="card mb-3 me-1 container-fluid" style={{ height: "100px", width: "auto" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={url} className="img-fluid rounded-start" alt={title}/>
          </div>
          <div className="col-md-8 text-start">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text"><small>Release Date {release_date} | Duration {runtime} min | Genre {genres}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
