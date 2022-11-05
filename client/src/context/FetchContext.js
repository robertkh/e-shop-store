// todo
import React, { useContext, useState } from "react";

const initVal = {
	docs: [],
	totalDocs: "",
	limit: "",
	totalPages: "",
	page: "",
	pagingCounter: "",
	hasPrevPage: false,
	hasNextPage: true,
	prevPage: null,
	nextPage: "",
};

// todo
const FetchContext = React.createContext();

// todo - 1
export const useFetch = () => {
	return useContext(FetchContext);
};

// todo - 2
export const FetchProvider = ({ children }) => {
	// ?
	const [fetchData, setFetchData] = useState(initVal);
	const [loading, setLoad] = useState(false);

	// ? ---
	return (
		<FetchContext.Provider
			value={[fetchData, setFetchData, loading, setLoad]}
		>
			{children}
		</FetchContext.Provider>
	);
};
