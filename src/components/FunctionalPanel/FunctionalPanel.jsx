import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import ShopsPage from "./ShopsPage/ShopsPage";
import ChangeRolePage from "./ChangeRolePage/ChangeRolePage";
import RequestsPage from "./RequestsPage/RequestsPage";

import styles from "./FunctionalPanel.module.css";
import HistoryPage from "./HistoryPage/HistoryPage";
import { AppContext } from "../../contexts/context";

function FunctionalPanel() {
  return (
    <main className={styles.main}>
      <NavBar />
      <Routes>
        <Route path="/shops" element={<ShopsPage />} />
        <Route path="/changerole" element={<ChangeRolePage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </main>
  );
}

export default FunctionalPanel;
