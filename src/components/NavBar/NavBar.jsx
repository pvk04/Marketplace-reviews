import React from "react";
import { AppContext } from "../../contexts/context";
import NavElement from "./NavElement/NavElement";

import styles from "./NavBar.module.css";

function NavBar() {
	const [state, dispatch] = React.useContext(AppContext);

	function renderBar() {
		if (state.activeRole == 2) {
			return (
				<>
					<li className={styles.nav_elem}>
						<NavElement href={"shops"} text={"Shops"} />
					</li>
					<li className={styles.nav_elem}>
						<NavElement href={"requests"} text={"Requests"} />
					</li>
					<li className={styles.nav_elem}>
						<NavElement href={"changerole"} text={"Change role"} />
					</li>
					<li className={styles.nav_elem}>
						<NavElement href={"history"} text={"History"} />
					</li>
				</>
			);
		} else if (state.activeRole == 0 || state.activeRole == 1) {
			return (
				<>
					<li className={styles.nav_elem}>
						<NavElement href={"shops"} text={"Shops"} />
					</li>
					<li className={styles.nav_elem}>
						<NavElement href={"history"} text={"History"} />
					</li>
				</>
			);
		} else if (state.activeRole == 3) {
			return (
				<>
					<li className={styles.nav_elem}>
						<NavElement href={"workers"} text={"Workers"} />
					</li>
				</>
			);
		}
	}

	return (
		<nav>
			<ul>{renderBar()}</ul>
		</nav>
	);
}

export default NavBar;
