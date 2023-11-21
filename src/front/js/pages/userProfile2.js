
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";

export const UserProfile2 = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  const [movies, setMovies] = useState({ watched: 0, watching: 0,  planTo: 0});
  const [series, setSeries] = useState({ watched: 0, watching: 0,  planTo: 0});
  const [added, setAdded] = useState(false);



  /*const [watched, setWatched] = useState({ series: 0, movies: 0 });
  const [watchedTime, setWatchedTime] = useState({ series: 0, movies: 0 });
  const [watching, setWatching] = useState({ series: 0, movies: 0 });
  const [watchingTime, setWatchingTime] = useState({ series: 0, movies: 0 });
  const [planTo, setPlanTo] = useState({ series: 0, movies: 0 });
  const [planToTime, setPlanToTime] = useState({ series: 0, movies: 0 });*/



  useEffect(() => {
    if (store.userId != "" && store.userId != null) {
      actions.getFavorites(store.userId)
    }
  }, [store.userId]);

  useEffect(() => {
    if (store.userFavorites != "" && store.userFavorites != null) {
      console.log(store.userFavorites);
      setFavorites(store.userFavorites);
    }
  }, [store.userFavorites]);

  useEffect(() => {
    if (favorites != "" && favorites != null && added == false) {
      addNumbers();
    }
  }, [favorites]);


  useEffect(() => {
    if (store.token && store.token != "" && store.token != null) { actions.getMessage(); }
  }, [store.token])

  const addNumbers = () => {
    setAdded(true);
    favorites.map((_, index) => {
      if (favorites[index].movieId !== undefined) {
        if (favorites[index].status == "watched") {
          let updatedWatched = movies;
          updatedWatched.watched += 1;
          setMovies(updatedWatched)
        }
        else if (favorites[index].status == "watching") {
        let updatedWatching = movies;
        updatedWatching.watching += 1;
        setMovies(updatedWatching)
        }
        else if (favorites[index].status == "planToWatch") {
          let updatedPlanToWatch =  movies;
          updatedPlanToWatch.planTo += 1;
          setMovies(updatedPlanToWatch)
        }
      }
      else if (favorites[index].movieId !== null || favorites[index].movieId !== undefined) 
      {
        if (favorites[index].status == "watched") {
          let updatedWatched = series;
          updatedWatched.watched += 1;
          setSeries(updatedWatched)
        }
        else if (favorites[index].status == "watching") {
        let updatedWatching = series;
        updatedWatching.watching += 1;
        setSeries(updatedWatching)
        }
        else if (favorites[index].status == "planToWatch") {
          let updatedPlanToWatch =  series;
          updatedPlanToWatch.planTo += 1;
          setSeries(updatedPlanToWatch)
        }
      }
    })
  }


  const handleClick = () => {
  };


  return (
    <div className="container">
      <div className="row my-3" style={{ color: "{rgba(225, 225, 225, 1)" }}>
        <h1 className="text-white display-1 fw-bold text-center">{store.userName} {store.userLastName} Profile</h1>
      </div>
      <div className="row">
        <div className="col-md-6 ps-1">
          <div className="text-white col-md-7 rounded-circle p-3 my-5 mx-auto" style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} >
            <div className="text-center">
              <img className="img-fluid" src="https://static.thenounproject.com/png/3911675-200.png" alt="User Avatar" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 rounded my-5" style={{ color: "rgba(225, 225, 225, 1)", backgroundColor: "rgba(37, 53, 37, 1)" }}>
          <div className="header pt-2">
            <h4 className="p-2 text-center">Statistics</h4>
            <div className="p-2">
              <div style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} className="row rounded ps-1">
                <div className="col-md-4 align-self-center">
                  <h4 className="ms-2">Watching</h4>
                </div>
                <div className="col-md-7 py-2">
                  <div className="fs-6 text-start mt-2">
                    Movies: {movies.watching} |
                    Series: {series.planTo}<br></br>
                    Total Time :  Minutes
                  </div >
                </div>
              </div>
              <div style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} className="row mt-2 rounded ps-1">
                <div className="col-md-4 align-self-center">
                  <h4 className="ms-2">Watched</h4>
                </div>
                <div className="col-md-7 py-2">
                  <div className="fs-6 text-start mt-2">
                    Movies: {movies.watched} |
                    Series: {series.watched}<br></br>
                    Total Time :  Minutes
                  </div >
                </div>
              </div>
              <div style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} className="row mt-2 rounded ps-1">
                <div className="col-md-4 align-self-center ">
                  <h4 className="ms-2">Plan to Watch</h4>
                </div>
                <div className="col-md-7 py-3">
                  <div className="fs-6 text-start mt-2" >
                    Movies: {movies.planTo} |
                    Series: {series.planTo}<br></br>
                    Total Time : Minutes
                  </div >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* my comments div*/}
      <div className="row">
        <div className="col ms-1 rounded mb-5" style={{ color: "rgba(225, 225, 225, 1)", backgroundColor: "rgba(37, 53, 37, 1)" }}>
          <div className="col-md-12">
            <div className="header d-inline-flex align-items-center pt-2">
              <h4>My Comments</h4>
            </div>
            <div className="completed rounded d-flex flex-row ps-1 mb-1" style={{ overflowX: "scroll", backgroundColor: "black", }}>
              1. movie<br></br>
              2. Serie
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
