import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
//import { Link } from "react-router-dom";




export const CardFavorite = ({ title, imgpath, runtime }) => {
  const { store, actions } = useContext(Context);

const removeFavorite = () => {
  if (store.token && store.token != "" && store.token != null) {
    actions.deleteFavorite(store.userId, params.theid, params.type)
    window.location.reload();
  }
}

const updateFavorite = (status) => {
  if (store.token && store.token != "" && store.token != null) {
    actions.updateFavorite(store.userId, params.theid, params.type, status)
    window.location.reload();
  }
}

  const imageUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + imgpath;

  return (
    <div style={{ background: "rgba(82, 117, 82, 1)" }} className="favorite-card m-2 p-1 d-flex rounded">
      <div className="col-3">
        <img src={imageUrl} className="img-fluid sizer" alt={title} />
      </div>
      <div className="col-9 d-flex flex-column">
        <h2 className="title">{title}</h2>
        <p className="runtime">{runtime} minutes</p>
        <button className="btn dropdown-toggle align-text-bottom align-self-end mt-auto" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fa-solid fa-eye fa-lg text-success-emphasis"></i>
        </button>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
          <li><button className="dropdown-item " type="button" onClick={() => { removeFavorite() }}><i className="fa-solid fa-trash ms-1 fa-lg me-3 text-danger"></i>Remove</button></li>
          <li><button className="dropdown-item " type="button" onClick={() => { updateFavorite("watched") }}><i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Change to Watched</button></li>
          <li><button className="dropdown-item " type="button" onClick={() => { updateFavorite("planToWatch") }}><i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>Change to Plan to Watch</button></li>
        </ul>
      </div>
    </div>
  );
};
