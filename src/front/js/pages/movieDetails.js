import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Details = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const [info, setInfo ] = useState([]);

	const [images, setImages ] = useState([]);

	const [imLoaded, setImLoaded ] = useState(false);


	useEffect(() => {
		getInfo();
		getImages();
	}, []);

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
			.then(response => {console.log(response); setInfo(response)})
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
			.then(response => {console.log(response); setImages(response); setImLoaded(true)})
			.catch(err => console.error(err));
	}

	return (params.type == "movie" ?
		<div className="text-center mt-5 text-light container">
			<h1 className="text-white-50 display-1 fw-bold">{info.original_title}</h1>
			<div className="row justify-content-start mt-5">
				<div style={{ backgroundColor: "rgba(54, 138, 33, 1)" }} className="col-2 offset-2">
					<p className="text-center text-light h5 p-1">
					Release : {info.release_date}
					</p>
				</div>
				<div  style={{ backgroundColor: "rgba(47, 165, 130, 1)" }} className="col-2 ms-2">
					<p className="text-light text-center h5 p-1">
					Rating : {info.adult ? "R" : "PG"}
					</p>
				</div>
				<div  style={{ backgroundColor: "rgba(120, 160, 55, 1)" }}className="col-2 mx-2">
					<p className="text-light text-center h5 p-1">
						Duration : {info.runtime} minutes
					</p>
				</div>
			</div>
			<div className="ms-3 my-5 row">
				<div className="col-4 offset-md-1">
					<img className="img-fluid" src={imLoaded ? "https://image.tmdb.org/t/p/w300_and_h450_bestv2/"+ images.posters["0"].file_path : ""}/>
				</div>
				<div className="col-4 align-self-center">
					<img className="img-fluid" src={imLoaded ? "https://image.tmdb.org/t/p/w1280_and_h720_bestv2/"+ images.backdrops["0"].file_path : ""}/>
				</div>
			</div>
			<div className="mt-5 text-warning row justify-content-evenly">
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
				<div className="col-3 d-grid gap-2">
					<button className="btn btn-success py-3"><p className="h3"><i class="fa-solid fa-square-plus fa-2xl me-5"></i>Add to a List</p></button>
				</div>
			</div>
			<div className="row justify-content-start mt-5">
				<div style={{ backgroundColor: "rgba(21, 40, 21, 1)" }} className="col-2 rounded offset-md-1">
					<p className="text-start text-light text-center h3">
						Synopsis
					</p>
				</div>
			</div>
			<div className="row justify-content-center">
				<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="col-10 rounded p-4">
					<p className="h5 text-start">
					{info.overview}
					</p>
				</div>
			</div>
			</div>
		:

		<div className="container text-center mt-5 text-light">
			<h1 className="text-white-50 display-1 fw-bold">{info.name}</h1>
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
			<div className="ms-3 my-5 row">
				<div className="col-4 offset-md-1">
					<img className="img-fluid" src={imLoaded ? "https://image.tmdb.org/t/p/w300_and_h450_bestv2/"+ images.posters["0"].file_path : ""}/>
				</div>
				<div className="col-4 align-self-center">
					<img className="img-fluid" src={imLoaded ? "https://image.tmdb.org/t/p/w1280_and_h720_bestv2/"+ images.backdrops["0"].file_path : ""}/>
				</div>
			</div>
			<div className="mt-5 text-warning row justify-content-evenly">
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
				<div className="col-3 d-grid gap-2">
					<button className="btn btn-success py-3"><p className="h3"><i class="fa-solid fa-square-plus fa-2xl me-5"></i>Add to a List</p></button>
				</div>
			</div>
			<div className="row justify-content-start mt-5">
				<div style={{ backgroundColor: "rgba(21, 40, 21, 1)" }} className="col-2 rounded offset-md-1">
					<p className="text-start text-light text-center h3">
						Synopsis
					</p>
				</div>
				<div style={{ backgroundColor: "rgba(21, 40, 21, 1)" }} className="col-2 rounded ms-2">
					<p className="text-start text-light text-center h3">
						Episodes
					</p>
				</div>
			</div>
			<div className="row justify-content-center">
				<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="col-10 rounded p-4">
					<p className="h5 text-start">
					{info.overview}
					</p>
				</div>
			</div>
		</div>
);
};

Details.propTypes = {
	match: PropTypes.object
};