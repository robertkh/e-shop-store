// todo
import React, { useContext, useReducer } from "react";

// todo
const initState = {
  fetch: {
    docs: [],
    totalDocs: "",
    limit: "",
    page: "",
    hasPrevPage: false,
    hasNextPage: true,
  },

  pageNum: 1,
  pageLim: 4,
  loading: false,
  delFactor: false,
};

// todo
function reducer(state, action) {
  switch (action.type) {
    // ?
    case "wait":
      return { ...state, loading: true };

    // ?
    case "pFetch":
      return { ...state, fetch: action.pf };

    // ?
    case "hide":
      return { ...state, loading: false };

    // ?
    case "pNum": {
      return { ...state, pageNum: action.val };
    }

    // ?
    case "pLim":
      return { ...state, pageLim: action.val };

    // ?
    case "pOne":
      return { ...state, pageNum: +1 };

    // ?
    case "pOneDel":
      return { ...state, pageNum: +1, delFactor: !state.delFactor };

    // ?
    case "pMin":
      return { ...state, pageNum: state.fetch.page - 1 };

    // ?
    case "pPlus":
      return { ...state, pageNum: state.fetch.page + 1 };

    // ?
    case "total":
      return { ...state, pageNum: state.fetch.totalPages };

    // ?
    case "loadShow":
      return { ...state, loading: true };

    // ?
    case "loadHide":
      return { ...state, loading: false };

    // ?
    default:
      throw new Error();
  }
}

// todo - 0
const StoreContext = React.createContext();

// todo - 1
export function useStoreContext() {
  return useContext(StoreContext);
}

// todo - 2
export function StoreContextProvider({ children }) {
  // ?
  const [storeState, disp] = useReducer(reducer, initState);

  // ? ---
  return (
    <StoreContext.Provider value={[storeState, disp]}>
      {children}
    </StoreContext.Provider>
  );
}
