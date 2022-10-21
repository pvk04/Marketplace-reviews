import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar"
import ShopsPage from "./ShopsPage/ShopsPage";
import ChangeRolePage from "./ChangeRolePage/ChangeRolePage";
import RequestsPage from "./RequestsPage/RequestsPage";
import CreateRequestPage from "./CreateRequestPage/CreateRequestPage";

import styles from "./FunctionalPanel.module.css";

function FunctionalPanel() {
    return(
        <main className={styles.main}>
            <NavBar/>
            <Routes>
                <Route path="/shops" element={<ShopsPage/>} />
                <Route path="/changerole" element={<ChangeRolePage />}/>
                <Route path="/requests" element={<RequestsPage/>}/>
                <Route path="/createrequest" element={<CreateRequestPage/>}/>
            </Routes>
        </main>
    );
}

export default FunctionalPanel;