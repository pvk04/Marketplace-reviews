import React from "react";
import NavElement from "../NavElement/NavElement";

import styles from "./BuyerBar.module.css";

function BuyerBar(){
    return(
        <nav>
            <ul>
                <li className={styles.nav_elem}>
                    <NavElement href={"createrequest"} text={"Role change request"}/>
                </li>
                <li className={styles.nav_elem}>
                    <NavElement href={"shops"} text={"Shops"}/>
                </li>
            </ul>            
        </nav>
    );
}

export default BuyerBar;