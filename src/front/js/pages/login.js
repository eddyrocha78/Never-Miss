import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
//import { ForgotPasswordModal } from "../component/modal";


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
		<div className="login-wrapper">
			<div className="login-form col-md-6 offset-md-3">
				<div className="avatar">
					{store.user.avatar}
					<img src="" alt="User Avatar" />
				</div>
				<div className="row m-3">
					{(store.token && store.token!="" && store.token!=undefined) ? 
						<h5>{"User logged in with"}<p className="token text-justify col-md-6">{"Token: " + store.token}</p></h5>
						: 
						<>
						<h1>Login</h1>
						<div className="col-md-6 mb-3 mt">
							<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
						</div>
						<div className="col-md-6 mb-3">
							<input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
						</div>
				
						<div className="login-button">
							<button onClick={handleClick}>Login</button>
						</div>
						<div className="my-3">
							<p>No account? <a href="/signup" id="signuplink">Sign Up</a></p>
							<a href="#" id="ForgotPasswordModal">Forgot Password?</a>
							<div id="ForgotPasswordModal" className="modal">
								
							</div>
						</div>
						</>
					} 
				</div>
				<button onClick={actions.logout}>Logout</button>
			</div>
		</div>
	);
};