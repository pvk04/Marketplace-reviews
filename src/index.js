import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./contexts/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AppProvider>
		<App />
	</AppProvider>
);