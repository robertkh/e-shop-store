//?
import React, { useContext } from "react";
import useMyCookie from "./useMyCookie";

const CookieContext = React.createContext();

// todo - 1
export const useCookieContext = () => {
	return useContext(CookieContext);
};

// todo - 2
export const CookieContextProvider = ({ children }) => {
	// ?
	const [cook, updateCook] = useMyCookie();

	// ?
	return (
		<CookieContext.Provider value={[cook, updateCook]}>
			{children}
		</CookieContext.Provider>
	);
};
