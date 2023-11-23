import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
//import { Link } from "react-router-dom";




export const CardFavorite = ({ title, imgpath, runtime, theid, type, userId, status }) => {
  const { store, actions } = useContext(Context);

  const removeFavorite = () => {
    if (store.token && store.token != "" && store.token != null) {
      actions.deleteFavorite(userId, theid, type);
      window.location.reload();
    }
  }

  const updateFavorite = (status) => {
    if (store.token && store.token != "" && store.token != null) {
      actions.updateFavorite(userId, theid, type, status);
      window.location.reload();
    }
  }

  const imageUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + imgpath;

  return (
    <div style={{ background: "rgba(82, 117, 82, 1)" }} className="favorite-card m-2 p-1 d-flex rounded">
      <div className="col-3 d-flex flex-column">
      <img src={imageUrl} className="img-fluid sizer rounded" alt={title} />
      </div>
      <div className="col-9 d-flex flex-column">
        <h2 className="title ms-2">{title}</h2>
        <p className="runtime ms-2">{runtime} minutes</p>
        {status == "watching" ?
          <div className="d-flex flex-column mt-4">
            <button className="btn btn-dark dropdown-toggle align-text-bottom align-self-end mt-auto" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-solid fa-eye fa-lg me-3 text-success"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
              <li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { removeFavorite() }}><i className="fa-solid fa-trash ms-1 fa-lg me-3 text-danger"></i>Remove</button></li>
              <li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watched") }}><i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Change to Watched</button></li>
              <li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("planToWatch") }}><i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>Change to Plan to Watch</button></li>
            </ul>
          </div>
          :
          status == "watched" ?
            <div className="d-flex flex-column mt-4">
              <button className="btn btn-dark dropdown-toggle align-text-bottom align-self-end mt-auto" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                <li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { removeFavorite() }}><i className="fa-solid fa-trash ms-1 fa-lg me-3 text-danger"></i>Remove</button></li>
                <li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watching") }}><i className="fa-solid fa-eye fa-lg me-3 text-success"></i>Change to Watching</button></li>
                <li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("planToWatch") }}><i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>Change to Plan to Watch</button></li>
              </ul>
            </div>
            :
            status == "planToWatch" ?
              <div className="d-flex flex-column mt-4">
                <button className="btn btn-dark dropdown-toggle align-text-bottom align-self-end mt-auto" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                  <li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { removeFavorite() }}><i className="fa-solid fa-trash ms-1 fa-lg me-3 text-danger"></i>Remove</button></li>
                  <li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watching") }}><i className="fa-solid fa-eye fa-lg me-3 text-success"></i>Change to Watching</button></li>
                  <li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watched") }}><i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Change to Watched</button></li>
                </ul>
              </div>
              :
              <div>

              </div>}
      </div>
    </div>
  );
};
