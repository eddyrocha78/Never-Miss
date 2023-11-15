import React, { useState, useContext } from 'react';
//import { ActionFunctionArgs } from 'react-router-dom/dist';
import "../../styles/forgetpassword.css";
import { Context } from "../store/appContext";


export const ForgotPasswordModal = (props) => {
	const { store, actions } = useContext(Context);
	const [error, setError] = useState(null);
	const [email, setEmail] = useState("");


	const handleSubmit = () => {
		actions.forgotPassword(email);

	};

	return (
		<div className="modal fade" id={props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog ">
				<div className=" modal-content sample rounded col-6">
					<div className=" modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">Forgot Password?</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className=" modal-body">
						<h6 className="text-start">Please enter your registered email bellow to recover password.</h6>
						<div className="row my-3 mx-1">
							<div className="col text-center">
								<label htmlFor="email">Enter your e-mail</label>
								<input className='form-control' type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
							</div>
						</div>
					</div>
					<div className=" modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" className="btn btn-success" onClick={handleSubmit}>Send password</button>
					</div>
				</div>
			</div>
		</div>
	);
};