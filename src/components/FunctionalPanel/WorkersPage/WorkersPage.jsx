import React from "react";
import { AppContext } from "../../../contexts/context";

import styles from "./WorkersPage.module.css";

function WorkersPage() {
	const [state, dispatch] = React.useContext(AppContext);
	const [workers, setWorkers] = React.useState([]);

	React.useEffect(() => {
		async function getWorkers() {
			let shops = await state.contractInstance.methods.showShops().call();
			for (let shop of shops) {
				if (shop.shop_address == state.currentAcc) {
					setWorkers(shop.workers);
					break;
				}
			}
		}
		getWorkers();
	}, []);

	return (
		<ul className={styles.list}>
			{workers.map((worker, index) => {
				if (worker != "0x0000000000000000000000000000000000000000") {
					return (
						<li key={index} className={styles.worker}>
							<p className={styles.inner}>{worker}</p>
						</li>
					);
				}
			})}
		</ul>
	);
}

export default WorkersPage;
