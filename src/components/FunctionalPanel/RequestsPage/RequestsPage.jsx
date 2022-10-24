import React from "react";
import { AppContext } from "../../../contexts/context";

import styles from "./RequestPage.module.css";

function RequestsPage() {
    const [state, dispatch] = React.useContext(AppContext);
    const [requests, setRequests] = React.useState([]);

    React.useEffect(() => {
        async function getRequests(){
            let requests = await state.contractInstance.methods.showRequests().call({from: state.currentAcc});
            setRequests(requests);
        }
        getRequests();
    }, []);

    return(
        <ul className={styles.list}>
            {requests.map((request, index) => {
                console.log(request)
                return(
                    <li key={index} className={styles.request_elem}>
                        <p className={styles.request_content}>User: {request.user}</p>
                        <p className={styles.request_content}>Role: {request.role == 0 ? "Buyer" : "Seller"}</p>
                        <p className={styles.request_content}>Status: {request.status}</p>
                    </li>
                )
            })}
        </ul>
    )
}

export default RequestsPage;