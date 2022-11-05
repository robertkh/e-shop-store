// todo
import React, { useContext, useReducer } from "react";
import _ from "lodash";
const CartContext = React.createContext();
// ?
const initState = {
  cartContent: [],
  user: {},
  address: {},
  paid: false,
  shipped: false,
  payMethod: "",
};

// todo - 0
function reducer(order, action) {
  switch (action.type) {
    // ?
    case "makeLs": {
      if (localStorage.getItem(action.id)) {
        return JSON.parse(localStorage.getItem(action.id));
      } else {
        localStorage.setItem(action.id, JSON.stringify(initState));
        return initState;
      }
    }

    // ?
    case "add": {
      localStorage.setItem(
        action.id,
        JSON.stringify({
          ...order,
          cartContent: [...order.cartContent, action.add],
        })
      );
      return {
        ...order,
        cartContent: [...order.cartContent, action.add],
      };
    }

    // ?
    case "del": {
      _.remove(
        order.cartContent,
        _.find(order.cartContent, ["name", action.name])
      );
      localStorage.setItem(action.id, JSON.stringify({ ...order }));
      return { ...order };
    }

    // ?
    case "qty": {
      localStorage.setItem(action.id, JSON.stringify({ ...order }));
      return { ...order };
    }

    // ?
    case "clean": {
      return initState;
    }

    // ?
    case "addAddress": {
      if (action.data.chk.checked) {
        localStorage.setItem(
          action.id,
          JSON.stringify({
            ...order,
            address: {
              city: action.data.city.value,
              region: action.data.region.value,
              zip: action.data.zip.value,
              str: action.data.str.value,
            },
            user: { username: action.name },
          })
        );
      }
      return {
        ...order,
        address: {
          city: action.data.city.value,
          region: action.data.region.value,
          zip: action.data.zip.value,
          str: action.data.str.value,
        },
        user: { username: action.name },
      };
    }

    // ?
    case "payMethod": {
      localStorage.setItem(
        action.id,
        JSON.stringify({ ...order, payMethod: action.pm })
      );
      return {
        ...order,
        payMethod: action.pm,
      };
    }

    // ?
    case "makeCardEmpty": {
      localStorage.setItem(
        action.id,
        JSON.stringify({ ...order, cartContent: [] })
      );
      return {
        ...order,
        cartContent: [],
      };
    }

    // ?
    default:
      throw new Error();
  }
}

// todo - 1
export const useCartContext = () => {
  return useContext(CartContext);
};

// todo - 2
export const CartContextProvider = ({ children }) => {
  // ?
  const [order, orderDisp] = useReducer(reducer, initState);

  // ?
  return (
    <CartContext.Provider value={[order, orderDisp]}>
      {children}
    </CartContext.Provider>
  );
};
