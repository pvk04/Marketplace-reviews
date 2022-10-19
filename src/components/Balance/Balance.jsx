import React from "react";

function Balance({web3, account}){
    const [balance, setBalance] = React.useState();

    React.useEffect(() => {
        async function getAccountBalance() {
			const balance = await web3.eth.getBalance(account);
			const ethBalance = web3.utils.fromWei(balance, "ether");
            setBalance(ethBalance);
		}
		getAccountBalance();
    }, account);
    
    return(
        <div>
            <p>Balance: {balance} eth</p>
        </div>
    );
}

export default Balance;