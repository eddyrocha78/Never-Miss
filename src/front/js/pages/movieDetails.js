import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from 'react-player';
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Details = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const [info, setInfo ] = useState([]);

	const [images, setImages ] = useState([]);

	const [videos, setVideos ] = useState([]);

	const [directors, setDirectors] = useState([]);
	const [writers, setWriters] = useState([]);
	const [cast, setCast] = useState([]);
	const [castChar, setCastChar] = useState([]);



	const [posterLink, setPosterLink ] = useState("");
	const [backLink, setBackLink ] = useState("");
	const [videoKey, setVideoKey ] = useState("");


	useEffect(() => {
		getInfo();
		getImages();
		getVideos();
		getPeople()
	}, []);

	//style={{backgroundImage: "url('"+ backLink +"')",height: "100%" ,backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", filter : "blur(2px)"}}
	//

	const getInfo = () => 
	{
		const options = {
			method: 'GET',
			headers: {
			  accept: 'application/json',
			  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjJjYjAxZWFiNThjNGRlNzdjOWNhMmY0ZGM4ODQ0NyIsInN1YiI6IjY1Mzk1YmFhZWM0NTUyMDBlYTRkNDMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cz3I9EbEUfEny1vJHlbpG7zW_2dSZRBsGCrx6Xy3768'
			}
		  };

		  fetch(`https://api.themoviedb.org/3/${params.type}/${params.theid}?language=en-US`, options)
			.then(response => response.json())
			.then(response => {/*console.log(response); */setInfo(response)})
			.catch(err => console.error(err));
	}

	const getImages = () => 
	{
		const options = {
			method: 'GET',
			headers: {
			  accept: 'application/json',
			  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjJjYjAxZWFiNThjNGRlNzdjOWNhMmY0ZGM4ODQ0NyIsInN1YiI6IjY1Mzk1YmFhZWM0NTUyMDBlYTRkNDMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cz3I9EbEUfEny1vJHlbpG7zW_2dSZRBsGCrx6Xy3768'
			}
		  };
		  
		  fetch(`https://api.themoviedb.org/3/${params.type}/${params.theid}/images`, options)
			.then(response => response.json())
			.then(response => {setImages(response); setPosterLink(response.posters["0"].file_path)/*;console.log(response)*/ ;setBackLink(response.backdrops["0"].file_path)})
			.catch(err => console.error(err));
	}

	const getVideos = () => 
	{
		const options = {
			method: 'GET',
			headers: {
			  accept: 'application/json',
			  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjJjYjAxZWFiNThjNGRlNzdjOWNhMmY0ZGM4ODQ0NyIsInN1YiI6IjY1Mzk1YmFhZWM0NTUyMDBlYTRkNDMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cz3I9EbEUfEny1vJHlbpG7zW_2dSZRBsGCrx6Xy3768'
			}
		  };
		  
		  fetch(`https://api.themoviedb.org/3/${params.type}/${params.theid}/videos?language=en-US`, options)
			.then(response => response.json())
			.then(response => {/*console.log(response); */setVideos(response);setVideoKey(response.results["0"].key)})
			.catch(err => console.error(err));
	}

	const getPeople = () => 
	{
		const options = {
			method: 'GET',
			headers: {
			  accept: 'application/json',
			  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjJjYjAxZWFiNThjNGRlNzdjOWNhMmY0ZGM4ODQ0NyIsInN1YiI6IjY1Mzk1YmFhZWM0NTUyMDBlYTRkNDMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cz3I9EbEUfEny1vJHlbpG7zW_2dSZRBsGCrx6Xy3768'
			}
		  };
		  
		  fetch(`https://api.themoviedb.org/3/${params.type}/${params.theid}/credits?language=en-US`, options)
			.then(response => response.json())
			.then(response => {/*console.log(response); */getDirector(response); getWriters(response); getCast(response)})
			.catch(err => console.error(err));
	}

	const getDirector = (object) =>{
		const newDirectors = [];
		for (let i = 0; i < object.crew.length; i++) {
		  if (object.crew[i].department === 'Directing') {
			newDirectors.push(object.crew[i].name);
		  }
		}
		setDirectors([...directors, ...newDirectors]);
	}

	const getWriters = (object) =>{
		const newWriter = [];
		for (let i = 0; i < object.crew.length; i++) {
		  if (object.crew[i].department === 'Writing') {
			newWriter.push(object.crew[i].name);
		  }
		}
		setWriters([...writers, ...newWriter]);
	}

	const getCast = (object) =>{
		const newCastChar = [];
		const newCast = [];
		for (let i = 0; i < object.cast.length; i++) {
			newCast.push(object.cast[i].name);
			newCastChar.push(object.cast[i].character);
		}
		setCast([...cast, ...newCast]);
		setCastChar([...castChar, ...newCastChar]);
	}

	return (params.type == "movie" ?
		<div  className="text-center mt-5 text-light container-fluid">
			<h1 className="text-white-50 display-1 fw-bold">{info.original_title}</h1>
			<p className="text-secondary h2 my-5 fw-bold">{info.tagline}</p>
			<div className=" row justify-content-center mt-5">
				<div className="col-3">
					<div style={{ backgroundColor: "rgba(54, 138, 33, 1)" }} className="p-1 ms-5">
						<p className="text-center text-light h5">
							Release : {info.release_date}
						</p>
					</div>
				</div>
				<div className="col-3">
					<div style={{ backgroundColor: "rgba(47, 165, 130, 1)" }} className="p-1 mx-3">
						<p className="text-light text-center h5">
							Rating : {info.adult ? "R" : "PG"}
						</p>
					</div>
				</div>
				<div className="col-3">
					<div style={{ backgroundColor: "rgba(120, 160, 55, 1)" }} className="p-1 me-5">
						<p className="text-light text-center h5">
							Duration : {info.runtime} minutes
						</p>
					</div>
				</div>
			</div>
			<div style={{backgroundImage: "url('"+ "https://image.tmdb.org/t/p/w1280_and_h720_bestv2/" + backLink +"')", height: "100%" , backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center"}} className="py-5 Background m-2 my-5 row">
				<div className="col-4 offset-md-1">
					<img className="img-fluid border border-black border-5" src={"https://image.tmdb.org/t/p/w300_and_h450_bestv2/"+ posterLink}/>
				</div>
				<div className="col-4 video align-self-center ">
					{videoKey !== "" ?<ReactPlayer
          			url={"https://www.youtube.com/watch?v="+ videoKey}
          			controls={true}
          			width="650px"
          			height="400px"
					className="border border-black border-5"
        			/>
					:
					<div></div>
					}
				</div>
			</div>
			<div className="my-5 text-warning row justify-content-evenly">
				{ 
				(info.vote_average/2) <= 0.5 || info.vote_average/2 == NaN || info.vote_average/2 == undefined?
				<div className="col-4">
					<i className="fa-regular fa-star fa-5xl"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i>
				</div>
				:
				(info.vote_average/2) <= 1.5 && (info.vote_average/2) > 0.5?
				<div className="col-4">
					<i className="fa-solid fa-star fa-5x"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i>
				</div>
				:
				(info.vote_average/2) <= 2.5 && (info.vote_average/2) > 1.5?
				<div className="col-4">
					<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
				</div>
				:
				(info.vote_average/2) <= 3.5 && (info.vote_average/2) > 2.5?
				<div className="col-4">
					<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
				</div>
				:
				(info.vote_average/2) <= 4.5 && (info.vote_average/2) > 3.5?
				<div className="col-4">
					<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
				</div>
				:
				<div className="col-4">
					<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i>
				</div>
				}
				<div className="col-4 me-2">
					<div className="d-grid gap-2">
  						<button className="btn btn-success btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							<i class="fa-solid fa-square-plus fa-2xl me-5"></i>Add to a List
  						</button>
  						<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
							<li><button className="dropdown-item px-4 fs-3" type="button"><i class="fa-solid fa-eye fa-lg me-3 text-success"></i>Watching</button></li>
    						<li><button className="dropdown-item px-4 fs-3" type="button"><i class="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Watched</button></li>
    						<li><button className="dropdown-item px-4 fs-3" type="button"><i class="fa-solid fa-eye fa-lg me-3 text-primary"></i>Plan to Watch</button></li>
  						</ul>
					</div>
				</div>
			</div>
			<div className="row"><div className=" Filler col-12 mb-2"></div></div>
			<div className="row justify-content-start mt-5">
				<div style={{ backgroundColor: "rgba(21, 40, 21, 1)" }} className="col-2 py-2 rounded offset-md-1">
					<p className="text-start text-light text-center h2">
						Synopsis
					</p>
				</div>
			</div>
			<div className="row mb-2 justify-content-center">
				<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="col-10 rounded p-4">
					<p className="h4 text-start py-2">
					{info.overview}
					</p>
				</div>
			</div>
			<div className="row mt-5 justify-content-center">
				<div className="col-5 me-3">
					<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="rounded px-5 py-4 text-start">
						<div class="row">
							<div className="col-12">
								<p className="text-white h2 fw-bold">Directors</p>
							</div>
						</div>
						<div className="row d-flex flex-nowrap overflow-auto">
        						{directors.map((_, index) => (
          							<p className="bg-success rounded py-2 text-center m-1 col-4 text-light mt-2" key={index}>{directors[index]}</p>
        						))}
						</div>
						<div class="row mt-5">
							<div className="col-12 mt-2">
								<p className="text-white h2 fw-bold">Writers</p>
							</div>
						</div>
						<div className="row d-flex flex-nowrap overflow-auto">
        						{writers.map((_, index) => (
          							<p className="bg-success py-2 text-center m-1 rounded col-4 text-light" key={index}>{writers[index]}</p>
        						))}
						</div>
						<div class="row mt-5">
							<div className="col-12 mt-2">
								<p className="text-white h2 fw-bold">Cast</p>
							</div>
						</div>
						<div className="row d-flex flex-nowrap overflow-auto">
        						{cast.map((_, index) => (
									<div className=" bg-success text-start py-1 rounded col-5 text-light m-1" key={index}>
									<p className="mt-4">{"Name : "+ cast[index]}</p>
									<p>{"Character : "+ castChar[index]}</p>
									</div>
        						))}
						</div>
					</div>
				</div>
				<div className="col-5 ms-2">
					<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="rounded px-5 py-4">
						<p className="text-white h2 fw-bold">Comments</p>

					</div>
				</div>
			</div>
		</div>
		:

		<div className="container-fluid text-center mt-5 text-light">
			<h1 className="text-white-50 display-1 fw-bold">{info.name}</h1>
			<p className="text-secondary h2 my-5 fw-bold">{info.tagline}</p>
			<div className="row justify-content-center mt-5">
			<div style={{ backgroundColor: "rgba(54, 138, 33, 1)" }} className="col-2">
					<p className="text-center text-light h5 p-1">
					Release : {info.first_air_date}
					</p>
				</div>
				<div  style={{ backgroundColor: "rgba(47, 165, 130, 1)" }} className="col-2 ms-2">
					<p className="text-light text-center h5 p-1">
					Rating : {info.adult ? "R" : "PG"}
					</p>
				</div>
				<div className="col-2 bg-primary bg-opacity-50 ms-2">
					<p className="text-light text-center h5 p-1">
						Episodes : {info.number_of_episodes}
					</p>
				</div>
				<div className="col-2 bg-info bg-opacity-50 ms-2">
					<p className="text-light text-center h5 p-1">
						Seasons : {info.number_of_seasons}
					</p>
				</div>
			</div>
			<div style={{backgroundImage: "url('"+ "https://image.tmdb.org/t/p/w1280_and_h720_bestv2/" + backLink +"')", height: "100%" ,backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center"}} className="py-5 Background m-2 my-5 row">
				<div className="col-4 offset-md-1">
					<img className="img-fluid border border-black border-5" src={"https://image.tmdb.org/t/p/w300_and_h450_bestv2/"+ posterLink}/>
				</div>
				<div className="col-4 video align-self-center ">
					{videoKey !== "" ?<ReactPlayer
          			url={"https://www.youtube.com/watch?v="+ videoKey}
          			controls={true}
          			width="650px"
          			height="400px"
					className="border border-black border-5"
        			/>
					:
					<div></div>
					}
				</div>
			</div>
			<div className="my-5 text-warning row justify-content-evenly">
				{ 
				(info.vote_average/2) <= 0.5 || info.vote_average/2 == NaN || info.vote_average/2 == undefined?
				<div className="col-4">
					<i className="fa-regular fa-star fa-5xl"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i>
				</div>
				:
				(info.vote_average/2) <= 1.5 && (info.vote_average/2) > 0.5?
				<div className="col-4">
					<i className="fa-solid fa-star fa-5x"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i><i className="fa-regular fa-star fa-2xl"></i>
				</div>
				:
				(info.vote_average/2) <= 2.5 && (info.vote_average/2) > 1.5?
				<div className="col-4">
					<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
				</div>
				:
				(info.vote_average/2) <= 3.5 && (info.vote_average/2) > 2.5?
				<div className="col-4">
					<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
				</div>
				:
				(info.vote_average/2) <= 4.5 && (info.vote_average/2) > 3.5?
				<div className="col-4">
					<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
				</div>
				:
				<div className="col-4">
					<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i>
				</div>
				}
				<div className="col-4 me-2">
					<div className="d-grid gap-2">
  						<button className="btn btn-success btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							<i class="fa-solid fa-square-plus fa-2xl me-5"></i>Add to a List
  						</button>
  						<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
							<li><button className="dropdown-item px-4 fs-3" type="button"><i class="fa-solid fa-eye fa-lg me-3 text-success"></i>Watching</button></li>
    						<li><button className="dropdown-item px-4 fs-3" type="button"><i class="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Watched</button></li>
    						<li><button className="dropdown-item px-4 fs-3" type="button"><i class="fa-solid fa-eye fa-lg me-3 text-primary"></i>Plan to Watch</button></li>
  						</ul>
					</div>
				</div>
			</div>
			<div className="row"><div className=" Filler col-12 mb-2"></div></div>
			<div className="row justify-content-start mt-5">
				<div style={{ backgroundColor: "rgba(21, 40, 21, 1)" }} className="col-2 py-2 rounded offset-md-1">
					<p className="text-start text-light text-center h2">
						Synopsis
					</p>
				</div>
			</div>
			<div className="row mb-2 justify-content-center">
				<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="col-10 rounded p-4">
					<p className="h4 text-start py-2">
					{info.overview}
					</p>
				</div>
			</div>
			<div className="row mt-5 justify-content-center">
				<div className="col-5 me-3">
					<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="rounded px-5 py-4 text-start">
						<div class="row">
							<div className="col-12">
								<p className="text-white h2 fw-bold">Directors</p>
							</div>
						</div>
						<div className="row d-flex flex-nowrap overflow-auto">
        						{directors.map((_, index) => (
          							<p className="bg-success rounded py-2 text-center  m-1 col-4 text-light mt-2" key={index}>{directors[index]}</p>
        						))}
						</div>
						<div class="row mt-5">
							<div className="col-12 mt-2">
								<p className="text-white h2 fw-bold">Writers</p>
							</div>
						</div>
						<div className="row d-flex flex-nowrap overflow-auto">
        						{writers.map((_, index) => (
          							<p className="bg-success py-2 text-center  m-1 rounded col-4 text-light" key={index}>{writers[index]}</p>
        						))}
						</div>
						<div class="row mt-5">
							<div className="col-12 mt-2">
								<p className="text-white h2 fw-bold">Cast</p>
							</div>
						</div>
						<div className="row d-flex flex-nowrap overflow-auto">
        						{cast.map((_, index) => (
									<div className=" bg-success text-start py-1 rounded col-5 text-light m-1" key={index}>
									<p className="mt-4">{"Name : "+ cast[index]}</p>
									<p>{"Character : "+ castChar[index]}</p>
									</div>
        						))}
						</div>
					</div>
				</div>
				<div className="col-5 ms-2">
					<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="rounded px-5 py-4">
						<p className="text-white h2 fw-bold">Comments</p>

					</div>
				</div>
			</div>
		</div>
);
};

Details.propTypes = {
	match: PropTypes.object
};