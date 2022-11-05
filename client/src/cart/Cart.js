// todo
import { useEffect, useReducer } from "react";
import { useCartContext } from "../context/CartContext";
import { useCookieContext } from "../context/CookieContext";
import CartRow from "./CartRow";
import { currToNum, numToCurr } from "../hooksAndComps/myUtilit";
import { useLng } from "../context/LngContext";
import UserAlert from "./UserAlert";
import ShipAddress from "./Address";
import PayMethod from "./PayMethod";

// ?
const init = {
  alertDiv: false,
  msg: "",
  col: false,
  //
  cartDiv: true,
  shipDiv: false,
  payDiv: false,
};

// ?
function reducer(state, action) {
  switch (action.type) {
    // ?
    case "clearStates":
      return {
        ...init,
      };

    // ?
    case "showAlert":
      return {
        ...state,
        alertDiv: true,
        col: action.col,
        msg: action.msg,
      };

    // ?
    case "hideAlert":
      return {
        ...state,
        alertDiv: false,
      };

    // ?
    case "hideCart":
      return {
        ...state,
        cartDiv: false,
      };

    // ?
    case "showShip":
      return {
        ...state,
        shipDiv: true,
      };

    // ?
    case "showCard":
      return {
        ...state,
        cartDiv: true,
      };

    // ?
    case "goPayDiv":
      return {
        ...state,
        shipDiv: false,
        payDiv: true,
        alertDiv: false,
      };

    // ?
    case "hidePayDiv":
      return {
        ...state,
        payDiv: false,
      };

    // ?
    default:
      throw new Error();
  }
}

// todo
export default function Cart() {
  // ?
  const [cook /*  updateCook */] = useCookieContext();
  const [order, orderDisp] = useCartContext();
  const [checkSt, dispatch] = useReducer(reducer, init);
  const strings = useLng();

  // ?
  useEffect(() => {
    if (cook.id) {
      orderDisp({ type: "makeLs", id: cook.id });
    } else {
      orderDisp({ type: "clean" });
    }
  }, [cook, orderDisp]);

  // ?
  const total = order.cartContent
    ? order.cartContent.reduce((sum, val) => {
        return sum + val.qty * currToNum(val.price);
      }, 0)
    : 0;

  // ?
  async function onClickHandler() {
    try {
      if (order.cartContent.length === 0) {
        //
        dispatch({
          type: "showAlert",
          col: false,
          msg: "Ձեր քարտը դատարկ է։",
        });
        return;
      }

      let response = await fetch("/checkout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      let result = await response.json();

      if (response.ok) {
        dispatch({ type: "showAlert", col: true, msg: result });
        dispatch({ type: "hideCart" });
        dispatch({ type: "showShip" });
      } else {
        dispatch({ type: "showAlert", col: false, msg: result });
      }
    } catch (err) {
      console.log("--->>> catch err", err.message);
    }
  }

  // ?
  return (
    <>
      {checkSt.alertDiv && (
        <div className="mt-5 w-50 mx-auto">
          <UserAlert state={checkSt} disp={dispatch} />
        </div>
      )}

      {checkSt.cartDiv && (
        <div className="mt-5">
          <h5 className="text-secondary text-center">Քարտի պարունակությունը</h5>

          <table className="table table-bordered rounded  table-hover  mt-5">
            <thead className="alert-success">
              <tr>
                <th>Նկար </th>
                <th>Անուն </th>
                <th>Քանակ </th>
                <th>Գին </th>
                <th>Գումար </th>
                <th>Հեռացնել </th>
              </tr>
            </thead>
            <tbody>
              {order.cartContent &&
                order.cartContent.map((el) => (
                  <CartRow key={el.name} row={el} />
                ))}
            </tbody>
          </table>

          <div
            className="border-success row p-2 w-100 mx-auto"
            style={{ borderTop: "3px solid" }}
          >
            <div className="col-6 text-left text-secondary pt-2">
              <strong>Ընդհանուր գումար։ </strong>
              <span className="px-2">{numToCurr(total)}</span>
            </div>
            <div className="col-6 text-right">
              <button
                className="btn btn-primary"
                onClick={onClickHandler}
                disabled={order.cartContent.length === 0}
              >
                {strings.tab2_1}
              </button>
            </div>
          </div>
        </div>
      )}

      {checkSt.shipDiv && <ShipAddress state={checkSt} disp={dispatch} />}
      {checkSt.payDiv && <PayMethod state={checkSt} disp={dispatch} />}
    </>
  );
}
