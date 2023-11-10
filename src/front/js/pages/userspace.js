
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
  }, []);

  const newSearch = (newS) => {
    if (newS.trim() === "") {
			alert("Search cannot be empty");
    }
    else{
      navigate("/search/" + newS + "/1");
      window.location.reload();
    }
  }*/

  return (
    <div className="container-fluid">
      <div className="row text-center mt-5">
        <h1 className="text-white display-1 fw-bold">{store.user.firstName} {store.user.lastName} Space</h1>
      </div>
      
      
      
      <div className="row my-5">
        <div className="col">
          <div
            style={{ backgroundColor: "rgba(37, 53, 37, 1)" }}
            className="row mx-5 rounded"
          >
            <div className="row">
              <h1 className="mx-5 mt-2 text-decoration-underline text-white">
                Currently Watching
              </h1>
            </div>
            <div className="p-3">
              <div style={{ overflowX: "scroll" }} className="d-flex flex-row">
                {/*insert list of currently watching*/}
              </div>
            </div>
          </div>
          <div
            style={{ backgroundColor: "rgba(37, 53, 37, 1)" }}
            className="row mx-5 mt-5 rounded"
          >
            <div className="row">
              <h1 className="mx-5 mt-2 text-decoration-underline text-white">
                Plan to Watch
              </h1>
            </div>
            <div className="p-3">
              <div style={{ overflowX: "scroll" }} className="d-flex flex-row">
                {/*insert list of plan to watch*/}
              </div>
            </div>
            <div className="row">
              <h1 className="mx-5 mt-2 text-decoration-underline text-white">
                Watched
              </h1>
            </div>
            <div className="p-3">
              <div style={{ overflowX: "scroll" }} className="d-flex flex-row">
                {/*insert list of watched*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
