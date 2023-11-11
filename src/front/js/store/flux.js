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
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Loging out");
				setStore({ token: null });
			},

			login: async (email, password) => {
				console.log(email, password);
				try {
					// Creating opts for the fetch
					const opts = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: email,
							password: password
						})
					};


					const resp = await fetch(process.env.BACKEND_URL + "api/login", opts)

					console.log(resp)
					if (!resp.ok) {
						alert("Error detected");
						return false;
					}

					const data = await resp.json();
					console.log("Backend data", data);

					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;

				}
				catch (error) {
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

				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/signup", opts)

					console.log(resp)
					if (!resp.ok) {
						alert("Error detected");
						return false;
					}

					const data = await resp.json();
					console.log(data)

					return true;
				}
				catch (error) {
					console.error("Error detected on login")
				}

			},


			forgotPassword: async (modalData) => {
				console.log(modalData);
				//insert 3rd party API to send email to user with backend stored email
				try {
					const resp = await fetch("https://expert-space-sniffle-rjqgqg6rvj4cxgg-3001.app.github.devapi/users");
					const data = await resp.json()
					console.log(data)

					return true;
				}
				catch (error) {
					console.error("Error detected on sending user password")
				}
			},


			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello", opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

		}
	};
};

export default getState;
