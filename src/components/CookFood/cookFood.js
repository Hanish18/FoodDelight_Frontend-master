import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import axios from "axios";
import { API_BASE_URL } from "../Constants/constants";
import cookFoodJpg from "../../assets/images/cookfood.jpg";
import Orders from "./orders";

export default props => {
	const [tfn, setTfn] = useState("");
	const [abn, setAbn] = useState("");
	const [showOrders, setShowOrders] = useState("hideOrders");
	const [licenseNum, setLicenseNum] = useState("");
	const [reload, setReload] = useState(false);

	useEffect(() => {
		axios({
			method: "POST",
			url: API_BASE_URL + "checklicense/",
			headers: {
				"Content-Type": "application/json",
				authToken: props.authToken,
			},
		}).then(response => {
			console.log(response.data)
			if (response.data == "cook profile exists") {
				setShowOrders("showOrders")
			} else {
				setShowOrders("hideOrders")
			}
		})
		.catch((err) => alert("Error displaying screen"+err))

	},[reload])

	const saveCookDetails = () => {
		axios({
			method: "POST",
			url: API_BASE_URL + "cookfood/",
			headers: {
				"Content-Type": "application/json",
				authToken: props.authToken,
			},
			data: {
				tfn: tfn,
				abn: abn,
				licenseNum: licenseNum,
			},
		}).then(response => {
			if (response.data == "cook profile saved") {
				alert("Your details saved successfully");
				setReload(!reload)
			} else {
				alert("Details not saved. Please enter again");
			}
		});
	};

	return (
		<div className="main-container-cookfood">
			{showOrders == "showOrders" && <Orders authToken={props.authToken} route="orders/"/>}

			{showOrders == "hideOrders" && (
				<div className="form-container">
					<h2 className="form-title">Wanna Start Cooking?</h2>
					<input
						type="text"
						className="form-input-text-input"
						name="tfn"
						placeholder="Enter Tax File Number(TFN)"
						onChange={evnt => setTfn(evnt.target.value)}
						required
					/>

					<input
						type="text"
						className="form-input-text-input"
						name="abn"
						placeholder="Enter ABN"
						onChange={evnt => setAbn(evnt.target.value)}
						required
					/>

					<input
						type="text"
						className="form-input-text-input"
						name="licenseNum"
						placeholder="Cooking License Number"
						onChange={evnt => setLicenseNum(evnt.target.value)}
						required
					/>

					<button
						className="signup-btn"
						type="button"
						onClick={saveCookDetails}
					>
						Save
					</button>
				</div>
			)}
			<label hidden>{showOrders}</label>
		</div>
	);
};
