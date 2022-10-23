import React from "react";
import { AppContext } from "../../contexts/context";
import NavElement from "./NavElement/NavElement";

import styles from "./NavBar.module.css";

function NavBar(){
    const [state, dispatch] = React.useContext(AppContext);
    
    function adminBar(){
        if (state.activeRole == 2){
            return(
                <>
                    <li className={styles.nav_elem}>
                        <NavElement href={"requests"} text={"Requests"}/>
                    </li>
                    <li className={styles.nav_elem}>
                        <NavElement href={"changerole"} text={"Change role"}/>
                    </li>
                </>
            )
        }
    }

    return(
        <nav>
            <ul>
                <li className={styles.nav_elem}>
                    <NavElement href={"shops"} text={"Shops"}/>
                </li>
                <li className={styles.nav_elem}>
                    <NavElement href={"history"} text={"History"}/>
                </li>
                {adminBar()}
            </ul>            
        </nav> 
    );
}

export default NavBar;