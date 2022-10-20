import React from "react";
import "./App.css";
import Web3 from "web3";
import abi from "./abi.js";
import ModalAuth from "./components/ModalAuth/ModalAuth";
import { AppContext } from "./contexts/context";
import Profile from "./components/Profile/Profile";

function App() {
	const [state, dispatch] = React.useContext(AppContext);

	console.log(state);

	React.useEffect(() => {
		async function connect() {
			let web3 = new Web3(
				new Web3.providers.HttpProvider("http://localhost:8545")
			);
			dispatch({ type: "SET_WEB3", payload: web3 });

			let contractInstance = new web3.eth.Contract(
				abi,
				"0x74761c16D4103Fc49160897fD6B29f16A783Adf6"
			);
			dispatch({ type: "SET_CONTRACT", payload: contractInstance });
		}
		connect();
	}, [state.web3]);

	return (
		<div className="App">
			<ModalAuth />
			<Profile />
		</div>
	);
}

export default App;
