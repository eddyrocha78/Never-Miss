
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";

export const UserProfile2 = () => {
  const { store, actions } = useContext(Context);
  const [isReadOnly1, setIsReadOnly1] = useState(false);
  const [isReadOnly2, setIsReadOnly2] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [added, setadded] = useState(false);
  const [watched, setWatched] = useState({series: 0 ,movies: 0});
  const [watching, setWatching] = useState({series: 0 ,movies: 0});
  const [planTo, setPlanTo] = useState({series: 0 ,movies: 0});



  useEffect(() => {
    if (store.userId != "" && store.userId != null) {
      actions.getFavorites(store.userId)
    }
  }, [store.userId]);

  useEffect(() => {
    if (store.userFavorites != "" && store.userFavorites != null) {
      console.log(store.userFavorites);
      setFavorites(store.userFavorites);
      addNumbers();
    }
  }, [store.userFavorites]);

  useEffect(() => {
    if (added == false && store.userFavorites != "" && store.userFavorites != null)
    {
      addNumbers();
    }
  }, [favorites]);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != null) actions.getMessage();
  }, [store.token])

  const addNumbers = () => {
      favorites.map((_, index) => {
        setadded(true);
        if (favorites[index].seriesId !== undefined) {
          if (favorites[index].status == "watched") {
            const updatedWatched = watched;
            updatedWatched.series += 1;
            setWatched(updatedWatched);
          }
          else if (favorites[index].status == "watching") {
            const updatedWatching = watching;
            updatedWatching.series += 1;
            updatedWatching.movies += 1;
            setWatching(updatedWatching);

          }
          else if (favorites[index].status == "planToWatch") {
            const updatedPlanToWatch = planTo;
            updatedPlanToWatch.series += 1;
            setPlanTo(updatedPlanToWatch);
          }
        }
        else if (favorites[index].movieId !== null || favorites[index].movieId !== undefined){

          if (favorites[index].status == "watched") {
            const updatedWatched = watched;
            updatedWatched.movies += 1;
            setWatched(updatedWatched);
          }
          else if (favorites[index].status == "watching") {
            const updatedWatching = watching;
            updatedWatching.movies += 1;
            setWatching(updatedWatching);

          }
          else if (favorites[index].status == "planToWatch") {
            const updatedPlanToWatch = planTo;
            updatedPlanToWatch.movies += 1;
            setPlanTo(updatedPlanToWatch);

          }
          
        }
      })
    console.log(watched);
    console.log(watching);
    console.log(planTo);
  }

  let sessiontoken = sessionStorage.getItem("token")


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleEdit1() {
    setIsReadOnly1(true);
  };

  function handleEdit2() {
    setIsReadOnly2(true);
  };

  function handleSave1() {
    setIsReadOnly1(false);
  };

  function handleSave2() {
    setIsReadOnly1(false);
  };

  const getInfo = (mediatype, mediaId) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjJjYjAxZWFiNThjNGRlNzdjOWNhMmY0ZGM4ODQ0NyIsInN1YiI6IjY1Mzk1YmFhZWM0NTUyMDBlYTRkNDMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cz3I9EbEUfEny1vJHlbpG7zW_2dSZRBsGCrx6Xy3768'
      }
    };

    fetch(`https://api.themoviedb.org/3/${mediatype}/${mediaId}?language=en-US`, options)
      .then(response => response.json())
      .then(response => { /*console.log(response);*/})
      .catch(err => console.error(err));
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
            {isReadOnly1 ? (
              <div className="input-group mb-3">
                <button className="btn btn-success" type="button" id="input1" onClick={handleSave1}>Save</button>
                <input type="text" className="form-control" name="firstName" aria-label="Example text with button addon" aria-describedby="input1" onChange={handleChange} placeholder={store.userName} ></input>
              </div>
            )
              : (
                <div className="input-group mb-3">
                  <button className="btn btn-success" type="button" id="input1" onClick={handleEdit1}>Edit</button>
                  <input type="text" className="form-control" name="firstName" aria-label="Example text with button addon" aria-describedby="input1" onChange={handleChange} readOnly placeholder={store.userName} ></input>
                </div>
              )}

            {isReadOnly2 ? (
              <div className="input-group mb-3">
                <button className="btn btn-success" type="button" id="input1" onClick={handleSave2}>Save</button>
                <input type="text" className="form-control" name="lastName" placeholder={store.userLastName} aria-label="Example text with button addon" aria-describedby="input1" onChange={handleChange}></input>
              </div>
            )
              : (
                <div className="input-group mb-3">
                  <button className="btn btn-success" type="button" id="input1" onClick={handleEdit2}>Edit</button>
                  <input type="text" className="form-control" name="lastName" placeholder={store.userLastName} aria-label="Example text with button addon" aria-describedby="input1" onChange={handleChange} readOnly></input>
                </div>
              )}

            {/*{isReadOnly3 ? (
              <div className="input-group mb-3">
                <button className="btn btn-outline-success" type="button" id="input1" onClick={handleSave3}>Save</button>
                <input type="text" className="form-control" name="password" placeholder={store.userPassword} aria-label="Example text with button addon" aria-describedby="input1" onChange={handleChange}></input>
              </div>
              ) 
              : (
              <div className="input-group mb-3">
                <button className="btn btn-outline-success" type="button" id="input1" onClick={handleEdit3}>Edit</button>
                <input type="text" className="form-control" name="password" placeholder={store.userPassword} aria-label="Example text with button addon" aria-describedby="input1" onChange={handleChange} readOnly></input>
              </div>
              )}*/}
          </div>


          {/* Statistics div*/}
          <div className="col-md-6 rounded mb-2" style={{ color: "rgba(225, 225, 225, 1)", backgroundColor: "rgba(37, 53, 37, 1)" }}>
            <div className="header pt-2">
              <h1 className="p-2 text-center">Statistics</h1>
              <div className="p-2">
                <div style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} className="row rounded  ps-1">
                  <div className="col-4 align-self-center">
                    <h2 className="">Watching</h2>
                  </div>
                  <div className="col-7">
                    <p className="fs-4 text-center mt-2">Movies: {watching.movies} | Series: {watching.movies}</p >
                    <p className="fs-4 text-center mt-2">Total Time : 99999 Minutes</p >
                  </div>
                </div>
                <div style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} className="row mt-5 rounded  ps-1">
                  <div className="col-4 align-self-center">
                    <h2 className="">Watched</h2>
                  </div>
                  <div className="col-7">
                    <p className="fs-4 text-center mt-2">Movies: {watched.movies} | Series: {watched.series}</p >
                    <p className="fs-4 text-center mt-2">Total Time : 99999 Minutes</p >
                  </div>
                </div>
                <div style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} className="row mt-5 rounded  ps-1">
                  <div className="col-4 align-self-center ">
                    <h3 className="">Plan to Watch</h3>
                  </div>
                  <div className="col-7">
                    <p className="fs-4 text-center mt-2">Movies: {planTo.movies} | Series: {planTo.series}</p >
                    <p className="fs-4 text-center mt-2">Total Time : 99999 Minutes</p >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* my comments div*/}
        <div className="row">
          <div className="col ms-1 rounded mb-2">
            <div className="col-md-12">
              <div className="header d-inline-flex align-items-center pt-2">
                <h4>My Comments</h4>
              </div>
              <div className="completed rounded d-flex flex-row ps-1 mb-1" style={{ overflowX: "scroll", backgroundColor: "black", }}>
                {/* plan to watch list*/}
                1. movie<br></br>
                2. Serie
              </div>
            </div>
          </div>
        </div>



      </div>

    </div>
  );
};
