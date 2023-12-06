import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";

export const ResetPassword = props => {
	const { store, actions } = useContext(Context);
    const params = useParams();
	const navigate = useNavigate();
	const [isChecked, setIsChecked] = useState(false);
	const [error, setError] = useState(null);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Passwords don't match");
			return;
		}
		setError(null);
		let isSignedUp = await actions.resetPassword(password,params.token)
		if (isSignedUp) {
			navigate("/login");
		}
	};



	return (

		<div className="container-fluid" >
			<div className=" text-white rounded p-4 my-5 col-md-4 mx-auto" style={{ backgroundColor: "rgba(37, 53, 37, 1)" }} >
				<div className="row">
					<div className="text-center">
						<h1 className="display-5">Add a New Password</h1>
						<p>{error && { error }}</p>
					</div>
					{store.token && store.token !== null && store.token !== "" ? (
						<div className="row text-center">
							<h5 className="text-center">You are already an esteemed member</h5>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="row m-3">
							<div className="row">
								<div className="col-md-6 text-start mb-3">
									<label htmlFor="password" className="form-label">Password :</label>
								</div>
								<div className="col-md-6 mb-3">
									<input id="password" className="form-control" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 mb-3 text-start mx-auto">
									<label htmlFor="passwordcheck" className="form-label">Confirm Password :</label>
								</div>
								<div className="col-md-6 mb-3 mx-auto">
									<input id="passwordcheck" className="form-control" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
								</div>
							</div>

							<div className="row justify-content-center">
								<button className="col-3 btn btn-success" type="submit">Change Password</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
ResetPassword.propTypes = {
	match: PropTypes.object
};