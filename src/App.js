import React from "react";
import "./App.css";
import Web3 from "web3";
import abi from "./abi.js";
import ModalAuth from "./components/ModalAuth/ModalAuth";
import { AppContext } from "./contexts/context";
import Profile from "./components/Profile/Profile";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate();
	const [state, dispatch] = React.useContext(AppContext);

	React.useEffect(() => {
		async function connect() {
			let web3 = new Web3(
				new Web3.providers.HttpProvider("http://localhost:8545")
			);
			dispatch({ type: "SET_WEB3", payload: web3 });

			let contractInstance = new web3.eth.Contract(
				abi,
				"0x8a299320FA5a61746C5A376F3B72E7225D6a5B30"
			);
			dispatch({ type: "SET_CONTRACT", payload: contractInstance });

      let accounts = await web3.eth.getAccounts();
      for (let account of accounts){
        await web3.eth.personal.unlockAccount(account, "", 0);
      }
		}
		connect();
	}, []);

	React.useEffect(() => {
		function checkLogin() {
			let loginStatus = state.login;
			if (!loginStatus) {
				navigate("/");
			}
		}
		checkLogin();
	}, [state.login]);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<ModalAuth />} />
				<Route path="/profile/*" element={<Profile />} />
			</Routes>
		</div>
	);
}

export default App;
