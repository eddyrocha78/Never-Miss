
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { CardFavorite } from "../component/CardFavorite";
import { Link, useParams, useNavigate } from "react-router-dom";

export const UserSpace = () => {
  const { store, actions } = useContext(Context);

	useEffect(() => {
		if(store.token && store.token !="" && store.token !=null) actions.getMessage();
	}, [store.token])

	let sessiontoken = sessionStorage.getItem("token")
  
  const navigate = useNavigate();

  //const [search, setSearch] = useState("");

  //const [movieinfo, setmovieInfo] = useState({ results: [] });
  //const [seriesinfo, setseriesInfo] = useState({ results: [] });
  //const [movietrending, setmovietrending] = useState({ results: [] });
 
  /*const [watchingMovie, setWatchingMovie] = useState({ results: [] });
  const [watchingSeries, setWatchingSeries] = useState({ results: [] });
  const [watched, setWatched] = useState({ results: [] });
  const [plantWatch, setPlanWatch] = useState({ results: [] });*/


  /*useEffect(() => {
    const fetchmovieData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzljNWIzNDBiM2I5OGE3ZGZiMzlkYTJlOTc3YzE2MyIsInN1YiI6IjY1Mzk1YjgzZWM0NTUyMDEyYzE5YjFiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G6LQ-ee_CUMn2WrqGLxrFZ_mjfkw2opm3iX8NIMm_ww",
            },
          }
        );
        const data = await response.json();
        setmovieInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchseriesData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzljNWIzNDBiM2I5OGE3ZGZiMzlkYTJlOTc3YzE2MyIsInN1YiI6IjY1Mzk1YjgzZWM0NTUyMDEyYzE5YjFiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G6LQ-ee_CUMn2WrqGLxrFZ_mjfkw2opm3iX8NIMm_ww",
            },
          }
        );
        const data = await response.json();
        setseriesInfo(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchseriesData();
    fetchmovieData();
  }, []);*/


  return (
    <div className="container-fluid">
      <div className="row text-center my-5">
        <h1 className="text-white display-1 fw-bold">{store.user.firstName} {store.user.lastName} Space</h1>
      </div>
      
      <div className="content-wrapper container">
        <div  className="row justify-content-center">
          <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="currently-watching rounded col-md-5 pe-2 mb-2">
            <div className="header container-fluid d-inline-flex align-items-center">
              <i className="fa-solid fa-eye fa-lg ms-1 me-3 text-success"></i>
              <h4>Currently Watching</h4>
            </div>
            <div className="Movies-wrapper">
              <CardFavorite />
            </div>
          </div>
        
        
          <div className="col-md-5">  
            <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="plan-to-watch row ms-1 rounded mb-2">
              <div className="col">
                <div className="header d-inline-flex align-items-center">
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
          
            <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="completed row ms-1 rounded mb-2">
              <div className="col">
                <div className="header d-inline-flex align-items-center">
                  <i className="fa-solid fa-eye fa-lg ms-1 me-3 text-secondary"></i>
                  <h4>Completed</h4>
                </div>
                <div style={{ overflowX: "scroll", backgroundColor: "black" }} className="completed rounded d-flex flex-row mb-1">
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
