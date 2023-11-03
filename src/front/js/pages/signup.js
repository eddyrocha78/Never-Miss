import React, { useContext, useState } from "react";
import "../../styles/signup.css";

export const SignupForm = () => {
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
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
	
		try {
			const response = await fetch('https://special-giggle-7g4qxww55qjhrx94-3001.app.github.dev/signup', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(formData),
			});
	  
			if (formData.password !== formData.confirmPassword && response.status === 201) {
			  alert('Signup successful!');
			} else {
			  alert('Signup failed. Please try again.')
			  console.log(formData);
			}
		  } catch (error) {
			console.error(error);
			alert('An error occurred. Please try again later.');
		  }
		  
		}
	  };
	
	  return (
		<div className="signup-wrapper">
			<div className="signup-form col-md-6 offset-md-3">
			<form onSubmit={handleSubmit} className="row">
				<h1>Never Miss</h1>
				<p>another movie or episode ever again!</p>
				<div className="row justify-content-evenly mb-3">
					<div className="col-md-6">
						<input type="text" placeholder="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required/>
					</div>
					<div className="col-md-6">
						<input type="text" placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required/>
					</div>
				</div>

				<div className="col-12 mb-3">
					<input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required/>
				</div>
				<div className="col-12 mb-3">
					<input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required/>
				</div>
				<div className="col-12 mb-3">
					<input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
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
					<button className="col-auto mb-3" type="submit">Sign Up</button>
				</div>
			</form>
			</div>
		</div>
	  );
	}