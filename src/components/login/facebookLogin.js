import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../Constants/constants";
import facebookSvg from "../../assets/images/facebook.svg";

export default props => {
	console.log(props);
	const launchFacebookLogin = () =>
		window.FB.login(
			function (response) {
				console.log(response);
				if (response.authResponse) {
					responseFacebook(response)
				} else {
					alert("You have cancelled login or fully authorize.");
				}
			},
			{ scope: "public_profile,email" }
		);

	const responseFacebook = response => {
		console.log(response);
		axios({
			method: "POST",
			url: API_BASE_URL + "facebook",
			headers: {
				"Content-Type": "application/json",
				accessToken: response.authResponse.accessToken,
			},
		})
			.then(response => {
				console.warn(response.data);
				if (response.data.message == "login_Success") {
					props.setIsUserLoggedIn(true);
					props.setUsername(response.data.username);
					props.setUserType("facebook");
					props.setAuthToken(response.data.authToken);
				} else alert("login failed");
			})
			.catch(reason => alert("login failed" + reason));
	};

	return (
		<div>
			<button onClick={launchFacebookLogin} className="facebook-btn">
				<div className="btn-container">
					<img src={facebookSvg} alt="facebookicon" width="30" height="30" />
				</div>
				<span className="facebook-btn-text">Sign in via Facebook</span>
			</button>
		</div>
	);
};
