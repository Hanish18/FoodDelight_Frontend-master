import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import axios from "axios";
import { API_BASE_URL } from "../Constants/constants";
import manageAccountJpg from "../../assets/images/manageAccount.jpg";
import AutoFillAddress from "./autoFillAddress";

export default props => {
	const [mobile, setMobile] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [existingPhone, setExistingPhone] = useState("");
	const [existingAddress, setExistingAddress] = useState("");
	const [reloadData, setReloadData] = useState("");

	useEffect(() => {
		axios({
			method: "POST",
			url: API_BASE_URL + "userdetails/",
			headers: {
				"Content-Type": "application/json",
				authToken: props.authToken,
			},
		})
			.then(response => {
				console.log(response.data);
				const jsonData = eval(response.data);
				setExistingPhone(jsonData.mobile_number);
				setMobile(jsonData.mobile_number)
				setAddress(jsonData.user_address)
				setExistingAddress(jsonData.user_address);
			})
			.catch(err => alert("Failed with error " + err));
	}, [reloadData]);

	const saveUserDetails = () => {
		console.info(props.username);
		axios({
			method: "POST",
			url: API_BASE_URL + "profile/",
			headers: {
				"Content-Type": "application/json",
				authToken: props.authToken,
			},
			data: {
				username: props.username,
				password: password,
				mobileNumber: mobile,
				address: address,
			},
		})
			.then(response => {
				if (response.data == "account details saved") {
					alert("Your account details saved successfully");
				} else {
					alert("Details not saved. Please enter again");
				}
			})
			.catch(err => alert("Failed with error " + err));
	};

	return (
		<div className="main-container">
			<img
				className="orderfood-image"
				src={manageAccountJpg}
				alt="orderFood-image"
			/>
			<div className="form-container">
				<h2 className="form-title">Manage Account</h2>
				<input
					type="text"
					className="form-input-text-input"
					name="username"
					value={props.username}
					readOnly="readOnly"
				/>

				<input
					type="text"
					className="form-input-text-input"
					name="password"
					placeholder="Enter Password"
					onChange={evnt => setPassword(evnt.target.value)}
				/>

				<input
					type="text"
					className="form-input-text-input"
					name="phone"
					placeholder="Enter Phone Number"
					onChange={evnt => setMobile(evnt.target.value)}
					defaultValue={existingPhone}
				/>
				<AutoFillAddress
					existingAddress={existingAddress}
					setAddress={setAddress}
				/>

				<button className="signup-btn" type="button" onClick={saveUserDetails}>
					Save
				</button>
			</div>
		</div>
	);
};
