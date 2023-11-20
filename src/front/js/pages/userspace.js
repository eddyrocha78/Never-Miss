
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { CardFavorite } from "../component/CardFavorite";
import { Link, useParams, useNavigate } from "react-router-dom";


export const UserSpace = () => {
  const { store, actions } = useContext(Context);
  const [info, setInfo] = useState([]);


  let sessiontoken = sessionStorage.getItem("token")

  const navigate = useNavigate();

  useEffect(() => {
    actions.getFavorites(store.userId);

  }, [store.userId]);
  console.log("favoritos", store.userFavorites);
  return (
    <div className="container-fluid">
      <div className="row text-center my-5">
        <h1 className="text-white display-1 fw-bold">{store.userName} {store.userLastName} Space</h1>
      </div>

      <div className="content-wrapper container">
        <div className="row justify-content-center">
          <div className="currently-watching rounded col-md-5 pe-2 mb-2" style={{ color: "rgba(225, 225, 225, 1)", backgroundColor: "rgba(37, 53, 37, 1)" }}>
            <div className="header container-fluid py-2 d-inline-flex align-items-center">
              <i className="fa-solid fa-eye fa-lg ms-1 me-3 text-success"></i>
              <h4>Currently Watching</h4>
              {store.userfavorites.map((key, index) => <CardFavorite title={index.title} />)}
            </div>
            <div className="Movies-wrapper">
             
            </div>
          </div>


            <div className="col-md-5">
              <div className="plan-to-watch row ms-1 rounded mb-2" style={{ color: "rgba(225, 225, 225, 1)", backgroundColor: "rgba(37, 53, 37, 1)" }}>
                <div className="col">
                  <div className="header d-inline-flex py-2 align-items-center">
                    <i className="fa-solid fa-eye fa-lg ms-1 me-3 text-primary"></i>
                    <h4>Plan to Watch</h4>
                  </div>
                  <div style={{ overflowX: "scroll", backgroundColor: "black" }} className="container-fluid plan-to-watch rounded mb-1">
                    {/* plan to watch list*/}
                    1. movie<br></br>
                    2. Serie
                  </div>
                </div>
              </div>

              <div className="completed row ms-1 rounded mb-2" style={{ color: "rgba(225, 225, 225, 1)", backgroundColor: "rgba(37, 53, 37, 1)" }}>
                <div className="col">
                  <div className="header d-inline-flex align-items-center py-2 ">
                    <i className="fa-solid fa-eye fa-lg ms-1 me-3 text-secondary"></i>
                    <h4>Completed</h4>
                  </div>
                  <div style={{ overflowX: "scroll", backgroundColor: "black" }} className="container-fluid completed rounded d-flex flex-row mb-1">
                    {/* plan to watch list*/}
                    1. movie<br></br>
                    2. Serie
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
};
