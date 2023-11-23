import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from 'react-player';
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Details = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const navigate = useNavigate();

	const [info, setInfo] = useState([]);

	const [images, setImages] = useState([]);

	const [videos, setVideos] = useState([]);

	const [directors, setDirectors] = useState([]);
	const [writers, setWriters] = useState([]);
	const [cast, setCast] = useState([]);
	const [castChar, setCastChar] = useState([]);

	const [comments, setComments] = useState([]);
	const [newcomment, setNewComment] = useState([]);

	const [favorite, setFavorite] = useState([]);



	const [posterLink, setPosterLink] = useState("");
	const [backLink, setBackLink] = useState("");
	const [videoKey, setVideoKey] = useState("");


	useEffect(() => {
		actions.getAllComments();
		getInfo();
		getImages();
		getVideos();
		getPeople();
	}, []);

	useEffect(() => {
		if (store.userId !== null) {
			actions.getFavorites(store.userId);
		}

	}, [store.userId])

	useEffect(() => {
		if (params.type == "movie") {
			if (store.userFavorites !== null) {
				let resp = store.userFavorites;
				resp.map((_, index) => {
					if (resp[index].movieId == params.theid) {
						setFavorite(resp[index]);
					}
				})
			}

		} else {
			if (store.userFavorites !== null) {
				let resp = store.userFavorites;
				/*console.log(store.userFavorites);*/
				resp.map((_, index) => {
					if (resp[index].seriesId == params.theid) {
						setFavorite(resp[index]);
					}
				})
			}

		}

	}, [store.userFavorites])

	useEffect(() => {
		if (store.comments !== null && comments == "") {
			let resp = store.comments;
			resp.map((_, index) => {
				if (resp[index].target_type == "movie") {
					if (resp[index].target_id == params.theid) {
						setComments((comments) => comments.concat(resp[index]))
					}
				} else if (resp[index].target_type == "tv") {
					if (resp[index].target_id == params.theid) {
						setComments((comments) => comments.concat(resp[index]))
					}
				}
			})
		}

	}, [store.comments])


	useEffect(() => {
		if (store.token && store.token != "" && store.token != null) {
			actions.getMessage();
		}
	}, [store.token])

	const getInfo = () => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: "Bearer " + process.env.MOVIE_API_TOKEN,
			}
		};

		fetch(`https://api.themoviedb.org/3/${params.type}/${params.theid}?language=en-US`, options)
			.then(response => response.json())
			.then(response => { /*console.log(response);*/ setInfo(response) })
			.catch(err => console.error(err));
	}

	const getImages = () => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: "Bearer " + process.env.MOVIE_API_TOKEN,
			}
		};

		fetch(`https://api.themoviedb.org/3/${params.type}/${params.theid}/images`, options)
			.then(response => response.json())
			.then(response => { if (Object.values(response.posters).length > 0) { setImages(response); setPosterLink("https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + response.posters["0"].file_path); /*console.log(response);*/ setBackLink("https://image.tmdb.org/t/p/w1280_and_h720_bestv2/" + response.backdrops["0"].file_path) } else { setBackLink("https://placehold.co/1280x720/253525/253525/png?text="); setPosterLink("https://placehold.co/220x330/png?text=No%20Image") } })
			.catch(err => console.error(err));
	}

	const getVideos = () => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: "Bearer " + process.env.MOVIE_API_TOKEN,
			}
		};

		fetch(`https://api.themoviedb.org/3/${params.type}/${params.theid}/videos?language=en-US`, options)
			.then(response => response.json())
			.then(response => { if (Object.values(response.results).length > 0) {/*console.log(response); */setVideos(response); setVideoKey(response.results["0"].key) } })
			.catch(err => console.error(err));
	}

	const getPeople = () => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: "Bearer " + process.env.MOVIE_API_TOKEN,
			}
		};

		fetch(`https://api.themoviedb.org/3/${params.type}/${params.theid}/credits?language=en-US`, options)
			.then(response => response.json())
			.then(response => {/*console.log(response); */getDirector(response); getWriters(response); getCast(response) })
			.catch(err => console.error(err));
	}

	const getDirector = (object) => {
		const newDirectors = [];
		for (let i = 0; i < object.crew.length; i++) {
			if (object.crew[i].department === 'Directing') {
				newDirectors.push(object.crew[i].name);
			}
		}
		setDirectors([...directors, ...newDirectors]);
	}

	const getWriters = (object) => {
		const newWriter = [];
		for (let i = 0; i < object.crew.length; i++) {
			if (object.crew[i].department === 'Writing') {
				newWriter.push(object.crew[i].name);
			}
		}
		setWriters([...writers, ...newWriter]);
	}

	const getCast = (object) => {
		const newCastChar = [];
		const newCast = [];
		for (let i = 0; i < object.cast.length; i++) {
			newCast.push(object.cast[i].name);
			newCastChar.push(object.cast[i].character);
		}
		setCast([...cast, ...newCast]);
		setCastChar([...castChar, ...newCastChar]);
	}

	const addFavorite = (status) => {
		if (store.token && store.token != "" && store.token != null) {
			if (params.type == "movie") {
				actions.addToList(store.userId, params.theid, params.type, info.title, status, info.poster_path, info.runtime)
				window.location.reload();
			} else {
				actions.addToList(store.userId, params.theid, params.type, info.name, status, info.poster_path, 20)
				window.location.reload();
			}
		}
	}

	const addNewComment = (text) => {
		if (store.token && store.token != "" && store.token != null) {
			if (text.trim() === "") {
				alert("Comment cannot be empty");
			} else {
				actions.addComment(store.userId, "" + store.userName + " " + store.userLastName + "", text, params.type, params.theid);
				navigate("/")
				
			}
		}
	}

	const removeComment = () => {
		if (store.token && store.token != "" && store.token != null) {
			actions.removeComment(store.userId, params.type, params.theid);
			window.location.reload();
		}
	}

	const removeFavorite = () => {
		if (store.token && store.token != "" && store.token != null) {
			actions.deleteFavorite(store.userId, params.theid, params.type)
			window.location.reload();
		}
	}

	const updateFavorite = (status) => {
		if (store.token && store.token != "" && store.token != null) {
			actions.updateFavorite(store.userId, params.theid, params.type, status)
			window.location.reload();
		}
	}

	return (info.adult == false ?
		params.type == "movie" ?
			<div className="text-center mt-5 text-light container-fluid">
				<h1 className="text-white-50 display-1 fw-bold">{info.title}</h1>
				<p className="text-secondary h2 my-5 fw-bold">{info.tagline}</p>
				<div className=" row justify-content-center mt-5">
					<div className="col-md-3 col-sm-6 m-2">
						<div style={{ backgroundColor: "rgba(54, 138, 33, 1)" }} className="rounded  p-1">
							<p className="text-center text-light fw-bold fs-5">
								Release : {info.release_date}
							</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6 m-2">
						<div style={{ backgroundColor: "rgba(47, 165, 130, 1)" }} className="rounded  p-1">
							<p className="text-center text-light fw-bold fs-5">
								Rating : {info.adult ? "R" : "PG"}
							</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6 m-2">
						<div style={{ backgroundColor: "rgba(120, 160, 55, 1)" }} className="rounded p-1">
							<p className="text-center text-light fw-bold fs-5">
								Duration : {info.runtime} minutes
							</p>
						</div>
					</div>
				</div>
				<div style={{ backgroundImage: "url('" + backLink + "')", height: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", borderRadius: "12px" }} className="py-5 Background row justify-content-center">
					<div className="col-md-4 col-sm-6 movie">
						<img className="poster img-fluid border border-black border-5" src={posterLink} />
					</div>
					<div className="col-xl-6 m-1 mt-lg-2 col-lg-8 video">
						{videoKey !== "" ? <ReactPlayer
							url={"https://www.youtube.com/watch?v=" + videoKey}
							controls={true}
							width="650px"
							height="400px"
							className="poster img-fluid border border-black border-5  m-auto"
						/>
							:
							<div></div>
						}
					</div>
				</div>
				<div className="my-5 text-warning row justify-content-evenly">
					{
						(info.vote_average / 2) <= 0.5 || info.vote_average / 2 == NaN || info.vote_average / 2 == undefined ?
							<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
								<i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
							</div>
							:
							(info.vote_average / 2) <= 1.5 && (info.vote_average / 2) > 0.5 ?
								<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
									<i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
								</div>
								:
								(info.vote_average / 2) <= 2.5 && (info.vote_average / 2) > 1.5 ?
									<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
										<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
									</div>
									:
									(info.vote_average / 2) <= 3.5 && (info.vote_average / 2) > 2.5 ?
										<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
											<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
										</div>
										:
										(info.vote_average / 2) <= 4.5 && (info.vote_average / 2) > 3.5 ?
											<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
												<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
											</div>
											:
											<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
												<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i>
											</div>
					}
					<div className="col-xl-4 col-lg-6 col-sm-12">
						{store.token && store.token != "" && store.token != null ?
							Object.values(favorite).length > 0 ?
								favorite.status == "watching" ?
									<div className="d-grid gap-2">
										<button className="btn btn-outline-success btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
											<i className="fa-solid fa-eye fa-lg me-3 text-success-emphasis"></i>Watching
										</button>
										<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
											<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { removeFavorite() }}><i className="fa-solid fa-trash ms-1 fa-lg me-3 text-danger"></i>Remove</button></li>
											<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watched") }}><i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Change to Watched</button></li>
											<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("planToWatch") }}><i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>Change to Plan to Watch</button></li>
										</ul>
									</div>
									:
									favorite.status == "watched" ?
										<div className="d-grid gap-2">
											<button className="btn btn-outline-secondary btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
												<i className="fa-solid fa-eye fa-lg me-3 text-secondary-emphasis"></i>Watched
											</button>
											<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
												<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { removeFavorite() }}><i className="fa-solid fa-trash ms-1 fa-lg me-3 text-danger"></i>Remove</button></li>
												<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watching") }}><i className="fa-solid fa-eye fa-lg me-3 text-success"></i>Change to Watching</button></li>
												<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("planToWatch") }}><i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>Change to Plan to Watch</button></li>
											</ul>
										</div>
										:
										favorite.status == "planToWatch" ?
											<div className="d-grid gap-2">
												<button className="btn btn-outline-primary btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
													<i className="fa-solid fa-eye fa-lg me-3 text-primary-emphasis"></i>Plan To Watch
												</button>
												<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
													<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { removeFavorite() }}><i className="fa-solid fa-trash ms-1 fa-lg me-3 text-danger"></i>Remove</button></li>
													<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watching") }}><i className="fa-solid fa-eye fa-lg me-3 text-success"></i>Change to Watching</button></li>
													<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watched") }}><i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Change to Watched</button></li>
												</ul>
											</div>
											:
											<div>

											</div>
								:
								<div className="d-grid gap-2">
									<button className="btn btn-success btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
										<i className="fa-solid fa-square-plus fa-2xl me-5"></i>Add to a List
									</button>
									<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
										<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { addFavorite("watching") }}><i className="fa-solid fa-eye fa-lg me-3 text-success"></i>Watching</button></li>
										<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { addFavorite("watched") }}><i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Watched</button></li>
										<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { addFavorite("planToWatch") }}><i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>Plan to Watch</button></li>
									</ul>
								</div>
							:
							<div className="d-grid gap-2">
								<button className="btn btn-success btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									<i className="fa-solid fa-square-plus fa-2xl me-5"></i>Add to a List
								</button>
								<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
									<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { navigate("/login") }}><i className="fa-solid fa-eye fa-lg me-3 text-success"></i>Watching</button></li>
									<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { navigate("/login") }}><i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Watched</button></li>
									<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { navigate("/login") }}><i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>Plan to Watch</button></li>
								</ul>
							</div>
						}
					</div>
					<div className="row"><div className=" Filler col-12 mb-2"></div></div>
					<div className="row justify-content-center mt-5">
						<div style={{ backgroundColor: "rgba(21, 40, 21, 1)" }} className="col-lg-10 col-12 py-2 rounded">
							<p className="text-start subtitle text-center h2">
								Synopsis
							</p>
						</div>
					</div>
					<div className="row mb-2 justify-content-center">
						<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="col-lg-10 col-12 rounded py-4">
							<p className="h4 text-start text-light py-2">
								{info.overview}
							</p>
						</div>
					</div>
					<div className="row mt-5 justify-content-center">
						<div className="col-xl-5 col-lg-11 col-12 px-sm-0 my-3">
							<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="rounded px-5 py-4 text-start">
								<div className="row">
									<div className="col-12">
										<p className="subtitle h2 fw-bold">Directors</p>
									</div>
								</div>
								<div className="row d-flex flex-nowrap overflow-auto">
									{directors.map((_, index) => (
										<p className="bg-success rounded py-2 text-center m-1 col-sm-6 col-md-4 text-light mt-2" key={index}>{directors[index]}</p>
									))}
								</div>
								<div className="row mt-5">
									<div className="col-12 mt-2">
										<p className="subtitle h2 fw-bold">Writers</p>
									</div>
								</div>
								<div className="row d-flex flex-nowrap overflow-auto">
									{writers.map((_, index) => (
										<p className="bg-success py-2 text-center m-1 rounded col-sm-6 col-md-4 text-light" key={index}>{writers[index]}</p>
									))}
								</div>
								<div className="row mt-5">
									<div className="col-12 mt-2">
										<p className="subtitle h2 fw-bold">Cast</p>
									</div>
								</div>
								<div className="row d-flex flex-nowrap overflow-auto">
									{cast.map((_, index) => (
										<div className=" bg-success text-start py-1 rounded col-sm-8 col-md-5 text-light m-1" key={index}>
											<p className="mt-4">{"Name : " + cast[index]}</p>
											<p>{"Character : " + castChar[index]}</p>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="col-xl-5 col-lg-11 m-0 m-lg-3">
							<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="row justify-content-center rounded  px-md-5 py-4">
								<p className="subtitle h2 mb-4 fw-bold">Comments</p>
								<div style={{ maxHeight: "500px" }} className="row justify-content-center d-flex overflow-auto">
									{Object.values(comments).length > 0 ?
										comments.map((_, index) => (
											<div  style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} className="row rounded justify-content-center text-white my-2 pt-3" key={index}>
												<div className="row rounded justify-content-center">
													<div style={{ backgroundColor: "rgba(39, 76, 39, 1)" }} className="col-12 rounded d-flex flex-nowrap overflow-auto">
														<p className="text-start h4 fw-bold">{comments[index].userName}</p>
														{comments[index].userId == store.userId && store.token && store.token != "" && store.token != null ?
															<button onClick={() => { removeComment() }} className="d-flex ms-auto p-2 btn btn-outline-danger"><i className="my-auto fa-solid fa-trash fa-lg text-danger-emphasis"></i></button> : null}
													</div>
												</div>
												<div className="row justify-content-center  text-start">
													<div className="col py-2 d-flex flex-wrap overflow-auto">
														<p className="text-center" >{comments[index].text}</p>
													</div>
												</div>
											</div>
										)) : null}
								</div>
								{store.token && store.token != "" && store.token != null ?
										<div className="row justify-content-center">
											<form className="d-grid gap-2">
												<textarea className="form-control text-light bg bg-dark" onChange={(e) => { setNewComment(e.target.value) }} placeholder="New Comment" maxLength={250} rows="3"></textarea>
											</form>
											<button onClick={() => { addNewComment(newcomment) }} className="btn btn-secondary mb-3">Post Comment</button>
										</div> :
										null}
							</div>
						</div>
					</div>
				</div>
			</div>
			:

			<div className="container-fluid text-center mt-5 text-light">
				<h1 className="text-white-50 display-1 fw-bold">{info.name}</h1>
				<p className="text-secondary h2 my-5 fw-bold">{info.tagline}</p>
				<div className="row justify-content-center mt-5">
					<div style={{ backgroundColor: "rgba(54, 138, 33, 1)" }} className="col-md-2 rounded col-sm-6 m-2">
						<p className="text-center text-light fw-bold fs-5">
							Release : {info.first_air_date}
						</p>
					</div>
					<div style={{ backgroundColor: "rgba(47, 165, 130, 1)" }} className="col-md-2 rounded col-sm-6 m-2">
						<p className="text-center text-light fw-bold fs-5">
							Rating : {info.adult ? "R" : "PG"}
						</p>
					</div>
					<div className="col-md-2 col-sm-6 m-2 rounded bg-primary bg-opacity-50">
						<p className="text-center text-light fw-bold fs-5">
							Episodes : {info.number_of_episodes}
						</p>
					</div>
					<div className="col-md-2 col-sm-6 m-2 rounded bg-info bg-opacity-50">
						<p className="text-center text-light fw-bold fs-5">
							Seasons : {info.number_of_seasons}
						</p>
					</div>
				</div>
				<div style={{ backgroundImage: "url('" + backLink + "')", height: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", borderRadius: "12px" }} className="py-5 Background row justify-content-center">
					<div className="col-md-4 col-sm-6">
						<img className="poster img-fluid border border-black border-5" src={posterLink} />
					</div>
					<div className="col-xl-6 m-1 mt-lg-2 col-lg-8 video">
						{videoKey !== "" ? <ReactPlayer
							url={"https://www.youtube.com/watch?v=" + videoKey}
							controls={true}
							width="650px"
							height="400px"
							className="poster img-fluid border border-black border-5  m-auto"
						/>
							:
							<div></div>
						}
					</div>
				</div>
				<div className="my-5 text-warning row justify-content-evenly">
					{
						(info.vote_average / 2) <= 0.5 || info.vote_average / 2 == NaN || info.vote_average / 2 == undefined ?
							<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
								<i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
							</div>
							:
							(info.vote_average / 2) <= 1.5 && (info.vote_average / 2) > 0.5 ?
								<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
									<i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
								</div>
								:
								(info.vote_average / 2) <= 2.5 && (info.vote_average / 2) > 1.5 ?
									<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
										<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
									</div>
									:
									(info.vote_average / 2) <= 3.5 && (info.vote_average / 2) > 2.5 ?
										<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
											<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
										</div>
										:
										(info.vote_average / 2) <= 4.5 && (info.vote_average / 2) > 3.5 ?
											<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
												<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-regular fa-star fa-4x"></i>
											</div>
											:
											<div className="col-xl-4 col-lg-6 mb-4 col-sm-12">
												<i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i><i className="fa-solid fa-star fa-4x"></i>
											</div>
					}
					<div className="col-xl-4 col-lg-6 col-sm-12">
						{store.token && store.token != "" && store.token != null ?
							Object.values(favorite).length > 0 ?
								favorite.status == "watching" ?
									<div className="d-grid gap-2">
										<button className="btn btn-outline-success btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
											<i className="fa-solid fa-eye fa-lg me-3 text-success-emphasis"></i>Watching
										</button>
										<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
											<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { removeFavorite() }}><i className="fa-solid fa-trash ms-1 fa-lg me-3 text-danger"></i>Remove</button></li>
											<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watched") }}><i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Change to Watched</button></li>
											<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("planToWatch") }}><i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>Change to Plan to Watch</button></li>
										</ul>
									</div>
									:
									favorite.status == "watched" ?
										<div className="d-grid gap-2">
											<button className="btn btn-outline-secondary btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
												<i className="fa-solid fa-eye fa-lg me-3 text-secondary-emphasis"></i>Watched
											</button>
											<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
												<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { removeFavorite() }}><i className="fa-solid fa-trash ms-1 fa-lg me-3 text-danger"></i>Remove</button></li>
												<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watching") }}><i className="fa-solid fa-eye fa-lg me-3 text-success"></i>Change to Watching</button></li>
												<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("planToWatch") }}><i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>Change to Plan to Watch</button></li>
											</ul>
										</div>
										:
										favorite.status == "planToWatch" ?
											<div className="d-grid gap-2">
												<button className="btn btn-outline-primary btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
													<i className="fa-solid fa-eye fa-lg me-3 text-primary-emphasis"></i>Plan To Watch
												</button>
												<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
													<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { removeFavorite() }}><i className="fa-solid fa-trash ms-1 fa-lg me-3 text-danger"></i>Remove</button></li>
													<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watching") }}><i className="fa-solid fa-eye fa-lg me-3 text-success"></i>Change to Watching</button></li>
													<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { updateFavorite("watched") }}><i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Change to Watched</button></li>
												</ul>
											</div>
											:
											<div>

											</div>
								:
								<div className="d-grid gap-2">
									<button className="btn btn-success btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
										<i className="fa-solid fa-square-plus fa-2xl me-5"></i>Add to a List
									</button>
									<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
										<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { addFavorite("watching") }}><i className="fa-solid fa-eye fa-lg me-3 text-success"></i>Watching</button></li>
										<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { addFavorite("watched") }}><i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Watched</button></li>
										<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { addFavorite("planToWatch") }}><i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>Plan to Watch</button></li>
									</ul>
								</div>
							:
							<div className="d-grid gap-2">
								<button className="btn btn-success btn-lg py-3 dropdown-toggle fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									<i className="fa-solid fa-square-plus fa-2xl me-5"></i>Add to a List
								</button>
								<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
									<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { navigate("/login") }}><i className="fa-solid fa-eye fa-lg me-3 text-success"></i>Watching</button></li>
									<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { navigate("/login") }}><i className="fa-solid fa-eye fa-lg me-3 text-secondary"></i>Watched</button></li>
									<li><button className="dropdown-item px-4 fs-3" type="button" onClick={() => { navigate("/login") }}><i className="fa-solid fa-eye fa-lg me-3 text-primary"></i>Plan to Watch</button></li>
								</ul>
							</div>
						}
					</div>
					<div className="row"><div className=" Filler col-12 mb-2"></div></div>
					<div className="row justify-content-center mt-5">
						<div style={{ backgroundColor: "rgba(21, 40, 21, 1)" }} className="col-lg-10 col-12 py-2 rounded">
							<p className="text-start subtitle text-center h2">
								Synopsis
							</p>
						</div>
					</div>
					<div className="row mb-2 justify-content-center">
						<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="col-lg-10 col-12 rounded py-4">
							<p className="h4 text-start text-light py-2">
								{info.overview}
							</p>
						</div>
					</div>
					<div className="row mt-5 justify-content-center">
						<div className="col-xl-5 col-lg-11 col-12 px-0 my-3">
							<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="rounded px-5 py-4 text-start">
								<div className="row">
									<div className="col-12">
										<p className="subtitle h2 fw-bold">Directors</p>
									</div>
								</div>
								<div className="row d-flex flex-nowrap overflow-auto">
									{directors.map((_, index) => (
										<p className="bg-success rounded py-2 text-center m-1 col-sm-6 col-md-4 text-light mt-2" key={index}>{directors[index]}</p>
									))}
								</div>
								<div className="row mt-5">
									<div className="col-12 mt-2">
										<p className="subtitle h2 fw-bold">Writers</p>
									</div>
								</div>
								<div className="row d-flex flex-nowrap overflow-auto">
									{writers.map((_, index) => (
										<p className="bg-success py-2 text-center m-1 rounded col-sm-6 col-md-4 text-light" key={index}>{writers[index]}</p>
									))}
								</div>
								<div className="row mt-5">
									<div className="col-12 mt-2">
										<p className="subtitle h2 fw-bold">Cast</p>
									</div>
								</div>
								<div className="row d-flex flex-nowrap overflow-auto">
									{cast.map((_, index) => (
										<div className=" bg-success text-start py-1 rounded col-sm-8 col-md-5 text-light m-1" key={index}>
											<p className="mt-4">{"Name : " + cast[index]}</p>
											<p>{"Character : " + castChar[index]}</p>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="col-xl-5 col-lg-11 m-0 m-lg-3">
							<div style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} className="row justify-content-center rounded  px-md-5 py-4">
								<p className="subtitle h2 mb-4 fw-bold">Comments</p>
								<div style={{ maxHeight: "500px" }} className="row justify-content-center d-flex overflow-auto">
									{Object.values(comments).length > 0 ?
										comments.map((_, index) => (
											<div  style={{ backgroundColor: "rgba(82, 117, 82, 1)" }} className="row rounded justify-content-center text-white my-2 pt-3" key={index}>
												<div className="row rounded justify-content-center">
													<div style={{ backgroundColor: "rgba(39, 76, 39, 1)" }} className="col-12 rounded d-flex flex-nowrap overflow-auto">
														<p className="text-start h4 fw-bold">{comments[index].userName}</p>
														{comments[index].userId == store.userId && store.token && store.token != "" && store.token != null ?
															<button onClick={() => { removeComment() }} className="d-flex ms-auto p-2 btn btn-outline-danger"><i className="my-auto fa-solid fa-trash fa-lg text-danger-emphasis"></i></button> : null}
													</div>
												</div>
												<div className="row justify-content-center  text-start">
													<div className="col py-2 d-flex flex-wrap overflow-auto">
														<p className="text-center" >{comments[index].text}</p>
													</div>
												</div>
											</div>
										)) : null}
								</div>
								{store.token && store.token != "" && store.token != null ?
										<div className="row justify-content-center">
											<form className="d-grid gap-2">
												<textarea className="form-control text-light bg bg-dark" onChange={(e) => { setNewComment(e.target.value) }} placeholder="New Comment" maxLength={250} rows="3"></textarea>
											</form>
											<button onClick={() => { addNewComment(newcomment) }} className="btn btn-secondary mb-3">Post Comment</button>
										</div> :
										null}
							</div>
						</div>
					</div>
				</div>
			</div>
		: <div><p className="display-4 text-center text-light ">Not Found</p></div>);
};

Details.propTypes = {
	match: PropTypes.object
};