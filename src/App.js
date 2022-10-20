import React from "react";
import "./App.css";
import Web3 from "web3";
import abi from "./abi.js";
import ModalAuth from "./components/ModalAuth/ModalAuth";

let web3, contractInstance;

function App() {
	const [accounts, setAccounts] = React.useState([]);
	const [currentAcc, setCurrentAcc] = React.useState();
	const [balance, setBalance] = React.useState();

	React.useEffect(() => {
		async function connect() {
			web3 = new Web3(
				new Web3.providers.HttpProvider("http://localhost:8545")
			);

			contractInstance = new web3.eth.Contract(
				abi,
				"0x38f619Ff83AABDd9Af186FbAfb3342E0cB1206d7"
			);

			let resp = await web3.eth.getAccounts();
			setAccounts(resp);
			setCurrentAcc(resp[0]);
		}
		connect();
	}, []);

	React.useEffect(() => {
		async function getAccountBalance() {
			if (web3 && currentAcc){
				const balance = await web3.eth.getBalance(currentAcc);
				const ethBalance = web3.utils.fromWei(balance, "ether");
				setBalance(ethBalance);
			}
		}
		getAccountBalance();
	}, [currentAcc]);

	return (
		<div className="App">
			<ModalAuth contractInstance={contractInstance} web3={web3}/>
			<select
				onChange={(event) => {
					setCurrentAcc(event.target.value);
				}}
			>
				{accounts.map((acc) => {
					return (
						<option value={acc} key={acc}>
							{acc}
						</option>
					);
				})}
			</select>
			<p>Balance: {balance} eth</p>
		</div>
	);
}

export default App;
