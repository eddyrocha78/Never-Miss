import React, { useContext, useState } from "react";

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
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords don't match");
			return;
		} navigate("/signup");

		setError(null);
		let isSignedUp = await actions.signup(formData);
		if (isSignedUp) {
			actions.login(formData.email, formData.password)
			navigate("/")
		}
	};



	return (

		<div className="container-fluid" >
			<div className=" text-white rounded p-4 my-5 col-md-4 mx-auto" style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} >
				<div className="row">
					<div className="text-center">
						<h1 className="display-4">Never Miss</h1>
						<p className="fs-3 text-white-50">another movie or episode ever again!</p>
						<p>{error && { error }}</p>
					</div>
					{store.token && store.token !== null && store.token !== "" ? (
						<div className="row text-center">
							<h5 className="text-center">You are already an esteemed member</h5>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="row m-3">
							<div className="row d-flex text-start">
								<div className="col-md-6 mb-3">
									<label htmlFor="firstname" className="form-label">First Name:</label>
									<input id="firstname" className="form-control" type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
								</div>
								<div className="col-md-6 mb-3">
									<label htmlFor="lastname" className="form-label">Last Name:</label>
									<input id="lastname" className="form-control" type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
								</div>
							</div>

							<div className="row ">
								<div className="col-md-6 text-start mb-3">
									<label htmlFor="email" className="form-label">Email :</label>
								</div>
								<div className="col-md-6  mb-3">
									<input id="email" className="form-control" type="email" name="email" placeholder="Email" onChange={handleChange} required />
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 text-start mb-3">
									<label htmlFor="password" className="form-label">Password :</label>
								</div>
								<div className="col-md-6 mb-3">
									<input id="password" className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} required />
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 mb-3 text-start mx-auto">
									<label htmlFor="passwordcheck" className="form-label">Confirm Password :</label>
								</div>
								<div className="col-md-6 mb-3 mx-auto">
									<input id="passwordcheck" className="form-control" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
								</div>
							</div>

							<div className="row justify-content-center">
								<button className="col-3 btn btn-success" type="submit">Sign Up</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}