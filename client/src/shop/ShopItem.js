// todo
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";
import { useCookieContext } from "../context/CookieContext";
import _ from "lodash";
import { readName } from "../hooksAndComps/myUtilit";
import { useLng } from "../context/LngContext";

// todo
export default function ShopItem({ name, maxQty, price }) {
  // ?
  const [order, orderDisp] = useCartContext();
  const [cook /*  updateCook */] = useCookieContext();
  const strings = useLng();

  // ?
  function onClickHandler() {
    if (!cook.id) return;
    if (isChecked) return;
    orderDisp({
      type: "add",
      add: { name, qty: 1, maxQty, price },
      id: cook.id,
    });
  }

  // ?
  const isChecked = _.find(order.cartContent, ["name", name]);

  // ?
  return (
    <div className="col-3  text-center  px-3 mb-4">
      <h6 className="my-2 font-weight-normal"> {readName(name)} </h6>
      <img
        src={`images/${name}.jpg`}
        className="w-100"
        onError={(e) => {
          e.target.src = "images/Phold.png";
        }}
        alt="Missing..."
      />
      <h6 className="my-2">{price}</h6>
      <button
        className="btn btn-primary btn-block  text-center"
        onClick={onClickHandler}
      >
        <span className="">{strings.tab1_1}</span>
        {isChecked && <FaCheck className="float-right mt-1" size={16} />}
      </button>
    </div>
  );
}
