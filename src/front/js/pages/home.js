
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/Card";
import { List } from "../component/List";
import { Link, useParams, useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

	useEffect(() => {
		if(store.token && store.token !="" && store.token !=null)
    {
      actions.getMessage();
      console.log(store.token)
    }
    
	}, [store.token])
  
  let sessiontoken = sessionStorage.getItem("token")

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [movieinfo, setmovieInfo] = useState({ results: [] });
  const [seriesinfo, setseriesInfo] = useState({ results: [] });
  const [movietrending, setmovietrending] = useState({ results: [] });

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
    else {
      navigate("/search/" + newS + "/1");
      window.location.reload();
    }
  }

  return (
    <div className="container-fluid">
      <div className="row text-center mt-5">
        <h1 className="text-white display-1 fw-bold">Never Miss</h1>
      </div>
      <div className="row text-center mt-5">
        <h1 className="text-white-50 display-4">
          Look up your favorite movie or series now!
        </h1>
      </div>
      <div className="row text-center justify-content-center mt-5 mx-5">
        <div className="col-8">
          <input style={{ borderColor: "rgba(37, 53, 37, 1)" }}
            className="form-control form-control-lg text-start border-5" onKeyDown={(e) => { e.key == "Enter" ? newSearch(search) : null }} dir="auto" id="inner_search_v4"
            name="query" type="text" tabIndex="1" autoCorrect="off" autofill="off" autoComplete="off" placeholder="Search for a movie or tv show "
            value={search}
            onChange={(e) => { setSearch(e.target.value) }} />
        </div>
        <div className="col-2 d-grid gap-2 p-0">
          <button className="btn btn-success fs-4 p-0" onClick={() => { newSearch(search) }} >Search <i className="fa-solid fa-magnifying-glass fa-rotate-90 fa-sm"></i></button>
        </div>
      </div>
      {store.token && store.token !="" && store.token !=null?
      <div className="row text-center my-5">
      <h1 className="text-white-50 display-4">
          Welcome back {store.userName} {store.userLastName} 
        </h1>
        </div>
        :
      <div className="row text-center my-5">
        <h1 className="text-white-50 display-4">
          Subscribe to never miss a thing
        </h1>
      </div>}
      <div className="row my-5">
        <div className="col">
          <div
            style={{ backgroundColor: "rgba(37, 53, 37, 1)" }}
            className="row mx-5 rounded"
          >
            <div className="row">
              <h1 className="mx-5 mt-2 text-decoration-underline text-white">
                Popular Movies
              </h1>
            </div>
            <div className="p-3">
              <div style={{ overflowX: "scroll" }} className="d-flex flex-row">
                {movieinfo.results &&
                  movieinfo.results.map((data, index) => (
                    <Link key={index} className="text-start text-decoration-none text-light" to={"/movie/details/" + data.id}>
                      <Card
                        imgpath={data.poster_path}
                        title={data.original_title}
                        description={data.overview}
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div
            style={{ backgroundColor: "rgba(37, 53, 37, 1)" }}
            className="row mx-5 mt-5 rounded"
          >
            <div className="row">
              <h1 className="mx-5 mt-2 text-decoration-underline text-white">
                Popular Series
              </h1>
            </div>
            <div className="p-3">
              <div style={{ overflowX: "scroll" }} className="d-flex flex-row">
                {seriesinfo.results &&
                  seriesinfo.results.map((data, index) => (
                    <Link key={index} className="text-start text-decoration-none text-light" to={"/tv/details/" + data.id}>
                      <Card
                        imgpath={data.poster_path}
                        title={data.name}
                        description={data.overview}
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
