import React, { Component } from "react";

export const Footer = () => (
	<footer style={{ backgroundColor: "rgba(37, 53, 37, 1)" }}  className="pt-3 pb-3 text-white">
		<div className="row mx-4">
			<p className="text-center">Europoe <a href="https://4geeks.com">4 Geeks Academy</a> final Project</p>
		</div>
		<div style={{ backgroundColor: "rgba(16, 17, 18, 1)" }} className="row mx-4 py-2 rounded">
			<p className="text-center">Created by:</p>
			<ul   className="list-group list-group-horizontal text-center border-0 me-4">
				<li style={{ backgroundColor: "rgba(16, 17, 18, 1)" }} className="list-group-item col border-0"><i className="fa-brands fa-github fa-xl me-2 text-white"></i><a href="https://github.com/bennycarvalho13">Benny Carvalho</a></li>
				<li style={{ backgroundColor: "rgba(16, 17, 18, 1)" }} className="list-group-item col border-0"><i className="fa-brands fa-github fa-xl me-2 text-white"></i><a href="https://github.com/ZionSpardas">Daniel Barbosa</a></li>
				<li style={{ backgroundColor: "rgba(16, 17, 18, 1)" }} className="list-group-item col border-0"><i className="fa-brands fa-github fa-xl me-2 text-white"></i><a href="https://github.com/eddyrocha78">Eduardo Rocha</a></li>
				<li style={{ backgroundColor: "rgba(16, 17, 18, 1)" }} className="list-group-item col border-0"><i className="fa-brands fa-github fa-xl me-2 text-white"></i><a href="https://github.com/drbig30">David R</a></li>
			</ul>
		</div>
	</footer>
);
