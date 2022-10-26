import React from "react";
import { AppContext } from "../../../../contexts/context";

import styles from "./SingleShopModal.module.css";

function SingleShopModal({ active, setActive, id }) {
  const [state, dispatch] = React.useContext(AppContext);
  const [shop, setShop] = React.useState([]);

  function close(e) {
    if (e.currentTarget == e.target) {
      setActive(false);
    }
  }

  function averageRating() {
    if (shop.length != 0) {
      if (shop.rewievs.length != 0) {
        let sumRating = 0;
        for (let rewiev of shop.rewievs) {
          sumRating += Number(rewiev.stars);
        }
        return sumRating / shop.rewievs.length;
      } else {
        return "This store has no rating yet";
      }
    }
  }

  async function rateRewiev(index, rate) {
    await state.contractInstance.methods
      .leaveLikeDislikeOnRewiev(id, index, rate)
      .send({ from: state.currentAcc });

    dispatch({ type: "ACTIVITY" });
  }

  function renderLikes(rates, index) {
    let likes = 0;
    let dislikes = 0;
    let rated;

    for (let rate of rates) {
      console.log(rate);
      if (rate.rate == true) likes++;
      if (rate.rate == false) dislikes++;
      if (rate.user == state.currentAcc && rate.rate == true) rated = 0;
      if (rate.user == state.currentAcc && rate.rate == false) rated = 1;
    }

    return (
      <div className={styles.btns}>
        <div>
          <span>{likes}</span>
          <button
            className={
              rated == undefined
                ? styles.like
                : rated == 0
                ? `${styles.like} ${styles.like_active}`
                : styles.like
            }
            onClick={() => {
              rateRewiev(index, true);
            }}
          >
            <img src="/assets/like.svg" alt="like" />
          </button>
        </div>
        <div>
          <span>{dislikes}</span>
          <button
            className={
              rated == undefined
                ? styles.like
                : rated == 1
                ? `${styles.like} ${styles.like_active}`
                : styles.like
            }
            onClick={() => {
              rateRewiev(index, false);
            }}
          >
            <img src="/assets/dislike.svg" alt="dislike" />
          </button>
        </div>
      </div>
    );
  }

  React.useEffect(() => {
    async function getShop() {
      try {
        if (active) {
          let shop = await state.contractInstance.methods.showShop(id).call();
          console.log(shop);
          setShop(shop);
        }
      } catch (error) {
        //todo
      }
    }
    getShop();

    return setShop([]);
  }, [active, state.activity]);

  return (
    <div
      className={active ? styles.modal_wrap : styles.hide}
      onClick={(e) => {
        close(e);
      }}
    >
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <h2 className={styles.shop_address}>{shop.shop_address}</h2>
          <h3>Rating: {averageRating()}</h3>
          <main className={styles.rewievs}>
            <ul className={styles.list}>
              {shop.length != 0
                ? shop.rewievs.map((rewiev, index) => {
                    return (
                      <li className={styles.list_element} key={index}>
                        <div className={styles.element_inner}>
                          <div className={styles.element_header}>
                            <p>{rewiev.creator}</p>
                            <p>Rate: {rewiev.stars}</p>
                          </div>
                          <p className={styles.text}>{rewiev.comment}</p>
                        </div>
                        {renderLikes(rewiev.rates, index)}
                      </li>
                    );
                  })
                : null}
            </ul>
          </main>
          <button
            className={styles.close_modal}
            onClick={() => {
              setActive(false);
            }}
          >
            <img src="/assets/close.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleShopModal;
