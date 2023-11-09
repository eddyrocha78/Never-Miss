import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { ForgotPasswordModal } from "../component/modal";


export const Login = () => {
	const { store, actions } = useContext(Context);
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");	
	const navigate = useNavigate();

	console.log("This is your token", store.token);
	
	const handleClick = () => {
		actions.login(email, password);
		/*if(email!=store.user.email && password!=store.user.password) navigate("/signup");*/
		if(store.token && store.token !="" && store.token !=undefined) navigate("/");
	};
	
	
	return (
		<div className="login-wrapper py-5">
			<div className="login-form col-md-6 offset-md-3">
				<div className="avatar">
					{store.user.avatar}
					<img src="" alt="User Avatar" />
				</div>

				{(store.token && store.token!="" && store.token!=undefined) ? 
						<h5>{"User logged in with"}<p className="token text-justify col-md-6">{"Token: " + store.token}</p></h5>
						: 
						<>
						<h1>Login</h1>

						<div className="row">
							<div className="col mb-3 mt">
								<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
							</div>
						</div>
						<div className="login-button mt-3">
							<button onClick={handleClick}>Login</button>
						</div>
						<div className="my-3">
							<p>No account? <a href="/signup" id="signuplink">Sign Up</a></p>
							<a href="#" type="button" class="" data-bs-toggle="modal" data-bs-target="#forgot-password-modal">
							Forgot password?
							</a>
							<ForgotPasswordModal modalId={"forgot-password-modal"}/>
						</div>
					</>		
				}
			</div>
		</div>
	);
};