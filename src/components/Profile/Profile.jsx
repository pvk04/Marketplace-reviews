import React from "react";
import { AppContext } from "../../contexts/context";
import { useNavigate } from "react-router-dom";
import FunctionalPanel from "../FunctionalPanel/FunctionalPanel";
import PromotionModal from "./PromotionModal/PromotionModal";
import NewShopModal from "./NewShopModal/NewShopModal";

import styles from "./Profile.module.css";

function Profile() {
  const navigate = useNavigate();
  const [state, dispatch] = React.useContext(AppContext);
  const [balance, setBalance] = React.useState();
  const [promotionModalActive, setPromotionModalActive] = React.useState(false);
  const [newShopModalActive, setNewShopModalActive] = React.useState(false);

  function exit() {
    dispatch({ type: "USER_LOGOUT" });
    navigate("/");
  }

  async function swapRole() {
    await state.contractInstance.methods
      .switchActiveRole()
      .send({ from: state.currentAcc });
    let userInfo = await state.contractInstance.methods
      .users(state.currentAcc)
      .call({ from: state.currentAcc });
    await state.contractInstance.methods
      .addHistory(state.currentAcc, "You swapped role")
      .send({ from: state.currentAcc });
    dispatch({ type: "SET_ACTIVEROLE", payload: userInfo.activeRole });
    dispatch({ type: "ACTIVITY" });
  }

  async function demotionRequest() {
    await state.contractInstance.methods
      .requestToChangeRole(0, 0)
      .send({ from: state.currentAcc });
    await state.contractInstance.methods
      .addHistory(state.currentAcc, "You have requested a demotion")
      .send({ from: state.currentAcc });
    dispatch({ type: "ACTIVITY" });
    alert("Request successfully created");
  }

  function renderRoleButtons() {
    if (state.role == 0) {
      return (
        <button
          onClick={() => {
            setPromotionModalActive(true);
          }}
        >
          Promotion request
        </button>
      );
    } else if (state.role == 1) {
      return (
        <>
          <button className={styles.acc_button} onClick={demotionRequest}>
            Demotion request
          </button>
          <button className={styles.acc_button} onClick={swapRole}>
            Swap role
          </button>
        </>
      );
    } else if (state.role == 2 && state.activeRole == 2) {
      return (
        <>
          <button className={styles.acc_button} onClick={swapRole}>
            Swap role
          </button>
          <button
            className={styles.acc_button}
            onClick={() => {
              setNewShopModalActive(true);
            }}
          >
            New shop
          </button>
        </>
      );
    } else if (state.role == 2 && state.activeRole == 0) {
      return (
        <button className={styles.acc_button} onClick={swapRole}>
          Swap role
        </button>
      );
    }
  }

  React.useEffect(() => {
    async function getAccountBalance() {
      if (state.web3 && state.currentAcc) {
        const balance = await state.web3.eth.getBalance(state.currentAcc);
        const ethBalance = state.web3.utils.fromWei(balance, "ether");
        setBalance(ethBalance);

        const user = await state.contractInstance.methods
          .showUser(state.currentAcc)
          .call({ from: state.currentAcc });
        dispatch({ type: "SET_ROLE", payload: user.role });
        dispatch({ type: "SET_ACTIVEROLE", payload: user.activeRole });
      }
    }
    getAccountBalance();
  }, [state.activity]);

  return (
    <div>
      <div className={styles.account_info}>
        <h1>Address: {state.currentAcc}</h1>
        <h3>
          Role:{" "}
          {state.role == 0 ? "Buyer" : state.role == 1 ? "Seller" : "Admin"}
        </h3>
        <h3>
          Active role:{" "}
          {state.activeRole == 0
            ? "Buyer"
            : state.activeRole == 1
            ? "Seller"
            : "Admin"}
        </h3>
        <h3>Balance: {balance}</h3>
        <div>
          <button className={styles.acc_button} onClick={exit}>
            Exit
          </button>
          {renderRoleButtons()}
        </div>
      </div>
      <PromotionModal
        active={promotionModalActive}
        setActive={setPromotionModalActive}
      />
      <NewShopModal
        active={newShopModalActive}
        setActive={setNewShopModalActive}
      />
      <FunctionalPanel />
    </div>
  );
}

export default Profile;
