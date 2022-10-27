import React from "react";
import { AppContext } from "../../../contexts/context";

import styles from "./NewShopModal.module.css";

function NewShopModal({ active, setActive }) {
	const [state, dispatch] = React.useContext(AppContext);
	const [addresses, setAddresses] = React.useState([]);
	const [selected, setSelected] = React.useState("");
	const [city, setCity] = React.useState("");
	const [password, setPassword] = React.useState("");

	function close(e) {
		if (e.currentTarget === e.target) {
			setActive(false);
		}
	}

	async function createNewShop() {
		let bytesPass = await state.web3.utils.soliditySha3({
			type: "string",
			value: password,
		});
		let resp = await state.contractInstance.methods
			.createNewShop(selected, city, bytesPass)
			.send({ from: state.currentAcc, gas: "6721975" });
		if (resp) {
			setCity("");
			setPassword("");
			alert("New store successfully created");
			await state.contractInstance.methods
				.addHistory(
					state.currentAcc,
					`You created shop "${selected}, ${city}"`
				)
				.send({ from: state.currentAcc, gas: "6721975" });
			dispatch({ type: "ACTIVITY" });
			setActive(false);
		}
	}

	React.useEffect(() => {
		async function getAdresses() {
			try {
				let shops = await state.contractInstance.methods
					.showShops()
					.call({ from: state.currentAcc });
				let addresses = await state.web3.eth.getAccounts();
				let resArr = [];
				console.log(addresses);
				for (let address of addresses) {
					let user = await state.contractInstance.methods
						.showUser(address)
						.call();
					let check = true;
					for (let shop of shops) {
						if (address == shop.shop_address) {
							check = false;
							break;
						}
					}
					if (
						check &&
						user.password ==
							"0x0000000000000000000000000000000000000000000000000000000000000000"
					) {
						resArr.push(address);
					}
				}
				setAddresses(resArr);
				setSelected(resArr[0]);
			} catch (error) {
				//todo
			}
		}
		getAdresses();
	}, [state.activity]);

	return (
		<div
			className={active ? styles.modal_wrap : styles.hide}
			onClick={(e) => {
				close(e);
			}}
		>
			<div className={styles.modal_prom}>
				<div className={styles.modal_prom_content}>
					<h1>Create new shop</h1>
					<div className={styles.content_div}>
						<p>Address:</p>
						<select
							value={selected}
							onChange={(e) => setSelected(e.target.value)}
						>
							{addresses.map((address, index) => {
								return (
									<option value={address} key={index}>
										{address}
									</option>
								);
							})}
						</select>
					</div>
					<div className={styles.content_div}>
						<p>City:</p>
						<input
							type="text"
							className={styles.city_inp}
							value={city}
							onChange={(e) => {
								setCity(e.target.value);
							}}
						/>
					</div>
					<div className={styles.content_div}>
						<p>Password:</p>
						<input
							type="text"
							className={styles.city_inp}
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<div className={styles.buttons_div}>
						<button
							onClick={() => {
								createNewShop();
							}}
						>
							Create
						</button>
					</div>
					<button
						className={styles.close_modal}
						onClick={() => {
							setActive(false);
						}}
					>
						<img src="/assets/close.svg" alt="" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default NewShopModal;
