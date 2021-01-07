import React from "react";
import ReactDOM from "react-dom";
import { GoogleLogin } from "react-google-login";
import googleSvg from "../../assets/images/google-icon.svg";
import axios from "axios";
import { API_BASE_URL } from "../Constants/constants";

export default props => {
	console.log(props);
	const responseGoogle = response => {
		console.log(response);
		const user = response.profileObj.email;
		axios({
			method: "POST",
			url: API_BASE_URL + "google",
			headers: {
				"Content-Type": "application/json",
				tokenId: response.tokenId,
			},
		})
			.then(response => {
				console.warn(response.data);
				if (response.data.message == "login_Success") {
					props.setIsUserLoggedIn(true);
					props.setUsername(user);
					props.setUserType("google");
					props.setAuthToken(response.data.authToken);
				} else alert("login failed");
			})
			.catch(reason => alert("login failed" + reason));
	};

	return (
		<div>
			<GoogleLogin
				clientId="165578072854-9fm3ip67busp7im0c2chqefn8vg69ls1.apps.googleusercontent.com"
				isSignedIn={false}
				buttonText="Login"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={"single_host_origin"}
				render={renderProps => (
					<button
						className="google-btn"
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
					>
						<div className="btn-container">
							<img src={googleSvg} alt="google icon" width="30" height="30" />
						</div>
						<span className="google-btn-text">Sign in via Google</span>
					</button>
				)}
			/>
		</div>
	);
};
