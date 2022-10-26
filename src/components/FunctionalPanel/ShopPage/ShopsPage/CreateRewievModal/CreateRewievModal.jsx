import React from "react";
import { AppContext } from "../../../../../contexts/context";

import styles from "./CreateRewievModal.module.css";

function CreateRewievModal({ active, setActive, shop, id }) {
	const [state, dispatch] = React.useContext(AppContext);
	const [rating, setRating] = React.useState(1);
	const [text, setText] = React.useState("");

	function close(e) {
		if (e.currentTarget == e.target) {
			setActive(false);
		}
	}

	async function createRewiev() {
		await state.contractInstance.methods
			.createRewiev(id, rating, text)
			.send({ from: state.currentAcc, gas: "6721975" });

		await state.contractInstance.methods
			.addHistory(
				state.currentAcc,
				`You have created a review for the store ${shop.shop_address}`
			)
			.send({ from: state.currentAcc, gas: "6721975" });

		dispatch({ type: "ACTIVITY" });

		setRating(1);
		setText("");
		alert("Review created");
		setActive(false);
	}

	return (
		<div
			className={active ? styles.modal_wrap : styles.hide}
			onClick={(e) => {
				close(e);
			}}
		>
			<div className={styles.modal}>
				<div className={styles.modal_content}>
					<h1>Create rewiev</h1>
					<div className={styles.content_div}>
						<p>Shop: {shop.shop_address}</p>
					</div>
					<div className={styles.content_div}>
						<p>Rate: {rating}</p>
						<input
							type="range"
							min="1"
							max="10"
							step="1"
							value={rating}
							onChange={(e) => {
								setRating(e.target.value);
							}}
							className={styles.range}
						/>
					</div>
					<div className={styles.content_div}>
						<textarea
							name="text"
							placeholder="Rewiev text"
							maxLength="150"
							value={text}
							onChange={(e) => {
								setText(e.target.value);
							}}
						></textarea>
					</div>
					<div className={styles.buttons_div}>
						<button onClick={createRewiev}>Create</button>
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

export default CreateRewievModal;
