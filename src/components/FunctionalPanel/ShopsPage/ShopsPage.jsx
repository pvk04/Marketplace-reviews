import React from "react";
import {AppContext} from "../../../contexts/context";

import styles from "./ShopsPage.module.css";

function ShopsPage(){
    const [state, dispatch] = React.useContext(AppContext);
    const [shops, setShops] = React.useState([]);

    React.useEffect(() => { 
        async function getShops(){
            let resp = await state.contractInstance.methods.showShops().call();
            setShops(resp);
        }
        getShops();
    }, []);

    return (
        <ul className={styles.list}>
            {shops.map((shop, id) => {
                return(
                    <li key={id} className={styles.shop}>
                        <div className={styles.shop_info}>
                           <p>Address: {shop[0]}</p>
                            <p>City: {shop[1]}</p> 
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default ShopsPage;