
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";

export const UserProfile2 = () => {
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

  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({...formData, [name]: value});
	  };

  function editName(number) {
      
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-white display-1 fw-bold text-center">{store.user.firstName} {store.user.lastName} Profile</h1>
      </div>
      
      <div className="container">

        <div  className="row">
          {/*user avatar div*/}
          <div className="row container-fluid">
            <div className="container-fluid col-md-5">

              <i className="fa-solid fa-circle-user fa-2xl py-5"></i>

              {/*first name, last name and email edit div*/}
              <div className="input-group mb-3">
                <button className="btn btn-outline-success" type="button" id="input1" onClick={editName('1')}>Edit</button>
                <input type="text" className="form-control" name="firstName" placeholder={store.firstName} aria-label="Example text with button addon" aria-describedby="input1" onChange={handleChange} readOnly></input>
              </div>
              <div className="input-group mb-3">
                <button className="btn btn-outline-success" type="button" id="input2" onClick={editName('2')}>Edit</button>
                <input type="text" className="form-control" name="lastName" placeholder={store.lastName} aria-label="Example text with button addon" aria-describedby="input2" onChange={handleChange} readOnly></input>
              </div>
              <div className="input-group mb-3">
                <button className="btn btn-outline-success" type="button" id="input3" onClick={editName('3')}>Edit</button>
                <input type="email" className="form-control" name="email" placeholder={store.email} aria-label="Example text with button addon" aria-describedby="input3" onChange={handleChange} readOnly></input>
              </div>

            </div>
          

            {/* Statistics div*/}
            <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="container-fluid rounded col mb-2">
              <div className="header">
                <h4>Statistics</h4>

                <div className="body">
                  <div style={{ overflowX: "scroll", backgroundColor: "rgba(82, 117, 82, 1)" }} className="rounded d-flex mb-1">    
                    <h5>Watching</h5>
                    <small className="d-inline-flex align-items-center">Movies: 9999 | Series: 9999</small>
                  </div>
                  <div style={{ overflowX: "scroll", backgroundColor: "rgba(82, 117, 82, 1)" }} className="rounded d-flex mb-1">
                    <h5>Watched</h5>
                    <small className="d-inline-flex align-items-center">Movies: 9999 | Series: 9999</small>
                  </div>
                  <div style={{ overflowX: "scroll", backgroundColor: "rgba(82, 117, 82, 1)" }} className="rounded d-flex mb-1">
                    <h5>Plan to Watch</h5>
                    <small className="d-inline-flex align-items-center">Movies: 9999 | Series: 9999</small>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* my comments div*/}
          <div className="mycomments">
            <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="completed row ms-1 rounded mb-2">
              <div className="col">
                <div className="header d-inline-flex align-items-center">
                  <h4>My Comments</h4>
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
