import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<ul className="list-group">
				{store.demo.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background }}>
							<Link to={"/single/" + index}>
								<span>Link to: {item.title}</span>
							</Link>
							{// Conditional render example
							// Check to see if the background is orange, if so, display the message
							item.background === "orange" ? (
								<p style={{ color: item.initial }}>
									Check store/flux.js scroll to the actions to see the code
								</p>
							) : null}
							<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
								Change Color
							</button>
						</li>
					);
				})}
			</ul>
			<br />
			<div className="row">
				<div className="col">
					<Link to="/movie/details/299054">
						<span className="btn btn-primary btn-lg" href="#" role="button">
							The Expandables
						</span>
					</Link>
				</div>
				<div className="col">
					<Link to="/tv/details/221802">
						<span className="btn btn-primary btn-lg" href="#" role="button">
							the Nurse (series)
						</span>
					</Link>
				</div>
				<div className="col">
					<Link to="/movie/details/507089">
						<span className="btn btn-primary btn-lg" href="#" role="button">
							Five nights at freddy's
						</span>
					</Link>
				</div>
			</div>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
