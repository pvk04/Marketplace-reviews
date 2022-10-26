import React from "react";
import { AppContext } from "../../../contexts/context";
import CreateRewievModal from "./CreateRewievModal/CreateRewievModal";
import SingleShopModal from "./SingleShopModal/SingleShopModal";

import styles from "./ShopsPage.module.css";

function ShopsPage() {
  const [state, dispatch] = React.useContext(AppContext);
  const [shops, setShops] = React.useState([]);
  const [rewiewModal, setRewievModal] = React.useState(false);
  const [rewievShop, setRewievShop] = React.useState([]);
  const [shopId, setShopId] = React.useState();
  const [shopModal, setShopModal] = React.useState(false);

  async function deleteShop(id) {
    await state.contractInstance.methods
      .removeShop(id)
      .send({ from: state.currentAcc, gas: "6721975" });
    await state.contractInstance.methods
      .addHistory(
        state.currentAcc,
        `You deleted shop: ${shops[id].shop_address}`
      )
      .send({ from: state.currentAcc, gas: "6721975" });
    alert(`Shop ${shops[id].shop_address} deleted`);
    dispatch({ type: "ACTIVITY" });
  }

  function renderButtons(id) {
    if (state.activeRole == 2) {
      return (
        <button
          onClick={() => {
            deleteShop(id);
          }}
        >
          Delete
        </button>
      );
    } else if (state.activeRole == 0) {
      return (
        <>
          <button
            onClick={() => {
              setRewievShop(shops[id]);
              setShopId(id);
              setRewievModal(true);
            }}
          >
            Create rewiev
          </button>
          <button
            onClick={() => {
              setShopId(id);
              setShopModal(true);
            }}
          >
            Show
          </button>
        </>
      );
    }
  }

  React.useEffect(() => {
    async function getShops() {
      try {
        let resp = await state.contractInstance.methods.showShops().call();
        setShops(resp);
      } catch (error) {
        //todo
      }
    }
    getShops();
  }, [state.activity]);

  return (
    <>
      <ul className={styles.list}>
        {shops.map((shop, id) => {
          if (
            shop.shop_address != "0x0000000000000000000000000000000000000000"
          ) {
            return (
              <li key={id} className={styles.shop}>
                <div className={styles.shop_info}>
                  <p>Address: {shop.shop_address}</p>
                  <p>City: {shop.city}</p>
                </div>
                <div className={styles.buttons}>{renderButtons(id)}</div>
              </li>
            );
          }
        })}
      </ul>
      <CreateRewievModal
        active={rewiewModal}
        setActive={setRewievModal}
        shop={rewievShop}
        id={shopId}
      />
      <SingleShopModal
        active={shopModal}
        setActive={setShopModal}
        id={shopId}
      />
    </>
  );
}

export default ShopsPage;
