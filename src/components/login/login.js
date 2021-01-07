import React, { useState } from "react";
import signupJpg from "../../assets/images/signup.jpg";
import "../../assets/css/style.css";
import axios from "axios";
import { API_BASE_URL } from "../Constants/constants";
import GoogleLogin from "./googleLogin";
import FacebookLogin from "./facebookLogin";

export default props => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = () => {
		axios({
			method: "POST",
			url: API_BASE_URL + "login/",
			headers: { "Content-Type": "application/json" },
			data: { username: username, password: password },
		})
			.then(response => {
				console.warn(response.data);
				if (response.data.message == "login_Success") {
					props.setIsUserLoggedIn(true);
					props.setUsername(username);
					props.setAuthToken(response.data.authToken);
				} else alert("login failed");
			})
			.catch(reason => alert("login failed" + reason));
	};

	return (
		<div>
			<header>
				<div className="head-container">
					<h1 className="title-container">Food Delight</h1>
				</div>
			</header>

			<main>
				<div className="main-container">
					<div className="social-btn">
						<GoogleLogin {...props} />
						<FacebookLogin {...props} />
					</div>
					<div className="form-container">
						<h2 className="form-title">Sign in with Email</h2>

						<input
							type="text"
							className="form-input user-input"
							name="username"
							placeholder="Username"
							onChange={evnt => setUsername(evnt.target.value)}
							required
						/>

						<input
							type="password"
							className="form-input pass-input"
							id="password"
							name="password"
							placeholder="Password"
							onChange={evnt => setPassword(evnt.target.value)}
							required
						/>
						<button className="signup-btn" onClick={handleSignIn}>
							Login
						</button>
						<button
							className="signup-btn"
							type="button"
							onClick={() => props.setIsRegister(true)}
						>
							Register
						</button>
					</div>
				</div>
			</main>
			<img className="food-image" src={signupJpg} alt="signup-image" />
		</div>
	);
};
