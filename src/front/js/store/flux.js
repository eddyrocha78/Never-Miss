import { Navigate } from "react-router-dom";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userId: null,
			userEmail: null,
			userName: null,
			userLastName: null,
			userFavorites: [],
			comments : [],
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
					return resp;

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

					const resp = await fetch(process.env.BACKEND_URL + "/api/forgot_password/" + userEmail)
					if(resp.ok){
						alert("email sent successfully")
						return true;
					}else{
						const data = await resp.json();
						alert(data);
						return false;
					}
				}
				catch (error) {
					console.error("Error on Forgot Password :" + error)
					alert(error);
				}
			},

			resetPassword: async (password,token) => {

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						password: password
					})
				};

				try {

					const resp = await fetch(process.env.BACKEND_URL + "/api/reset_password/" + token, options)
					if(resp.ok){
						alert("Password reset successful")
						return true;
					}else{
						alert("Token Invalid Or Expired");
						return false;
					}
				}
				catch (error) {
					console.error("Error on Forgot Password :" + error)
					alert(error);
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
					const data = await resp.json();
					setStore({ userId: data.id });
					setStore({ userEmail: data.email });
					setStore({ userName: data.name });
					setStore({ userLastName: data.lastName });
					//console.log(data);
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
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
			addToList: async (userID, favoriteID, favoriteType, favoriteTitle, favoriteStatus, favoritePoster_path, favoriteRuntime) => {
				const opts = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						title: favoriteTitle,
						status: favoriteStatus,
						poster: favoritePoster_path,
						runtime: favoriteRuntime

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

			},

			editUser: async (userID, userFirstname, userLastName) => {
				const opts = {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						firstName: userFirstname,
						lastName: userLastName
					})
				};



				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/users/" + userID + "/edit", opts)

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

			getAllComments: async () => {

				const opts = {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				};
				
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/comments", opts)
					const data = await resp.json()
					// don't forget to return something, that is how the async resolves
					console.log(data)
					setStore({ comments: data })
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			addComment: async (userID, userFullName, text, targetType, targetId, title, poster) => {
				const opts = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userName : userFullName,
						text: text,
						targetName : title,
						targetPoster : poster
					})
				};



				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/users/" + userID + "/comment/" + targetType + "/" + targetId, opts)

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
			removeComment: async (userID, targetType, targetId) => {
				const opts = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" }
				};



				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/users/" + userID + "/comment/" + targetType + "/" + targetId, opts)
					const data = await resp.json();
					return data;
				}
				catch (error) {
					console.error("Error detected" + error)
				}

			}

		}
	};
};

export default getState;
