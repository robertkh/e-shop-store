// todo
import { Table, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { useCookieContext } from "../context/CookieContext";
import { FaCheck, FaTimes } from "react-icons/fa";
// ?
import moment from "moment";
import "moment/min/locales";
moment.locale("hy-am");
// ?

// todo
function numToCurr(n) {
  return new Intl.NumberFormat("hy-AM").format(n) + " \u058F";
}

// todo
export default function MyOrders() {
  // ?
  const [orders, setOrder] = useState([]);
  // console.log(orders);
  const [cook] = useCookieContext();
  // ?
  useEffect(() => {
    async function getOrders() {
      try {
        let response = await fetch("/orders", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: cook.name }),
        });

        let result = await response.json();

        if (response.ok) {
          console.log("yes - ", result);

          setOrder(result);
        } else {
          console.log("no -> ", response.ok);
        }
      } catch (err) {
        console.log("-> catch err", err.message);
      }
    }

    getOrders();
  }, [cook.name]);

  // ?
  return (
    <>
      <h5 className="text-center p-3 mb-3 text-secondary ">Իմ պատվերները</h5>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>TOTAL</th>
            <th>DATE</th>
            <th>PAID</th>
            <th>SHIPPED</th>
            <th>DETAILS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((el, i) => (
            <tr key={el._id}>
              <th scope="row">{i + 1}</th>
              <td>{el._id}</td>
              <td>{numToCurr(el.total)}</td>
              <td>{moment(el.created).format("LL")}</td>
              <td className="text-center">
                {el.paid ? (
                  <FaCheck
                    className="text-success"
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <FaTimes
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </td>
              <td className="text-center">
                {el.shipped ? (
                  <FaCheck
                    className="text-success"
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <FaTimes
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </td>
              <td>
                <Button outline color="info" size="sm">
                  Դիտել մանրամասն
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
