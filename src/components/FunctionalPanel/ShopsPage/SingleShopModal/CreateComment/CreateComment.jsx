import React from "react";
import { AppContext } from "../../../../../contexts/context";

import styles from "./CreateComment.module.css";

function CreateComment({ shop, rewiev }) {
	const [state, dispatch] = React.useContext(AppContext);
	const [comment, setComment] = React.useState("");

	async function commentRewiev() {
		await state.contractInstance.methods
			.commentRewiev(shop, rewiev, comment)
			.send({ from: state.currentAcc, gas: "6721975" });

		await state.contractInstance.methods.addHistory(
			state.currentAcc,
			"You commented rewiev"
		);

		dispatch({ type: "ACTIVITY" });
	}

	return (
		<div className={styles.comment_div}>
			<input
				type="text"
				maxLength="85"
				value={comment}
				className={styles.comment_input}
				onChange={(e) => {
					setComment(e.target.value);
				}}
			/>
			<button onClick={commentRewiev}>comment</button>
		</div>
	);
}

export default CreateComment;
