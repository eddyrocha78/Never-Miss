import React, { useContext, useState } from "react";
import "../../styles/signup.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [isChecked, setIsChecked] = useState(false);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	  });
	
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({...formData, [name]: value});
	  };

	  const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords don't match");
		  return;
		}
		
		setError(null);
		let isSignedUp = await actions.signup(formData);
		if(isSignedUp) {
			navigate("/login");
		}
	  };
	
	
	  return (
		<div className="signup-wrapper py-5">
			<div className="signup-form col-md-6 offset-md-3 ">
				<h1>Never Miss</h1>
				<p>another movie or episode ever again!</p>
				<p>{error && {error}}</p>

				<form onSubmit={handleSubmit} className="container  m-3">
					<div className="row justify-content-center">
						<div className="col-md-6 mb-3">
							<input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required/>
						</div>
						<div className="col-md-6 mb-3">
							<input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required/>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12 mb-3">
							<input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
						</div>
						<div className="col-md-12 mb-3">
							<input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
						</div>
						<div className="col-md-12 mb-3">
							<input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required/>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="form-check col-auto mb-3">
							<input className="form-check-input" type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
							<label className="form-check-label" htmlFor="flexCheckDefault">
							I've read and agree with the <a className="termsandconditions">Terms and Conditions</a>
							</label>
						</div>
					</div>

					<div className="row justify-content-center">
						<button disabled={!isChecked} className="col-auto mb-3" type="submit">Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	  );
	}