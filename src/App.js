import React from 'react';
import './App.css';
import Web3 from 'web3';
import abi from './abi.js';

function App() {
  const [web3, setWeb] = React.useState();
  const [contractInstance, setCI] = React.useState();
  const [accounts, setAccounts] = React.useState([]);

  React.useEffect(() => {
    async function connect(){
      let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      setWeb(web3);
      let contractInstance = new web3.eth.Contract(abi, "0xEae3a092E80e720D651099CfA3A9b759FBE1D3bB");
      setCI(contractInstance);
      console.log("connected succesfully");

      let resp = await web3.eth.getAccounts();

      setAccounts(resp);
      console.log(accounts);
    }
    connect();
    
  }, []);
  return (
    <div className="App">
    </div>
  );
}

export default App;
