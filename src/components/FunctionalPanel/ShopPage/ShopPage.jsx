import React from "react";
import { Routes, Route } from "react-router-dom";
import ShopsPage from "./ShopsPage/ShopsPage";
import SingleShop from "./SingleShop/SingleShop";

function ShopPage() {
	return (
		<Routes>
			<Route path="/shops/:id" element={<SingleShop/>}/>
			<Route path="/shops/*" element={<ShopsPage/>}/>
		</Routes>
	);
}

export default ShopPage;
