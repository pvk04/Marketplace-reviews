import React from "react";

import styles from "./ModalAuth.module.css";

function ModalAuth({contractInstance, web3}) {
    const [currentAccount, setCurrentAccount] = React.useState();
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function reg(){
        let bytesPass = await web3.utils.soliditySha3({type: "string", value: password});
        await contractInstance.methods.registration(bytesPass).send({from: login}, (error) => {
            if(!error){
                alert("You succesfully registered");
            }
        });
    }

    async function auth(){
        let bytesPass = await web3.utils.soliditySha3({type: "string", value: password});
        let resp = await contractInstance.methods.login(bytesPass).call({from: login});

        if (resp){
            setLogin('');
            setPassword('');
            setCurrentAccount(login);
            console.log(currentAccount)
        }
        else{
            alert("Incorrect address or password");
            setPassword('');
        }
    }

    return(    
        <div className={styles.modal_wrap}>
            <div className={styles.modal_auth}>
                <div className={styles.modal_auth_content}>
                    <h1>Login/Register</h1>
                        <div className={styles.content_div}>
                            <p>Address:</p>
                            <input type="text" className={styles.auth_inp} value={login} onChange={(e) => {setLogin(e.target.value)}}/>
                        </div>
                        <div className={styles.content_div}>
                            <p>Password:</p>
                            <input type="text" className={styles.auth_inp} value={password} onChange={(e) => {setPassword(e.target.value)}}/> 
                        </div>
                        <div className={styles.buttons_div}>
                            <button className={styles.login_button} onClick={auth}>Login</button>
                            <button className={styles.reg_button} onClick={reg}>Register</button>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAuth;