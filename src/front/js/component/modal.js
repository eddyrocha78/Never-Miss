import React, { useState, useContext } from 'react';
//import { ActionFunctionArgs } from 'react-router-dom/dist';
import "../../styles/forgetpassword.css";
import { Context } from "../store/appContext";


export const ForgotPasswordModal = (props) => {
    const { store, actions } = useContext(Context);
	const [error, setError] = useState(null);
	const [modalData, setModalData] = useState({
		firstName: '',
		lastName: '',
		email: ''
	  });
	
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setModalData({...modalData, [name]: value});
	  };

	  const handleSubmit = async (e) => {
		e.preventDefault();
		if (modalData.email !== store.users.email) {
			setError("Email is not registered in users");
		  return;
		}
		
		setError(null);
		let forgotPassword = await actions.forgotPassword(modalData);
		if(forgotPassword) {
			navigate("/login");
		}
	  };

	return (
        <div className="modal fade" id={ props.modalId } tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="passwordmodal modal-content">
                <div className="passwordmodal modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Forgot Password?</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="passwordmodal modal-body">
                    <h6 className="text-start">Please your registered email bellow to recover password.</h6>
                    <div className="row my-3 mx-1">
						<div className="col">
							<input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required/>
						</div>
						<div className="col">
							<input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required/>
						</div>
						<div className="col">
							<input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
						</div>
                    </div>
                </div>
                <div className="passwordmodal modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success" onClick={handleSubmit}>Send password</button>
                </div>
                </div>
            </div>
        </div>
	);
};