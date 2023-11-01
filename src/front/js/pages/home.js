import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/Card";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzljNWIzNDBiM2I5OGE3ZGZiMzlkYTJlOTc3YzE2MyIsInN1YiI6IjY1Mzk1Yj83ZWM0NTUyMDEyYzE5YjFiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G6LQ-ee_CUMn2WrqGLxrFZ_mjfkw2opm3iX8NIMm_ww",
            },
          }
        );
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(info.results)
  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-8">
          <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="row mx-5 rounded">
            <div className="row">
              <h1 className="mx-5 mt-2 text-decoration-underline text-white">Popular Movies</h1>
            </div>
            <div className="p-3">
              <div style={{ overflowX: "scroll" }} className="d-flex flex-row">
                {info.results && info.results.map((data, index) => (
                  <Card
                    key={index}
                    imgpath={data.poster_path}
                    title={data.original_title}
                    description={data.overview}
                  />
                ))}
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="row mx-5 mt-5 rounded">
            <div className="row">
              <h1 className="mx-5 mt-2 text-decoration-underline text-white">Popular Series</h1>
            </div>
            <div style={{ overflowX: "scroll" }} className="d-flex flex-row">
              {/* Render your list of popular series here */}
            </div>
          </div>
        </div>

        <div className="col-4">
          <div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="h-100 rounded me-5">
            <h1 className="py-3 mx-5 text-decoration-underline text-white">Trending</h1>
            <div>
              {/* Add content for Trending section */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};