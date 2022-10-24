import React from "react";
import { AppContext } from "../../../contexts/context";

import styles from "./ShopsPage.module.css";

function ShopsPage() {
	const [state, dispatch] = React.useContext(AppContext);
	const [shops, setShops] = React.useState([]);

	async function deleteShop(id) {
		await state.contractInstance.methods
			.removeShop(id)
			.send({ from: state.currentAcc, gas: "6721975" });
		await state.contractInstance.methods
			.addHistory(
				state.currentAcc,
				`You deleted shop: ${shops[id].shop_address}`
			)
			.send({ from: state.currentAcc, gas: "6721975" });
		alert(`Shop ${shops[id].shop_address} deleted`);
		dispatch({ type: "ACTIVITY" });
	}

	function renderButtons(id) {
		if (state.activeRole == 2) {
			return (
				<button
					onClick={() => {
						deleteShop(id);
					}}
				>
					Delete
				</button>
			);
		} else {
			return null;
		}
	}

	React.useEffect(() => {
		async function getShops() {
			try {
				let resp = await state.contractInstance.methods
					.showShops()
					.call();
				setShops(resp);
			} catch (error) {
				//todo
			}
		}
		getShops();
	}, [state.activity]);

	return (
		<ul className={styles.list}>
			{shops.map((shop, id) => {
				if (
					shop.shop_address !=
					"0x0000000000000000000000000000000000000000"
				) {
					return (
						<li key={id} className={styles.shop}>
							<div className={styles.shop_info}>
								<p>Address: {shop.shop_address}</p>
								<p>City: {shop.city}</p>
							</div>
							{renderButtons(id)}
						</li>
					);
				}
			})}
		</ul>
	);
}

export default ShopsPage;
