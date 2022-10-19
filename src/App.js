import React from "react";
import "./App.css";
import Web3 from "web3";
import abi from "./abi.js";
import Balance from "./components/Balance/Balance";

function App() {
	const [web3, setWeb] = React.useState();
	const [contractInstance, setCI] = React.useState();
	const [eth, setEth] = React.useState();
	const [accounts, setAccounts] = React.useState([]);
	const [currentAcc, setCurrentAcc] = React.useState();
	const [balance, setBalance] = React.useState();

	React.useEffect(() => {
		async function connect() {
			const web3 = new Web3(
				new Web3.providers.HttpProvider("http://localhost:8545")
			);
			setWeb(web3);

			setEth(web3.eth);

			let contractInstance = new web3.eth.Contract(
				abi,
				"0x73B91211ED4E7eE94b95F91A6bb94EFe7B0D3E58"
			);
			setCI(contractInstance);

			let resp = await web3.eth.getAccounts();
			setAccounts(resp);
			setCurrentAcc(resp[0]);
		}
		connect();
	}, []);

	React.useEffect(() => {
		async function getAccountBalance() {
			const balance = await web3.eth.getBalance(currentAcc);
			const ethBalance = web3.utils.fromWei(balance, "ether");
			setBalance(ethBalance);
		}
		getAccountBalance();
	}, [currentAcc]);

	return (
		<div className="App">
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
			{/* <Balance web3={web3} account={currentAcc} /> */}
		</div>
	);
}

export default App;
