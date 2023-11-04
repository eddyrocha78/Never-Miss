import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			user: []
			
		},
		actions: {
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application loaded, synching session storage token");
				if(token && token !="" && token !=undefined) setStore({token: token});
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Loging out");
				setStore({token: null});
			},

			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				try{
				const resp = await fetch(process.env.BACKEND_URL + "api/token", opts)
				if (resp.status !== 200){
					alert("Error detected");
					return false;
				} 
				
				const data = await resp.json();
				console.log("Backend data", data);
				sessionStorage.setItem("token", data.access_token);
				setStore({token: data.acces_token});	
				return true;
				}
				catch(error){
					console.error("Error detected on login")
				}
			},

			signup: async (firstName, lastName, email, password, confirmPassword) => {
				try{
					// fetching data from the backend
					const opts = {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							firstName: firstName, 
							lastName: lastName, 
							email: email, 
							password: password, 
							confirmPassword: confirmPassword
						})
					};
					
				
				const resp = await fetch(process.env.BACKEND_URL + "api/signup", opts)
				const data = await resp.json()
				if (resp.status !== 200){
					alert("Error detected");
					return false;
				} 

				
				console.log("Backend data", data);
				setStore({user: firstName, lastName, email, password, confirmPassword});	
				return true;
				}
				catch(error){
					console.error("Error detected on login")
				}
			},
			

			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello", opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
		}
	};
};

export default getState;
