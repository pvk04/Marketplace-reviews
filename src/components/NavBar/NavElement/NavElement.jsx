import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavElement.module.css";

function NavElement({ href, text }) {
	return (
		<NavLink className={styles.link} to={href}>
			<p className={styles.text}>{text}</p>
		</NavLink>
	);
}

export default NavElement;
