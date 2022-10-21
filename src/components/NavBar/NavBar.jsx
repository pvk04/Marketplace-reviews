import React from "react";
import { AppContext } from "../../contexts/context";
import BuyerBar from "./BuyerBar/BuyerBar";
import AdminBar from "./AdminBar/AdminBar";

function NavBar(){
    const [state, dispatch] = React.useContext(AppContext);
    function roleCheck(){
        if (state.activeRole == 0 || state.activeRole == 1){
            return (<BuyerBar/>)
        }
        else if (state.activeRole == 2){
            return (<AdminBar/>)
        }
    }

    return(
        <div>
            {roleCheck()}
        </div>
    );
}

export default NavBar;