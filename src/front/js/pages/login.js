import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import { ForgotPasswordModal } from "../component/modal";


export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	console.log("This is your token", store.token);

	if (store.token) {
		navigate("/")
	}
	
	const handleClick = () => {
		actions.login(email, password);
		/*if(email!=store.user.email && password!=store.user.password) navigate("/signup");*/
		
	};


	return (
		<div className="container-fluid" >
			<div className=" text-white rounded p-4 my-5 col-4 mx-auto" style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} >
				<div className="text-center">
					<img className="img-fluid" src="https://static.thenounproject.com/png/3911675-200.png" alt="User Avatar" style={{ width: "20%" }} />
				</div>
				<div className="mt-3">
					{store.token && store.token !== null && store.token !== "" ? (
						<>
							<h5 className="text-center">User logged in with</h5>
							<p className="text-justify">Token: {store.token}</p>
						</>
					) : (
						<>
							<div className="col-6 mx-auto">
								<h1 className="text-center">Login</h1>
								<div className="mb-3">
									<input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
								</div>
								<div className="mb-3">
									<input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
								</div>
								<div className="text-center">
									<button className="btn btn-success btn-block mx-auto" onClick={handleClick}>Login</button>
								</div>
							</div>
							<div className="my-3 text-center">
								<p className="mb-0">No account? <a href="/signup" id="signuplink">Sign Up</a></p>
								<a href="#" className="text-muted" data-bs-toggle="modal" data-bs-target="#forgot-password-modal">
									Forgot password?
								</a>
								<ForgotPasswordModal modalId="forgot-password-modal" />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};