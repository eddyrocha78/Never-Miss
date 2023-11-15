import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from 'react-player';
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Results = props => {

  const params = useParams();

  const navigate = useNavigate();

  const { store, actions } = useContext(Context);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [resp, setResp] = useState([]);


  useEffect(() => {
    getInfo(params.keyword);
    setSearch(params.keyword);
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

  const setPage = (pageNumber) => {
    if (pageNumber <= 0) {
      navigate("/search/" + search + "/" + 1);
      window.location.reload();
    } else if (pageNumber <= resp.total_pages) {
      navigate("/search/" + search + "/" + pageNumber);
      window.location.reload();
    }

  }


  const getInfo = newSearch => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjJjYjAxZWFiNThjNGRlNzdjOWNhMmY0ZGM4ODQ0NyIsInN1YiI6IjY1Mzk1YmFhZWM0NTUyMDBlYTRkNDMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cz3I9EbEUfEny1vJHlbpG7zW_2dSZRBsGCrx6Xy3768'
      }
    };

    fetch(`https://api.themoviedb.org/3/search/multi?query=${newSearch}&include_adult=false&language=en-US&page=${params.page}`, options)
      .then(response => response.json())
      .then(response => { console.log(response); setResult(response.results); setResp(response) })
      .catch(err => console.error(err));
  }


  return (
    <div className="container-fluid">
      <div className="row text-center mt-5">
        <h1 className="text-white mb-5 display-1 fw-bold">Never Miss</h1>
      </div>
      <div className="row justify-content-center text-center mt-5 mx-5">
        <div className="col-6 p-0">
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
      <div className="row mt-3 justify-content-center ">
        <div className="col-8 border border-2 rounded py-2 borgreen">
          {result.map((_, index) => (
            result[index].media_type !== "person" ?
              <div style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} key={index} className="btn btn-lg col-12 py-3 rounded mt-2">
                <Link className="text-start text-decoration-none text-light" to={"/" + result[index].media_type + "/details/" + result[index].id}>
                  <div className="row">
                    <div className="col-md-2 col-sm-4 text-center">
                      {result[index].poster_path != null ?
                        <img style={{ height: "150px" }} className="rounded" src={"https://www.themoviedb.org/t/p/w220_and_h330_face" + result[index].poster_path} />
                        :
                        <img style={{ height: "150px" }} className="rounded" src={"https://placehold.co/220x330/png?text=No \nImage"} />
                      }
                    </div>
                    <div className="col">
                      {
                        result[index].media_type == "movie" ?
                          <p className="fw-bold fs-3">{result[index].title}</p>
                          :
                          <p className="fw-bold fs-3">{result[index].name}</p>
                      }
                      <div style={{ height: "100px", overflowY: "auto" }} className="overflow-y-auto row text-start">
                        <p className="fs-5 text-white-50">{result[index].overview}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              :

              <div key={index}></div>
          ))}
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-md-2 offset-md-2 md-me-5 my-2 col-sm-10">
            <button className="btn btn-lg btn-success" onClick={() => { setPage(parseInt(params.page) - 1) }} >Prev</button>
          </div>
          <div className="col-md-4 my-2 ms-md-5 col-sm-10">
            {params.page > 3 && <button onClick={() => { setPage(parseInt(params.page) - 2) }} className="btn ms-2 btn-lg btn-success">{params.page - 2}</button>}
            {params.page > 1 && <button onClick={() => { setPage(parseInt(params.page) - 1) }} className="btn ms-2 btn-lg btn-success">{params.page - 1}</button>}
            <button className="btn ms-2 btn-lg btn-success" disabled>{params.page}</button>
            {params.page < resp.total_pages - 1 && <button onClick={() => { setPage(parseInt(params.page) + 1) }} className="btn ms-2 btn-lg btn-success">{(parseInt(params.page) + 1)}</button>}
            {params.page < resp.total_pages - 2 && <button onClick={() => { setPage(parseInt(params.page) + 2) }} className="btn ms-2 btn-lg btn-success">{(parseInt(params.page) + 2)}</button>}
          </div>
          <div className="col-md-2 my-2 me-md-5 col-sm-10">
            <button className="btn btn-lg btn-success" onClick={() => { setPage(parseInt(params.page) + 1) }}>Next</button>
          </div>
        </div>

      </div>
      <div className="row text-center my-5">
        <h1 className="text-white-50 display-4">
          Subscribe to never miss a thing
        </h1>
      </div>
    </div >

  );
};

Results.propTypes = {
  match: PropTypes.object
};