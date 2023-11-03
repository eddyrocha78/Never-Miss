import React, { useContext, useState } from "react";
import "../../styles/signup.css";
import { Context } from "../store/appContext";

export const SignupForm = () => {
	const { store, actions } = useContext(Context);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	  });
	
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({...formData, [name]: value});
	  };

	  const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
		  alert("Passwords don't match");
		  return;
		}
	
		onSignup(formData);
	  };
	
	
	  return (
		<div className="signup-wrapper">
			<div className="signup-form col-md-6 offset-md-3">
			<form onSubmit={handleSubmit} className="row">
				<h1>Never Miss</h1>
				<p>another movie or episode ever again!</p>
				<div className="row justify-content-evenly mb-3">
					<div className="col-md-6">
						<input type="text" placeholder="First Name" name="firstName" onChange={handleChange} required/>
					</div>
					<div className="col-md-6">
						<input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} required/>
					</div>
				</div>

				<div className="col-12 mb-3">
					<input type="email" placeholder="Email" name="email" onChange={handleChange} required/>
				</div>
				<div className="col-12 mb-3">
					<input type="password" placeholder="Password" name="password" onChange={handleChange} required/>
				</div>
				<div className="col-12 mb-3">
					<input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} required/>
				</div>

				<div className="row justify-content-center">
					<div className="form-check col-auto mb-3">
						<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
						<label class="form-check-label" for="flexCheckDefault">
						I've read and agree with the <a>Terms and Conditions</a>
						</label>
					</div>
				</div>

				<div className="row justify-content-center">
					<button className="col-auto mb-3" type="submit" onClick={ (e) =>
						{e.preventDefault() 
						actions.signup(formData)
						}}>Sign Up</button>
				</div>
			</form>
			</div>
		</div>
	  );
	}