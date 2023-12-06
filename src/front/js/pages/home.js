
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/Card";
import { List } from "../component/List";
import { Link, useParams, useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != null) {
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
                "Bearer " + process.env.MOVIE_API_TOKEN,
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
                "Bearer " + process.env.MOVIE_API_TOKEN,
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
      <div className="row text-center my-5">
        <h1 className="text-white display-1 fw-bold">Never Miss</h1>
      </div>
      <div className="row Filler text-center my-md-5">
        <div className="my-md-3 col-12"></div>
      </div>
      <div className="row py-lg-5 px-1 py-4 text-center justify-content-center mt-5 m-5 rounded" style={{ backgroundColor: "rgba(37, 53, 37, 1)" }}>
        <h1 className="text-white mb-md-5 h1">
          Look up your favorite movie or series now!
        </h1>
        <div className="mx-md-5 my-5">
          <div className="input-group">
            <input style={{ borderColor: "rgba(37, 53, 37, 1)", height: "80px" }}
              className="form-control form-control-lg text-start border-5" onKeyDown={(e) => { e.key == "Enter" ? newSearch(search) : null }} dir="auto" id="inner_search_v4"
              name="query" type="text" tabIndex="1" autoCorrect="off" autofill="off" autoComplete="off" placeholder="Search for a movie or tv show "
              value={search}
              onChange={(e) => { setSearch(e.target.value) }} aria-describedby="basic-addon2" />
            <button style={{ height: "80px" }} className="input-group-text btn btn-success fs-4" id="basic-addon2" onClick={() => { newSearch(search) }} >Search <i className="fa-solid fa-magnifying-glass fa-rotate-90 fa-sm"></i></button>
          </div>
        </div>
      </div>
      {store.token && store.token != "" && store.token != null ?
        <div className="row text-center my-5">
          <h1 className="text-white display-4">
            Welcome back {store.userName} {store.userLastName}
          </h1>
        </div>
        :
        <div className="row text-center my-5" onClick={() => { navigate("/login") }}>
          <p className="mb-0 display-5 text-light text-decoration-none"><a href="/signup" className="display-5" >Sign Up</a> to NEVER MISS a thing</p>
        </div>}
      <div className="row justify-content-center">
        <div className="col-12">
          <div
            style={{ backgroundColor: "rgba(37, 53, 37, 1)" }}
            className="row mx-lg-5 text-center rounded"
          >
            <div className="row justify-content-center">
              <h1 className="ms-5 text-lg-start mt-2 text-decoration-underline text-white">
                Popular Movies
              </h1>
            </div>
            <div className="py-3">
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
            className="row my-5 mx-lg-5 text-center rounded"
          >
            <div className="row justify-content-center">
              <h1 className="ms-5 text-lg-start mt-2 text-decoration-underline text-white">
                Popular Series
              </h1>
            </div>
            <div className="py-3">
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
