import React from "react";

const initialState = {
	web3: {},
	contractInstance: {},
	currentAcc: "",
	role: "",
	activeRole: "",
	login: false,
	activity: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_WEB3":
			return {
				...state,
				web3: action.payload,
			};
		case "SET_CONTRACT":
			return {
				...state,
				contractInstance: action.payload,
			};
		case "SET_CURRENT":
			return {
				...state,
				currentAcc: action.payload,
			};
		case "SET_ROLE":
			return {
				...state,
				role: action.payload,
			};
		case "SET_ACTIVEROLE":
			return {
				...state,
				activeRole: action.payload,
			};
		case "ACTIVITY":
			return {
				...state,
				activity: state.activity + 1,
			};
		case "USER_LOGIN":
			return {
				...state,
				login: true,
			};
		case "USER_LOGOUT":
			return {
				...state,
				currentAcc: 0,
				role: 0,
				login: false,
			};
		default:
			return state;
	}
}

export const AppContext = React.createContext();

export function AppProvider({ children }) {
	const value = React.useReducer(reducer, initialState);
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
