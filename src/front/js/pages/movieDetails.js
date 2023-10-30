import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Details = () => {
	const { store, actions } = useContext(Context);

	const [info, setInfo ] = useState([]);
	
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
			.then(response => {console.log(response); setInfo(response)})
			.catch(err => console.error(err));
	}

	return (
		<div className="text-center mt-5">
			<h1>{info.title}</h1>
			<button className="btn btn-primary" onClick={getInfo}> Get Info</button>
			<p>
			{info.overview}
			</p>
		</div>
	);
};
