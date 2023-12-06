import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

import { ForgotPasswordModal } from "../component/modal";


export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	if (store.token) {
		navigate("/userspace")

	}

	const handleClick = () => {
		actions.login(email, password);

	};


	return (
		<div className="container-fluid" >
			<div className=" text-white rounded p-4 my-5 col-md-4 mx-auto" style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} >
				<div className="text-center">
					<img className="img-fluid" src="https://static.thenounproject.com/png/3911675-200.png" alt="User Avatar" style={{ width: "20%" }} />
				</div>
				<div className="mt-3">
					{store.token && store.token !== null && store.token !== "" ? (
						<div className="row m-3">
							<h5 className="text-center">You are logged in !</h5>
							<Link className="text-start text-decoration-none text-light" to={"/"}>
								<p className="h5">Go to the main page here</p>
							</Link>
						</div>
					) : (
						<form  className="row m-3" onKeyDown={(e) => { e.key == "Enter" ? handleClick : null }}>
							<div className="col-md-6 mx-auto">
								<h1 className="text-center">Login</h1>
								<div className="mb-3">
									<input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
								</div>
								<div className="mb-3">
									<input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
								</div>
								<div className="text-center">
									<button className="btn btn-success btn-block mx-auto" onClick={handleClick}>Login</button>
								</div>
							</div>
							<div className="my-3 text-center">
								<p className="mb-0 fs-4">No account? <a href="/signup" className="fs-4" id="signuplink">Sign Up</a></p>
								<a href="#" className="fs-4" data-bs-toggle="modal" data-bs-target="#forgot-password-modal">
									Forgot password?
								</a>
								<ForgotPasswordModal modalId="forgot-password-modal" />
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};