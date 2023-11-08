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
				console.log(email, password);
				try{
				// Creating opts for the fetch
				const opts = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				
				const resp = await fetch(process.env.BACKEND_URL + "api/login", opts)

				console.log(resp)
					if(!resp.ok){
						alert("Error detected");
						return false;
					}

				const data = await resp.json();
				console.log("Backend data", data);

				sessionStorage.setItem("token", data.access_token);
				setStore({token: data.access_token});	
				return true;

				}
				catch(error){
					console.error("Error detected on login")
				}
				
			},

			signup: async (signUpData) => {
				console.log("DATA!!!!");
				console.log(signUpData);
				
				// Creating opts for the fetch
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(signUpData)
				};
				
				try{	
					const resp = await fetch(process.env.BACKEND_URL + "api/signup", opts);
					
					console.log(resp)
					if(!resp.ok){
						alert("Error detected");
						return false;
					}

					const data = await resp.json();
					console.log(data)

					return true;
				}
				catch(error){
					console.error("Error detected on login")
				}

			},
			
			getUsers: async (email) => {
				console.log(email);
				
				try{	
					const resp = await fetch(process.env.BACKEND_URL + "api/users");
					const data = await resp.json()
					console.log(data)

					return true;
				}
				catch(error){
					console.error("Error detected on login")
				}




				fetch('https://playground.4geeks.com/apis/fake/contact/agenda/biancas')
					.then(resp => {
						console.log("is response succesful: " + resp.ok); // will be true if the response is successfull
						console.log("status code: "+ resp.status); // the status code = 200 or code = 400 etc.
						return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(data => {
						//here is where your code should start after the fetch finishes
						console.log(data); //this will print on the console the exact object received from the server
						setStore({contacts: data})
						console.log(getStore().contacts)
					})
					.catch(error => {
						//error handling
						console.log(error);
					});
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
