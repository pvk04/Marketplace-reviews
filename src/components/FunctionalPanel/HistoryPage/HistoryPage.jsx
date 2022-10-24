import React from "react";
import { AppContext } from "../../../contexts/context";

import styles from "./HistoryPage.module.css";

function HistoryPage(){
    const [state, dispatch] = React.useContext(AppContext);
    const [history, setHistory] = React.useState([]);

    React.useEffect(() => {
        async function getHistory(){
            let history = await state.contractInstance.methods.showHistory(state.currentAcc).call({from: state.currentAcc});
            setHistory(history);
        }
        getHistory();
    });

    return (
        <ul className={styles.list}>
            {history.map((historyElem, index) => {
                return(
                    <li key={index} className={styles.history_elem}>
                        <p className={styles.history_content}>{historyElem}</p>
                    </li>
                )
            })}
        </ul>
    )
}

export default HistoryPage;