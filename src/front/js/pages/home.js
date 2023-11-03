import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/Card";
import { List } from "../component/List";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [movieinfo, setmovieInfo] = useState({ results: [] });
  const [seriesinfo, setseriesInfo] = useState({ results: [] });
  const [movietrending, setmovietrending] = useState({ results: [] });

  useEffect(() => {
    const MovieTrending = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzljNWIzNDBiM2I5OGE3ZGZiMzlkYTJlOTc3YzE2MyIsInN1YiI6IjY1Mzk1YjgzZWM0NTUyMDEyYzE5YjFiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G6LQ-ee_CUMn2WrqGLxrFZ_mjfkw2opm3iX8NIMm_ww'
            }
          }
        )
        const data = await response.json();
        setmovietrending(data);
      } catch (error) {
        console.error(error);
      }
    };




    const fetchmovieData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzljNWIzNDBiM2I5OGE3ZGZiMzlkYTJlOTc3YzE2MyIsInN1YiI6IjY1Mzk1YjgzZWM0NTUyMDEyYzE5YjFiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G6LQ-ee_CUMn2WrqGLxrFZ_mjfkw2opm3iX8NIMm_ww'
            }
          }
        )
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
      } catch (error) {
        console.error(error);
      }
    };

    MovieTrending()
    fetchseriesData();
    fetchmovieData();
  }, []);
  console.log(seriesinfo);
  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-8">
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
                    <Card
                      key={index}
                      imgpath={data.poster_path}
                      title={data.name}
                      description={data.overview}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div
            style={{ backgroundColor: "rgba(37, 53, 37, 1)" }}
            className="h-100 rounded me-5"
          >
            <h1 className="py-3 mx-5 text-decoration-underline text-white">
              Trending
            </h1>
            <div>
              <ul>
         
                  </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
