
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/Card";
import { List } from "../component/List";
import { Link, useParams, useNavigate } from "react-router-dom";

export const UserSpace = () => {
  const { store, actions } = useContext(Context);

	useEffect(() => {
		if(store.token && store.token !="" && store.token !=null) actions.getMessage();
	}, [store.token])

	let sessiontoken = sessionStorage.getItem("token")
  
  const navigate = useNavigate();

  //const [search, setSearch] = useState("");

  const [movieinfo, setmovieInfo] = useState({ results: [] });
  //const [seriesinfo, setseriesInfo] = useState({ results: [] });
  //const [movietrending, setmovietrending] = useState({ results: [] });
 
  /*const [watchingMovie, setWatchingMovie] = useState({ results: [] });
  const [watchingSeries, setWatchingSeries] = useState({ results: [] });
  const [watched, setWatched] = useState({ results: [] });
  const [plantWatch, setPlanWatch] = useState({ results: [] });*/


  useEffect(() => {
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
  }, []);

  const newSearch = (newS) => {
    if (newS.trim() === "") {
			alert("Search cannot be empty");
    }
    else{
      navigate("/search/" + newS + "/1");
      window.location.reload();
    }
  }

  return (
    <div className="container-fluid">
      <div className="row text-center mt-5">
        <h1 className="text-white display-1 fw-bold">{store.user.firstName} {store.user.lastName} Space</h1>
      </div>
      
      <div className="content-wrapper container">
        <div  className="row justify-content-center">
          <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="currently-watching mx-5 rounded col-md-5 pe-2">
            <div className="header">
              <h1>Currently Watching</h1>
              <span>Watching logo</span>
            </div>
            <div className="Movies-container">
              <Card />
            </div>
            <div className="Series-container">
              <Card />
            </div>
          </div>
        
        
          <div className="col-md-5">  
            <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="plan-to-watch row mx-5 rounded mb-2">
              <div className="col-md-5">
                <div className="header">
                  <h1>Plan to Watch</h1>
                  <span>Plan to Watch logo</span>
                </div>
                <div style={{ overflowX: "scroll" }} className="Plan-to-watch-container d-flex flex-row">
                  {/* plan to watch list*/}
                </div>
              </div>
            </div>
          
            <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="completed row mx-5 rounded mb-2">
              <div className="col-md-5">
                <div className="header">
                  <h1>Completed</h1>
                  <span>Completed logo</span>
                </div>
                <div className="Completed-container">
                {/* plan to watch list*/}
                </div>
              </div>
            </div>

          </div>

          
        </div>
      </div>
    </div>
  );
};
