import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if(store.token && store.token !="" && store.token !=null) actions.getMessage();
	}, [store.token])

	let sessiontoken = sessionStorage.getItem("token")

	const [info, setInfo ] = useState();
	
	const getInfo = () => 
	{
		const options = {
			method: 'GET',
			headers: {
			  accept: 'application/json',
			  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjJjYjAxZWFiNThjNGRlNzdjOWNhMmY0ZGM4ODQ0NyIsInN1YiI6IjY1Mzk1YmFhZWM0NTUyMDBlYTRkNDMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cz3I9EbEUfEny1vJHlbpG7zW_2dSZRBsGCrx6Xy3768'
			}
		  };
		  
		  fetch('https://api.themoviedb.org/3/movie/299054?language=en-US', options)
			.then(response => response.json())
			.then(response => {console.log(response); /*setInfo(response)*/})
			.catch(err => console.error(err));
	}

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<button className="btn btn-primary" onClick={getInfo}> Get Info</button>
			Info : {info}

			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
				<p>Session: {sessiontoken}</p>
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
