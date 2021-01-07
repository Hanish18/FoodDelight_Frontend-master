import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import axios from "axios";
import { API_BASE_URL } from "../Constants/constants";
import cookFoodJpg from "../../assets/images/cookfood.jpg";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
const useRowStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
});

function createData(name, orderId, dueDate, price, itemDesc, isAccepted) {
	return {
		name,
		orderId,
		dueDate,
		price,
		itemDesc,
		isAccepted
	};
}

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const classes = useRowStyles();

	const sendMessageToTwilio = () => {
		console.warn(props.authToken)
		axios({
			method: "POST",
			url: API_BASE_URL + "sms/",
			headers: {
				"Content-Type": "application/json",
				authToken: props.authToken,
			},
			data: { message: message },
		})
			.then(response => {
				console.log(response);
				if (response.data == "Message Sent") {
					alert("Message sent to user/cook.");
				} else {
					alert("Message sending failed. Please try again");
				}
			})
			.catch(error => alert("Message sent failed " + error));
	};

	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="right">{row.price}</TableCell>
				<TableCell align="right">{row.dueDate}</TableCell>
				<TableCell align="right">{row.isAccepted}</TableCell>
				<TableCell align="right">
					<Button
						variant="outlined"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{!open ? "Read More" : "Read Less"}
					</Button>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={0}>
							<Table size="small" aria-label="purchases">
								<TableBody>
									<TableRow key={row.orderId}>
										<TableCell align="right" component="th" scope="row">
											{row.itemDesc}
										</TableCell>
										<TableCell align="right" component="th" scope="row">
											{props.route == "myorders/" ? ("") : (
												<Button
													color="primary"
													variant="outlined"
													onClick={evnt => props.handleAcceptOrder(evnt)}
												>
													<p id={row.orderId}>Accept</p>
												</Button>
											) }
										</TableCell>
										<TableCell align="right">
											<TextField
												id="outlined-multiline-static"
												label="Message"
												multiline
												rows={4}
												placeholder="What's my order status?"
												onChange={evt => setMessage(evt.target.value)}
												variant="outlined"
											/>
										</TableCell>
										<TableCell align="right">
											<Button
												color="primary"
												variant="outlined"
												id={row.orderId}
												onClick={sendMessageToTwilio}
											>
												Send SMS
											</Button>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

Row.propTypes = {
	row: PropTypes.shape({
		orderId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.string.isRequired,
		dueDate: PropTypes.string.isRequired,
		itemDesc: PropTypes.string.isRequired,
		isAccepted: PropTypes.string.isRequired,
	}).isRequired,
};

export default props => {
	const [reloadData, setReloadData] = useState(true);
	const [rows, setRows] = useState([]);

	const handleAcceptOrder = evnt => {
		axios({
			method: "POST",
			url: API_BASE_URL + "accept/",
			headers: {
				"Content-Type": "application/json",
				authToken: props.authToken,
			},
			data: { order_id: evnt.target.id },
		})
			.then(response => {
				console.log(response);
				if (response.data == "order accepted") {
					alert("Order accepted. You can check it in my orders");
					setReloadData(!reloadData);
				} else {
					alert("order not accepted. Please try again");
				}
			})
			.catch(error => alert("accept failed " + error));
	};

	useEffect(() => {
		axios({
			method: "POST",
			url: API_BASE_URL + props.route,
			headers: {
				"Content-Type": "application/json",
				authToken: props.authToken,
			},
			data: { username: props.username },
		})
			.then(response => {
				console.log(response);
				if (response.data === "your orders are not accepted") {
					setRows([{name :"No orders are present currently.",id:""}]);
				} else {
					const res = eval(response.data);
					setRows(
						res.map(row =>
							createData(
								row.item_name,
								row._id,
								row.due_date,
								row.item_price,
								row.item_description,
								row.order_status ? "Yes" : "No"
							)
						)
					);
				}
			})
			.catch(ex => alert("Failed to receive content" + ex));
	}, [reloadData]);

	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell>Food item</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right">Due Date</TableCell>
						<TableCell align="right">IsAccepted</TableCell>
						<TableCell align="right">More Details</TableCell>
						<TableCell />
					</TableRow>
				</TableHead>
				<TableBody>
					 {rows.map(row => (
						<Row
							key={row.orderId}
							row={row}
							handleAcceptOrder={handleAcceptOrder}
							route={props.route}
							authToken={props.authToken}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
