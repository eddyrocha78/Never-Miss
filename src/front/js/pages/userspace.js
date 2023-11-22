
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { CardFavorite } from "../component/CardFavorite";
import { Link, useParams, useNavigate } from "react-router-dom";


export const UserSpace = () => {
  const { store, actions } = useContext(Context);
  const [info, setInfo] = useState([]);

  let sessiontoken = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== null) {
      actions.getMessage();
      console.log(store.token);
    }
  }, [store.token]);

  useEffect(() => {
    actions.getFavorites(store.userId);
  }, [store.userId]);

  console.log(store.userId);
  console.log("favoritos", store.userFavorites);
  return (
    <div className="container-fluid listagem">
      <div className="row text-center my-5">
        <h1 className="text-white display-1 fw-bold">{store.userName} {store.userLastName} Space</h1>
      </div>

      <div className="content-wrapper container">
        <div className="row justify-content-center">
          <div className="currently-watching rounded col-md-5 pe-2 mb-2" style={{ color: "rgba(225, 225, 225, 1)", backgroundColor: "rgba(37, 53, 37, 1)" }}>
            <div className="header container-fluid py-2 d-inline-flex align-items-center">
              <i className="fa-solid fa-eye fa-lg ms-1 me-3 text-success"></i>
              <h4>Watching</h4>
            </div>
            <div className="row">
              <div className="col">
                <h5 className="bg bg-dark rounded p-1 mx-1">Movies</h5>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {store.userFavorites.map((favorite, index) => (
                  (favorite.status === "watching" && favorite.movieId) ?
                    (
                      <Link to={"/movie/details/" + favorite.movieId}>
                        <CardFavorite
                          key={index}
                          title={favorite.title}
                          imgpath={favorite.poster}
                          runtime={favorite.runtime}
                          userId={store.userId}
                          type={"movie"}
                          theid={favorite.movieId}
                          status={"watching"}
                        />
                      </Link>
                    ) : null
                ))}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h5 className="bg bg-dark rounded p-1 mx-1">Series</h5>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {store.userFavorites.map((favorite, index) => (
                  (favorite.status === "watching" && favorite.seriesId) ?
                    (
                      <Link key={index} to={"/tv/details/" + favorite.seriesId}>
                        <CardFavorite
                          key={index}
                          title={favorite.title}
                          imgpath={favorite.poster}
                          runtime={favorite.runtime}
                          userId={store.userId}
                          type={"tv"}
                          theid={favorite.seriesId}
                          status={"watching"}
                        />
                      </Link>
                    ) : null
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="plan-to-watch row ms-1 rounded mb-2" style={{ color: "rgba(225, 225, 225, 1)", backgroundColor: "rgba(26, 59, 86, 1)" }}>
              <div className="col">
                <div className="header d-inline-flex py-2 align-items-center">
                  <i className="fa-solid fa-eye fa-lg ms-1 me-3 text-primary"></i>
                  <h4>Plan to Watch</h4>
                </div>
                <div className="row">
                  <div className="col">
                    <h5 className="bg bg-dark rounded p-1 mx-1">Movies</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {store.userFavorites.map((favorite, index) => (
                      (favorite.status === "planToWatch" && favorite.movieId) ?
                        <Link key={index} to={"/movie/details/" + favorite.movieId}>
                          <CardFavorite
                            key={index}
                            title={favorite.title}
                            imgpath={favorite.poster}
                            runtime={favorite.runtime}
                            userId={store.userId}
                            type={"movie"}
                            theid={favorite.movieId}
                            status={"planToWatch"}
                          />
                        </Link>
                        : null
                    ))}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h5 className="bg bg-dark rounded p-1 mx-1">Series</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {store.userFavorites.map((favorite, index) => (
                      (favorite.status === "planToWatch" && favorite.seriesId) ?
                        <Link key={index} to={"/tv/details/" + favorite.seriesId}>
                          <CardFavorite
                            key={index}
                            title={favorite.title}
                            imgpath={favorite.poster}
                            runtime={favorite.runtime}
                            userId={store.userId}
                            type={"tv"}
                            theid={favorite.seriesId}
                            status={"planToWatch"}

                          />
                        </Link>
                        : null
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="completed row ms-1 rounded mb-2" style={{ color: "rgba(225, 225, 225, 1)", backgroundColor: "rgba(52, 59, 53, 1)" }}>
              <div className="col">
                <div className="header d-inline-flex align-items-center py-2 ">
                  <i className="fa-solid fa-eye fa-lg ms-1 me-3 text-secondary"></i>
                  <h4>Watched</h4>
                </div>
                <div className="row">
                  <div className="col">
                    <h5 className="bg bg-dark rounded p-1 mx-1">Movies</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {store.userFavorites.map((favorite, index) => (
                      (favorite.status === "watched" && favorite.movieId) ?
                        <Link key={index} to={"/movie/details/" + favorite.movieId}>
                          <CardFavorite
                            key={index}
                            title={favorite.title}
                            imgpath={favorite.poster}
                            runtime={favorite.runtime}
                            userId={store.userId}
                            type={"movie"}
                            theid={favorite.movieId}
                            status={"watched"}
                          />
                        </Link>
                        : null
                    ))}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h5 className= "bg bg-dark rounded p-1 mx-1">Series</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {store.userFavorites.map((favorite, index) => (
                      (favorite.status === "watched" && favorite.seriesId) ?
                        <Link key={index} to={"/tv/details/" + favorite.seriesId}>
                          <CardFavorite
                            key={index}
                            title={favorite.title}
                            imgpath={favorite.poster}
                            runtime={favorite.runtime}
                            userId={store.userId}
                            type={"tv"}
                            theid={favorite.seriesId}
                            status={"watched"}
                          />
                        </Link>
                        : null
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
