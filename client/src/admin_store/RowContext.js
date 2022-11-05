// todo
import React, { useContext, useState } from "react";

// todo - 0
const Context = React.createContext();

// todo - 1  Սրանով փաթեթավորված կոմպօնենտները օգտվում են գլոբալ ստեյթից
export function useRowContext() {
  return useContext(Context);
}

// todo - 2  Սրանով փաթեթավորվում են բոլոր անհրաժեշտ կոմպոնենտները։
export function RowContextProvider({ children }) {
  const [rowSt, setRowSt] = useState({});

  // ?
  return (
    <Context.Provider value={[rowSt, setRowSt]}>{children}</Context.Provider>
  );
}
