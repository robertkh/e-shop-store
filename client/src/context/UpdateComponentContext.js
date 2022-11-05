// todo
import React, { useContext, useState } from "react";
const UpdateComponentContext = React.createContext();

// todo - 1
export const useUpdateComponentContext = () => {
  return useContext(UpdateComponentContext);
};

// todo - 2
export const UpdateComponentContextProvider = ({ children }) => {
  // ?
  const [toggle, doUpdate] = useState(false);

  // ?
  return (
    <UpdateComponentContext.Provider value={[toggle, doUpdate]}>
      {children}
    </UpdateComponentContext.Provider>
  );
};
