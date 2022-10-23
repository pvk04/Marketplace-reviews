import React from "react";
import { AppContext } from "../../../contexts/context";

import styles from "./NewShopModal.module.css";

function NewShopModal({active, setActive}) {
    const [state, dispatch] = React.useContext(AppContext);
    const [addresses, setAddresses] = React.useState([]);
    const [selected, setSelected] = React.useState('');
    const [city, setCity] = React.useState('');

    function close(e){
        if (e.currentTarget === e.target){
            setActive(false);
        }
    }

    async function createNewShop() {
        console.log({selected, city});
        await state.contractInstance.methods.createNewShop(selected, city).send({from: state.currentAcc}, (err) => {
            if (!err){
                dispatch({type: "ACTIVITY"});
                setCity('');
                alert("New store successfully created");
                setActive(false);
            }
        })
        
    }

    React.useEffect(() => {
        async function getAdresses(){
            if (state.contractInstance != {}){
                let shops = await state.contractInstance.methods.showShops().call({from: state.currentAcc});
                let addresses =await state.web3.eth.getAccounts();
                let resArr = [];
                console.log(addresses);
                for (let address of addresses){
                    let user = await state.contractInstance.methods.showUser(address).call();
                    console.log(address)
                    let check = true;
                    for (let shop of shops){
                        if (address == shop.shop_address){
                            check = false;
                            break;
                        }
                    }
                    if (check && user.password == "0x0000000000000000000000000000000000000000000000000000000000000000"){
                        resArr.push(address);
                    }
                }
                setAddresses(resArr);
                setSelected(addresses[0]);
            }
        }
        getAdresses();
    }, [state.activity]);

    return (
        <div className={active ? styles.modal_wrap : styles.hide} onClick={e => {close(e)}}>
            <div className={styles.modal_prom}>
                <div className={styles.modal_prom_content}>
                    <h1>Create new shop</h1>
                    <div className={styles.content_div}>
                        <p>Address:</p>
                        <select value={selected} onChange={e => setSelected(e.target.value)}>
                            {addresses.map((address, index) => {
                                return(<option value={address} key={index}>{address}</option>)
                            })}
                        </select>
                    </div>
                    <div className={styles.content_div}>
                        <p>City:</p>
                        <input type="text" className={styles.city_inp} value={city} onChange={e => {setCity(e.target.value)}}/>
                    </div>
                    <div className={styles.buttons_div}>
                        <button onClick={() => {createNewShop()}}>Create</button>
                    </div>
                    <button className={styles.close_modal} onClick={() => {setActive(false)}}><img src="/assets/close.svg" alt=""/></button>
                </div>
            </div>
        </div>
    )
}

export default NewShopModal;