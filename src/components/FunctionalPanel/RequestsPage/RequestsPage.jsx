import React from "react";
import { AppContext } from "../../../contexts/context";

import styles from "./RequestPage.module.css";

function RequestsPage() {
	const [state, dispatch] = React.useContext(AppContext);
	const [requests, setRequests] = React.useState([]);
	const [shops, setShops] = React.useState([]);

	async function confirmRequest(id, request) {
		await state.contractInstance.methods
			.acceptRequest(id)
			.send({ from: state.currentAcc, gas: "6721975" });
		if (request.role == 1) {
			await state.contractInstance.methods
				.addHistory(
					state.currentAcc,
					`You accepted ${
						request.user
					}'s request and he became a seller at ${
						shops[request.shop].shop_address
					}`
				)
				.send({ from: state.currentAcc, gas: "6721975" });
		} else {
			await state.contractInstance.methods
				.addHistory(
					state.currentAcc,
					`You accepted ${request.user}'s request and he became a buyer`
				)
				.send({ from: state.currentAcc, gas: "6721975" });
		}
		alert("Request is confirmed");
		dispatch({ type: "ACTIVITY" });
	}

	React.useEffect(() => {
		async function getRequests() {
			try {
				let requests = await state.contractInstance.methods
					.showRequests()
					.call({ from: state.currentAcc });
				let shops = await state.contractInstance.methods
					.showShops()
					.call({ from: state.currentAcc });
				setRequests(requests);
				setShops(shops);
			} catch (error) {
				//todo
			}
		}
		getRequests();
	}, [state.activity]);

	return (
		<ul className={styles.list}>
			{requests.map((request, index) => {
				if (request.status == false) {
					return (
						<li key={index} className={styles.request_elem}>
							<div className={styles.request_content}>
								<p>User: {request.user}</p>
								<p>
									Role:{" "}
									{request.role == 0 ? "Buyer" : "Seller"}
								</p>
								{request.role == 1 ? (
									<p>
										Shop: {shops[request.shop].shop_address}
									</p>
								) : null}
							</div>
							<button
								className={styles.confirm}
								onClick={() => {
									confirmRequest(index, request);
								}}
							>
								Confirm
							</button>
						</li>
					);
				}
			})}
		</ul>
	);
}

export default RequestsPage;
