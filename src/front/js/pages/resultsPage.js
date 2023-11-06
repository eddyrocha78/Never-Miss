import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from 'react-player';
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Results = () => {

  const { store, actions } = useContext(Context);

  const [info, setInfo] = useState([]);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);


  /*useEffect(() => {
  getInfo();
}, []);*/

  const HandleSearch = () => {
    getInfo(search);
  }

  const getInfo = newSearch => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjJjYjAxZWFiNThjNGRlNzdjOWNhMmY0ZGM4ODQ0NyIsInN1YiI6IjY1Mzk1YmFhZWM0NTUyMDBlYTRkNDMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cz3I9EbEUfEny1vJHlbpG7zW_2dSZRBsGCrx6Xy3768'
      }
    };

    fetch(`https://api.themoviedb.org/3/search/multi?query=${newSearch}&include_adult=false&language=en-US&page=${page}`, options)
      .then(response => response.json())
      .then(response => { console.log(response), setResult(response.results) /*, getResults(response)*/ })
      .catch(err => console.error(err));
  }

  const getResults = (response) => {
    const newResult = [];
    setResult(newResult);
    for (let i = 0; i < response.results.length; i++) {
      if (response.results[i].media_type == "tv") {
        newResult.push(response.results[i].name);
      }
      if (response.results[i].media_type == "movie") {
        newResult.push(response.results[i].title);
      }
    }
    setResult([...newResult]);
  }

  return (
    <div className="container-fluid">
      <div className="row text-center mt-5">
        <h1 className="text-white mb-5 display-1 fw-bold">Never Miss</h1>
      </div>
      <div className="row justify-content-center text-center mt-5 mx-5">
        <div className="col-6 p-0">
          <input style={{ borderColor: "rgba(37, 53, 37, 1)" }}
            className="form-control form-control-lg text-start border-5" dir="auto" id="inner_search_v4"
            name="query" type="text" tabIndex="1" autoCorrect="off" autofill="off" autoComplete="off" placeholder="Search for a movie or tv show "
            onChange={(e) => { setSearch(e.target.value) }} />
        </div>
        <div className="col-2 d-grid gap-2 p-0">
          <button className="btn btn-success fs-4 p-0" onClick={() => { HandleSearch() }}>Search <i class="fa-solid fa-magnifying-glass fa-rotate-90 fa-sm"></i></button>
        </div>
      </div>
      <div className="row justify-content-center">
        {result.map((_, index) => (
          <div style={{backgroundColor: "rgba(82, 117, 82, 1)" }} key={index} className="btn btn-lg py-3 rounded col-8 mt-2">
            <Link className="text-start text-decoration-none text-light" to={"/" + result[index].media_type + "/details/" + result[index].id}>
              <div className="col-6">
                <div class="row">
                  <div style={{ height: "150px"}} class="col-6">
                    <img style={{ height: "100%" }} className="img-fluid p-0 rounded" src={"https://www.themoviedb.org/t/p/w220_and_h330_face" + result[index].poster_path} />
                  </div>
                  <div className="col-6">
                    {
                      result[index].media_type == "movie" ?
                        <p className="ms-3 fs-4">{result[index].title}</p>
                        :
                        <p className="ms-3 fs-4">{result[index].name}</p>
                    }
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="row text-center my-5">
        <h1 className="text-white-50 display-4">
          Subscribe to never miss a thing
        </h1>
      </div>
    </div >

  );
};