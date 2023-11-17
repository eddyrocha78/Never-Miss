
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";

export const UserProfile2 = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState({ series: 0, movies: 0 });
  const [watchedTime, setWatchedTime] = useState({ series: 0, movies: 0 });
  const [watching, setWatching] = useState({ series: 0, movies: 0 });
  const [watchingTime, setWatchingTime] = useState({ series: 0, movies: 0 });
  const [planTo, setPlanTo] = useState({ series: 0, movies: 0 });
  const [planToTime, setPlanToTime] = useState({ series: 0, movies: 0 });



  useEffect(() => {
    if (store.userId != "" && store.userId != null) {
      actions.getFavorites(store.userId)
    }
  }, [store.userId]);

  useEffect(() => {
    if (sessionStorage.getItem("email") !== "") {
      actions.login(sessionStorage.getItem("email"), sessionStorage.getItem("password"));
      sessionStorage.setItem("email", "");
      navigate("/userspace")
    }
  }, []);

  useEffect(() => {
    if (store.userFavorites != "" && store.userFavorites != null) {
      console.log(store.userFavorites);
      setFavorites(store.userFavorites);
    }
  }, [store.userFavorites]);

  useEffect(() => {
    if (store.userFavorites != "" && store.userFavorites != null) {
      addNumbers();
    }
  }, [favorites]);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != null) { actions.getMessage(); }
  }, [store.token])

  const addNumbers = () => {
    favorites.map((_, index) => {
      if (favorites[index].seriesId !== undefined) {
        if (favorites[index].status == "watched") {
          const updatedWatched = watched;
          updatedWatched.series += 1;
          const updateTime = watchedTime;
          updateTime.series += favorites[index].runtime
          setWatchedTime(updateTime);
          setWatched(updatedWatched);
        }
        else if (favorites[index].status == "watching") {
          const updatedWatching = watching;
          updatedWatching.series += 1;
          const updateTime = watchingTime;
          updateTime.series += favorites[index].runtime
          setWatchingTime(updateTime);
          setWatching(updatedWatching);

        }
        else if (favorites[index].status == "planToWatch") {
          const updatedPlanToWatch = planTo;
          updatedPlanToWatch.series += 1;
          const updateTime = planToTime;
          updateTime.series += favorites[index].runtime
          setPlanToTime(updateTime);
          setPlanTo(updatedPlanToWatch);
        }
      }
      else if (favorites[index].movieId !== null || favorites[index].movieId !== undefined) {

        if (favorites[index].status == "watched") {
          const updatedWatched = watched;
          updatedWatched.movies += 1;
          const updateTime = watchedTime;
          updateTime.movies += favorites[index].runtime
          setWatchedTime(updateTime);
          setWatched(updatedWatched);
        }
        else if (favorites[index].status == "watching") {
          const updatedWatching = watching;
          updatedWatching.movies += 1;
          const updateTime = watchingTime;
          updateTime.movies += favorites[index].runtime
          setWatchingTime(updateTime);
          setWatching(updatedWatching);

        }
        else if (favorites[index].status == "planToWatch") {
          const updatedPlanToWatch = planTo;
          updatedPlanToWatch.movies += 1;
          const updateTime = planToTime;
          updateTime.movies += favorites[index].runtime
          setPlanToTime(updateTime);
          setPlanTo(updatedPlanToWatch);

        }

      }
    })
    console.log(watched);
    console.log(watching);
    console.log(planTo);
  }

  let sessiontoken = sessionStorage.getItem("token")


  const handleClick = () => {
    if (firstName.trim() === "" || lastName.trim() === "" || password.trim() === "") {
      alert("Inputs cannot be empty")
    } else {
      if(password ==  sessionStorage.getItem("password")){
        actions.editUser(store.userId, firstName, lastName);
        actions.logout();
        sessionStorage.setItem("email", store.userEmail);
        sessionStorage.setItem("password", password);
        window.location.reload();
      }else{
        alert("Wrong password")
      }
    }
  };


  return (
    <div className="container">
      <div className="row my-3" style={{ color: "{rgba(225, 225, 225, 1)" }}>
        <h1 className="text-white display-1 fw-bold text-center">{store.userName} {store.userLastName} Profile</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">

            <div className="text-white col-md-7 rounded-circle p-3 my-5 mx-auto" style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} >
              <div className="text-center">
                <img className="img-fluid" src="https://static.thenounproject.com/png/3911675-200.png" alt="User Avatar" style={{ width: "100%" }} />
              </div>
            </div>
            <div className="d-grid gap-2">
              <div className="mb-3">
                <input type="text" className="form-control" name="firstName" aria-label="Example text with button addon" onChange={(e) => { setFirstname(e.target.value) }} placeholder={store.userName} />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="lastName" placeholder={store.userLastName} aria-label="Example text with button addon" onChange={(e) => { setLastName(e.target.value) }} />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" placeholder="re-enter password" aria-label="Example text with button addon" onChange={(e) => { setPassword(e.target.value) }} />
              </div>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={handleClick}>Save Changes</button>
            </div>
          </div>


          {/* Statistics div*/}
          <div className="col-md-6 rounded mb-2" style={{ color: "rgba(225, 225, 225, 1)", backgroundColor: "rgba(37, 53, 37, 1)" }}>
            <div className="header pt-2">
              <h1 className="p-2 text-center">Statistics</h1>
              <div className="p-2">
                <div style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} className="row rounded  ps-1">
                  <div className="col-4 align-self-center">
                    <h2 className="ms-2">Watching</h2>
                  </div>
                  <div className="col-7">
                    <p className="fs-4 text-center mt-2">Movies: {watching.movies} | Series: {watching.movies}</p >
                    <p className="fs-4 text-center mt-2">Total Time : {watchingTime.series + watchingTime.movies} Minutes</p >
                  </div>
                </div>
                <div style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} className="row mt-5 rounded  ps-1">
                  <div className="col-4 align-self-center">
                    <h2 className="ms-2">Watched</h2>
                  </div>
                  <div className="col-7">
                    <p className="fs-4 text-center mt-2">Movies: {watched.movies} | Series: {watched.series}</p >
                    <p className="fs-4 text-center mt-2">Total Time : {watchedTime.series + watchedTime.movies} Minutes</p >
                  </div>
                </div>
                <div style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} className="row mt-5 rounded  ps-1">
                  <div className="col-4 align-self-center ">
                    <h3 className="ms-2">Plan to Watch</h3>
                  </div>
                  <div className="col-7">
                    <p className="fs-4 text-center mt-2">Movies: {planTo.movies} | Series: {planTo.series}</p >
                    <p className="fs-4 text-center mt-2">Total Time : {planToTime.series + planToTime.movies} Minutes</p >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* my comments div
        <div className="row">
          <div className="col ms-1 rounded mb-2">
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
        </div>*/}



      </div>

    </div>
  );
};
