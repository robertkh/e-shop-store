// todo
import { useCartContext } from "../context/CartContext";
import { useCookieContext } from "../context/CookieContext";
import { CustomInput, Form, FormGroup, Button } from "reactstrap";
import { useUpdateComponentContext } from "../context/UpdateComponentContext";

// todo
export default function PayMethod({ state, disp }) {
  // ?
  const [order, orderDisp] = useCartContext();
  const [cook /*  updateCook */] = useCookieContext();
  const [toggle, doUpdate] = useUpdateComponentContext();

  // ?
  async function submitHandler(e) {
    e.preventDefault();

    try {
      let response = await fetch("/confirm", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      let result = await response.json();

      if (response.ok) {
        disp({ type: "showAlert", col: true, msg: result });
        disp({ type: "hidePayDiv", col: true, msg: result });
        orderDisp({ type: "makeCardEmpty", id: cook.id });
        disp({ type: "showCard" });
        doUpdate(!toggle);
      } else {
        console.log("no ", result);
      }
    } catch (err) {
      console.log("--->>> catch err", err.message);
    }
  }

  // ?
  const handleChange = (e) => {
    orderDisp({ type: "payMethod", pm: e.target.value, id: cook.id });
  };

  return (
    <div className="mt-5 ">
      <h5 className="text-center text-secondary my-5">
        <strong>Ընտրել վճարման եղանակը</strong>
      </h5>
      <div className="w-50 mx-auto">
        <Form inline onSubmit={submitHandler}>
          <FormGroup>
            <CustomInput
              type="radio"
              id="exampleCustomRadio"
              name="customRadio"
              className="mr-2"
              value="PayPal"
              onChange={handleChange}
            />
            <img src="images/Paypal.png" alt="" className="border" />

            <CustomInput
              type="radio"
              id="exampleCustomRadio2"
              name="customRadio"
              className="ml-5 mr-2"
              onChange={handleChange}
              value="Visa/MasterCard"
              // label="Visa/Master cart"
            />
            <img src="images/Vm_card.png" alt="" className="border" />
          </FormGroup>
          <Button
            type="submit"
            color="primary"
            block
            className="w-75 mx-auto my-4"
          >
            Հաստատել պատվերը
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
}
