import React from "react";
import { AppContext } from "../../../contexts/context";
import { useNavigate } from "react-router-dom";

import styles from "./ChangeRole.module.css";

function ChangeRolePage() {
  const navigate = useNavigate();
  const [state, dispatch] = React.useContext(AppContext);
  const [addresses, setAddresses] = React.useState([]);
  const [shops, setShops] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState();
  const [selectedShop, setSelectedShop] = React.useState(undefined);
  const [user, setUser] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  function shopsInfoRender() {
    if (user.role == 1) {
      return (
        <div className={styles.content}>
          <p>Shop:</p>
          <p>{shops[user.shop].shop_address}</p>
        </div>
      );
    } else {
      return (
        <div className={styles.content}>
          <p>Shop:</p>
          <select
            value={selectedShop}
            onChange={(e) => {
              setSelectedShop(e.target.value);
            }}
          >
            {shops.map((shop, index) => {
              if (
                shop.shop_address !=
                "0x0000000000000000000000000000000000000000"
              ) {
                if (selectedShop == undefined) {
                  setSelectedShop(index);
                }
                return (
                  <option key={index} value={index}>
                    {shop.shop_address}
                  </option>
                );
              }
            })}
          </select>
        </div>
      );
    }
  }

  function renderButtons() {
    switch (user.role) {
      case "0":
        return (
          <div className={styles.buttons_div}>
            <button onClick={makeSeller}>Make seller</button>
            <button onClick={makeAdmin}>Make admin</button>
          </div>
        );
      case "1":
        return (
          <div className={styles.buttons_div}>
            <button onClick={makeBuyer}>Make buyer</button>
            <button onClick={makeAdmin}>Make admin</button>
          </div>
        );
      case "2":
        return (
          <div className={styles.buttons_div}>
            <button onClick={makeBuyer}>Make buyer</button>
            <button onClick={makeSeller}>Make seller</button>
          </div>
        );
    }
  }

  async function makeBuyer() {
    await state.contractInstance.methods
      .changeRole(selectedUser, 0, 0)
      .send({ from: state.currentAcc, gas: "6721975" });

    await state.contractInstance.methods
      .addHistory(
        state.currentAcc,
        `You have made user ${selectedUser} a buyer`
      )
      .send({ from: state.currentAcc, gas: "6721975" });

    dispatch({ type: "ACTIVITY" });
    setRefresh(true);

    if (selectedUser == state.currentAcc) {
      navigate("/profile");
    }
  }

  async function makeSeller() {
    await state.contractInstance.methods
      .changeRole(selectedUser, 1, selectedShop)
      .send({ from: state.currentAcc, gas: "6721975" });

    await state.contractInstance.methods
      .addHistory(
        state.currentAcc,
        `You have made user ${selectedUser} a seller in store ${shops[selectedShop].shop_address}`
      )
      .send({ from: state.currentAcc, gas: "6721975" });

    dispatch({ type: "ACTIVITY" });
    setRefresh(true);

    if (selectedUser == state.currentAcc) {
      navigate("/profile");
    }
  }

  async function makeAdmin() {
    await state.contractInstance.methods
      .changeRole(selectedUser, 2, 0)
      .send({ from: state.currentAcc, gas: "6721975" });

    await state.contractInstance.methods
      .addHistory(state.currentAcc, `You have made user ${selectedUser} admin`)
      .send({ from: state.currentAcc, gas: "6721975" });

    dispatch({ type: "ACTIVITY" });
    setRefresh(true);
  }

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

  React.useEffect(() => {
    async function getUserInfo() {
      if (selectedUser != undefined) {
        let user = await state.contractInstance.methods
          .showUser(selectedUser)
          .call();
        setUser(user);
        setRefresh(false);
      }
    }
    getUserInfo();
  }, [selectedUser, refresh]);

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p>User:</p>
          <select
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
            }}
          >
            {addresses.map((address, index) => {
              return (
                <option key={index} value={address}>
                  {address}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.content}>
          <p>Current role: </p>
          <p>
            {user.role == 0
              ? "Buyer"
              : user.role == 1
              ? "Seller"
              : user.role == 2
              ? "Admin"
              : ""}
          </p>
        </div>
        {shopsInfoRender()}
        {renderButtons()}
      </div>
    </div>
  );
}

export default ChangeRolePage;
