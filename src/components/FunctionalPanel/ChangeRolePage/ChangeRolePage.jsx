import React from "react";
import { AppContext } from "../../../contexts/context";

function ChangeRolePage() {
	const [state, dispatch] = React.useContext(AppContext);
	const [addresses, setAddresses] = React.useState([]);
	const [shops, setShops] = React.useState([]);
	const [selectedUser, setSelectedUser] = React.useState();
	const [selectedShop, setSelectedShop] = React.useState();

	React.useEffect(() => {
		async function getInfo() {
			let addresses = await state.web3.eth.getAccounts();
			let shops = await state.contractInstance.methods.showShops().call();
			let resAddressesArr = [];

			for (let address of addresses) {
				let notShop = true;
				let user = await state.contractInstance.methods
					.showUser(address)
					.call();
				let isUser =
					user.password !=
					"0x0000000000000000000000000000000000000000000000000000000000000000";
				for (let shop of shops) {
					if (address == shop) {
						notShop = false;
						break;
					}
				}
				if (notShop && isUser) resAddressesArr.push(address);
			}

			setAddresses(resAddressesArr);
			setSelectedUser(addresses[0]);
			setShops(shops);
		}
		getInfo();
	}, [state.activity]);

	return (
		<div>
			<div>
				<p>User:</p>
				<select>
					{addresses.map((address, index) => {
						return (
							<option key={index} value={address}>
								{address}
							</option>
						);
					})}
				</select>
			</div>
			<div>
				<p>CurrentRole: </p>
				{/**Todo: set current role of selected user */}
			</div>
		</div>
	);
}

export default ChangeRolePage;
