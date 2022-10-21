import React from "react";
import NavElement from "../NavElement/NavElement";

import styles from "./AdminBar.module.css";

function AdminBar(){
    return (
        <nav>
            <ul>
                <li className={styles.nav_elem}>
                    <NavElement href={"requests"} text={"Requests"}/>
                </li>
                <li className={styles.nav_elem}>
                    <NavElement href={"changerole"} text={"Change role"}/>
                </li>
                <li className={styles.nav_elem}>
                    <NavElement href={"shops"} text={"Shops"}/>
                </li>
            </ul>            
        </nav>        
    )
}

export default AdminBar;