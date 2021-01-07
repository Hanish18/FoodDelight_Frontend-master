import React, { useState } from "react";
import "../../assets/css/style.css";
import axios from "axios";
import { API_BASE_URL } from "../Constants/constants";
import cookFoodJpg from "../../assets/images/cookfood.jpg";
import Orders from "./orders";

export default props => {
	
	return (
		<div className="main-container-cookfood">
			<Orders authToken={props.authToken} route="myorders/"/>
		</div>
	);
};
