import React from "react";
import { AppContext } from "../../../../../contexts/context";

import styles from "./Comments.module.css";

function Comments({shop, shop_id, rewiev }) {
	const [state, dispatch] = React.useContext(AppContext);
	const [comments, setComments] = React.useState([]);

	async function rateRewiev(rewiev, comment, rate) {
		await state.contractInstance.methods
			.leaveLikeDislikeOnComment(shop_id, rewiev, comment, rate)
			.send({ from: state.currentAcc });

		await state.contractInstance.methods.addHistory(
			state.currentAcc,
			"You rated comment"
		).send({from: state.currentAcc});

		dispatch({ type: "ACTIVITY" });
	}

	function renderLikes(rates, rewiev, comment) {
		let likes = 0;
		let dislikes = 0;
		let rated;

		for (let rate of rates) {
			if (rate.rate == true) likes++;
			if (rate.rate == false) dislikes++;
			if (rate.user == state.currentAcc && rate.rate == true) rated = 0;
			if (rate.user == state.currentAcc && rate.rate == false) rated = 1;
		}

		return (
			<div className={styles.btns}>
				<div>
					<span>{likes}</span>
					<button
						className={
							rated == undefined
								? styles.like
								: rated == 0
								? `${styles.like} ${styles.like_active}`
								: styles.like
						}
						onClick={() => {
							rateRewiev(rewiev, comment, true);
						}}
					>
						<img src="/assets/like.svg" alt="like" />
					</button>
				</div>
				<div>
					<span>{dislikes}</span>
					<button
						className={
							rated == undefined
								? styles.like
								: rated == 1
								? `${styles.like} ${styles.like_active}`
								: styles.like
						}
						onClick={() => {
							rateRewiev(rewiev, comment, false);
						}}
					>
						<img src="/assets/dislike.svg" alt="dislike" />
					</button>
				</div>
			</div>
		);
	}

	React.useEffect(() => {
		function getComments() {
			setComments(shop.rewievs[rewiev].comments);
			console.log(comments);
		}
		getComments();
	}, [state.activity]);

	return (
		<div>
			<ul className={styles.list}>
				{comments.map((comment, index) => {
					return (
						<li key={index} className={styles.element}>
							<p className={styles.address}>{comment.creator}:</p>
							<p>{comment.comment}</p>
							{renderLikes(comment.rates, rewiev, index)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Comments;
