import React from "react";
import { AppContext } from "../../contexts/context";
import { useNavigate } from "react-router-dom";
import FunctionalPanel from "../FunctionalPanel/FunctionalPanel";

import styles from "./Profile.module.css";

function Profile(){
    const navigate = useNavigate();
    const [state, dispatch] = React.useContext(AppContext);
    const [balance, setBalance] = React.useState();

    function exit(){
        dispatch({type: "USER_LOGOUT"});
        navigate('/');
    }

    React.useEffect(() => {
	async function getAccountBalance() {
		if (state.web3 && state.currentAcc) {
			const balance = await state.web3.eth.getBalance(state.currentAcc);
			const ethBalance = state.web3.utils.fromWei(balance, "ether");
			setBalance(ethBalance);
		}
	}
	getAccountBalance();
	}, [state.currentAcc]);

    return(
        <div>
            <div className={styles.account_info}>
                <h1>Address: {state.currentAcc}</h1>
                <h3>Role: {state.role == 0 ? "Buyer" : state.role == 1 ? "Seller" : "Admin"}</h3>
                <h3>Balance: {balance}</h3>
                <button onClick={exit}>Exit</button>
            </div>
            <FunctionalPanel/>
        </div>
        
    )
}

export default Profile;