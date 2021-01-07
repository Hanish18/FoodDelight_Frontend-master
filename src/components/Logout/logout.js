import React from "react";
import { GoogleLogout } from "react-google-login";

export default props => {
	if (props.userType === "google") {
		return (
			<GoogleLogout
				clientId="165578072854-9fm3ip67busp7im0c2chqefn8vg69ls1.apps.googleusercontent.com"
				buttonText="Logout"
				render={renderProps => (
					<button onClick={renderProps.onClick} disabled={renderProps.disabled}>
						Logout
					</button>
				)}
				onLogoutSuccess={() => window.location.replace("/")}
			/>
		);
	}
	if (props.userType === "facebook") {
		const logout = () => {
			window.FB.logout();
			window.location.replace("/");
		};
		return <button onClick={logout}>Logout</button>;
	} else {
		return <button onClick={() => window.location.replace("/")}>Logout</button>;
	}
};
