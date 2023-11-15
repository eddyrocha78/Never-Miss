import { Navigate } from "react-router-dom";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userId: null,
			userEmail: null,
			userName: null,
			userLastName: null,
			userFavorites: [],
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



					const resp = await fetch(process.env.BACKEND_URL + "/api/login", opts)


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
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(signUpData)
				};

				try {

					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", options)


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


			forgotPassword: async (userEmail) => {

				
				try {

					const resp = await fetch(process.env.BACKEND_URL + "/api/forgot/" + userEmail)

					const data = await resp.json();
					console.log(data)

					return true;
				}
				catch (error) {
					console.error("Error detected" + error)
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
					const resp = await fetch(process.env.BACKEND_URL + "/api/user", opts)
					const data = await resp.json()
					setStore({ userId: data.id })
					setStore({ userEmail: data.email })
					setStore({ userName: data.name })
					setStore({ userLastName: data.lastName })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},


			addToList: async (userID, favoriteID, favoriteType, favoriteStatus) => {
				const opts = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						status: favoriteStatus
					})
				};



				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/users/" + userID + "/favorites/" + favoriteType + "/" + favoriteID, opts)

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
					console.error("Error detected" + error)
				}

			},
			getFavorites: async (userID) => {
				const opts = {
					method: "GET",
					headers: { "Content-Type": "application/json" }
				};



				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/users/" + userID + "/favorites", opts)
					const data = await resp.json();
					setStore({ userFavorites: data });

					return data;
				}
				catch (error) {
					console.error("Error detected" + error)
				}

			},
			addToList: async (userID, favoriteID, favoriteType, favoriteStatus) => {
				const opts = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						status: favoriteStatus
					})
				};



				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/users/" + userID + "/favorites/" + favoriteType + "/" + favoriteID, opts)

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
					console.error("Error detected" + error)
				}

			},
			deleteFavorite: async (userID, favoriteID, favoriteType) => {
				const opts = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" }
				};



				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/users/" + userID + "/favorites/" + favoriteType + "/" + favoriteID, opts)
					const data = await resp.json();
					setStore({ userFavorites: data });

					return data;
				}
				catch (error) {
					console.error("Error detected" + error)
				}

			},
			updateFavorite: async (userID, favoriteID, favoriteType, favoriteStatus) => {
				const opts = {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						status: favoriteStatus
					})
				};



				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/users/" + userID + "/favorites/" + favoriteType + "/" + favoriteID, opts)

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
					console.error("Error detected" + error)
				}

			}

		}
	};
};

export default getState;
