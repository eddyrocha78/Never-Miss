
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";

export const UserProfile2 = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  const [comments, setComments] = useState([]);
  

  const [movies, setMovies] = useState({ watched: 0, watching: 0, planTo: 0 });
  const [moviesTime, setMoviesTime] = useState({ watched: 0, watching: 0, planTo: 0 });
  const [series, setSeries] = useState({ watched: 0, watching: 0, planTo: 0 });
  const [seriesTime, setSeriesTime] = useState({ watched: 0, watching: 0, planTo: 0 });
  const [added, setAdded] = useState(false);
  const [addedCom, setAddedCom] = useState(false);


  useEffect(() => {
    if (store.comments !== null && comments == "") {
      let resp = store.comments;
      resp.map((_, index) => {
            if (resp[index].userId == store.userId) {
            setComments((comments) => comments.concat(resp[index]))
          }
      })
  
    }
  }, [store.comments])


  useEffect(() => {
    if (store.userId != "" && store.userId != null) {
      actions.getFavorites(store.userId)
      actions.getAllComments();
    }
  }, [store.userId]);

  useEffect(() => {
    if (store.userFavorites != "" && store.userFavorites != null) {
      setFavorites(store.userFavorites);
    }
  }, [store.userFavorites]);

  useEffect(() => {
    if (favorites != "" && favorites != null && added == false) {
      addStatusNumbers();
    }
  }, [favorites]);


  useEffect(() => {
    if (store.token && store.token != "" && store.token != null) { actions.getMessage(); }
  }, [store.token])

  const addStatusNumbers = () => {
    setAdded(true);
    favorites.map((_, index) => {
      if (favorites[index].movieId !== undefined) {
        if (favorites[index].status == "watched") {
          let updatedWatched = movies;
          updatedWatched.watched += 1;
          setMovies(updatedWatched);
          let updatedWatchedT = moviesTime;
          updatedWatchedT.watched += favorites[index].runtime;
          setMoviesTime(updatedWatchedT);
        }
        else if (favorites[index].status == "watching") {
          let updatedWatching = movies;
          updatedWatching.watching += 1;
          setMovies(updatedWatching);
          let updatedWatchingT = moviesTime;
          updatedWatchingT.watching += favorites[index].runtime;
          setMoviesTime(updatedWatchingT);
        }
        else if (favorites[index].status == "planToWatch") {
          let updatedPlanToWatch = movies;
          updatedPlanToWatch.planTo += 1;
          setMovies(updatedPlanToWatch);
          let updatedPlanToT = moviesTime;
          updatedPlanToT.planTo += favorites[index].runtime;
          setMoviesTime(updatedPlanToT);
        }
      }
      else if (favorites[index].movieId !== null || favorites[index].movieId !== undefined) {
        if (favorites[index].status == "watched") {
          let updatedWatched = series;
          updatedWatched.watched += 1;
          setSeries(updatedWatched);
          let updatedWatchedT = seriesTime;
          updatedWatchedT.watched += favorites[index].runtime;
          setSeriesTime(updatedWatchedT);
        }
        else if (favorites[index].status == "watching") {
          let updatedWatching = series;
          updatedWatching.watching += 1;
          setSeries(updatedWatching);
          let updatedWatchingT = seriesTime;
          updatedWatchingT.watching += favorites[index].runtime;
          setSeriesTime(updatedWatchingT);
        }
        else if (favorites[index].status == "planToWatch") {
          let updatedPlanToWatch = series;
          updatedPlanToWatch.planTo += 1;
          setSeries(updatedPlanToWatch);
          let updatedWatchingT = seriesTime;
          updatedWatchingT.watching += favorites[index].runtime;
          setSeriesTime(updatedWatchingT);
        }
      }
    })
  }




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
                    Series: {series.watching}<br></br>
                    Total Time {moviesTime.watching + seriesTime.watching} :  Minutes
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
                    Total Time {moviesTime.watched + seriesTime.watched} :  Minutes
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
                    Total Time {moviesTime.planTo + seriesTime.planTo}: Minutes
                  </div >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col ms-1 rounded mb-5" style={{ color: "rgba(225, 225, 225, 1)", backgroundColor: "rgba(37, 53, 37, 1)" }}>
          <div className="col-md-12">
            <div className="header d-inline-flex align-items-center p-2">
              <h4>My Comments</h4>
            </div>
            </div>
            {Object.values(comments).length > 0 ?
            comments.map((_, index) => (
											<div onClick={() => {navigate("/"+ comments[index].target_type +"/details/"+ comments[index].target_id)}} style={{ backgroundColor: "rgba(82, 117, 82, 1)" }}className="offset-md-1 col-10 rounded justify-content-center text-white my-2 p-1 " key={index}>
												<div className="row rounded justify-content-center">
													<div style={{ backgroundColor: "rgba(39, 76, 39, 1)" }} className="col-10 rounded text-start">
														<p className="h4 mt-2 fw-bold">{comments[index].target_type == "movie" ? "Comment on a Movie" : "Comment on a Series"}</p>
													</div>
												</div>
												<div className="row justify-content-center  text-start">
													<div className="col-10 py-2 d-flex flex-wrap overflow-auto">
														<p className="text-center" >{comments[index].text}</p>
													</div>
												</div>
											</div>
										))
                  : null}
          </div>
        </div>
      </div>
  );
};
