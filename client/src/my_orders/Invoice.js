import { useEffect, useState } from "react";
import { useCookieContext } from "../context/CookieContext";
import { useUpdateComponentContext } from "../context/UpdateComponentContext";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import { numToCurr, currToNum } from "../hooksAndComps/myUtilit";
import HomeButton from "../hooksAndComps/HomeButton";
import Paypal from "./Paypal";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Table,
  Alert,
} from "reactstrap";
// ?
import moment from "moment";
import "moment/min/locales";
moment.locale("hy-am");

// ?

// todo
export default function Invoice({ path }) {
  // ?
  const [data, setData] = useState({});
  const [pay, setPay] = useState({
    subTotal: +0,
    tax: +20,
    ship: +1000,
    total: +0,
  });

  const [cook] = useCookieContext();
  const [toggle] = useUpdateComponentContext();

  // ? - spinner
  const [loading, setLoading] = useState(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  // ? - spinner

  // ?
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({}),
      });

      let result = await response.json();

      if (response.ok) {
        setData((pr) => result);
        setLoading(false);
      } else {
        console.log(response.status);
      }
    }
    try {
      fetchData();
    } catch (err) {
      console.log("--->>> catch err", err.message);
    }
  }, [path, toggle]);

  useEffect(() => {
    let s = data.cartContent
      ? data.cartContent.reduce((sum, val) => {
          return sum + val.qty * currToNum(val.price);
        }, 0)
      : 0;

    let taxPrice = (s * pay.tax) / 100;

    let t = +s + taxPrice + pay.ship;

    setPay((pay) => ({
      ...pay,
      subTotal: s,
      total: t,
      taxPrice: taxPrice,
    }));
  }, [data, pay.tax, pay.ship]);

  // ?
  async function clickHandler() {
    alert(1);
  }

  // ?
  return (
    <div className="p-5" style={{ background: "#f2f2f2" }}>
      <HomeButton />

      <div
        className="mx-auto rounded p-5"
        style={{
          width: "75%",
          background: "white",
          minHeight: "100vh",
          border: "1px solid",
          borderColor: "#cccccc",
        }}
      >
        <PuffLoader color="green" loading={loading} css={override} size={150} />
        {!loading && (
          <>
            <Container>
              <Row>
                <Col xs="2" className="p-0">
                  <img src="/images/logo_2.jpg" alt="logo" height="100px" />
                </Col>
              </Row>

              <Row className="mt-5">
                <Col
                  xs="4"
                  style={{
                    width: "100%",
                    height: "150px",
                    backgroundColor: "#e6e6e6",
                    border: "1px solid",
                    borderColor: "#cccccc",
                  }}
                  className=" rounded p-3"
                >
                  <strong>Հրաշք ընկերություն</strong>
                  <br />
                  Ամառանոցային 1-ին տար․ <br />
                  Երևան, Հայաստան <br />
                  (+374) 55-555-555
                </Col>

                <Col xs="1"></Col>

                <Col
                  xs="6"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <ListGroup>
                    <ListGroupItem>
                      <strong>Հաճախորդ #</strong>
                      <span className="float-right">
                        {data && data.user && data.user.username}
                      </span>
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Ապրանքագիր #</strong>
                      <span className="float-right">{data._id}</span>
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Ամսաթիվ</strong>
                      <span className="float-right">
                        {moment(data.created).format("LL")}
                      </span>
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>

              <Row>
                <h5 className="mt-5 mb-3">
                  <strong className="text-secondary">Առաքում</strong>{" "}
                </h5>
              </Row>

              <Row>
                {data.address && data.address.city}
                {", "}
                {data.address && data.address.region}
                {", "}
                {data.address && data.address.str}
                {", "}
                {data.address && data.address.zip}
              </Row>

              <Row>
                {data.shipped ? (
                  <Alert color="success" className="w-100 mt-2">
                    <FaCheckCircle size={25} className="mr-3" />
                    Ապրանքն առաքված է։
                  </Alert>
                ) : (
                  <Alert color="danger" className="w-100 mt-2">
                    <FaExclamationTriangle size={25} className="mr-3" />
                    Առաքումը կատարված չէ։
                  </Alert>
                )}
              </Row>
            </Container>
            <h5 className="my-4">
              <strong className="text-secondary">Ապրանքագիր</strong>{" "}
            </h5>
            <Table className="mb-4" bordered>
              <thead style={{ background: "#f2f2f2" }}>
                <tr>
                  <th>#</th>
                  <th>Անվանում</th>
                  <th>Քանակ</th>
                  <th>Գին</th>
                  <th>Գումար</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.cartContent &&
                  data.cartContent.map((el, i) => (
                    <tr key={el._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{el.name}</td>
                      <td>{el.qty}</td>
                      <td>{el.price}</td>
                      <td>{numToCurr(currToNum(el.price) * el.qty)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>{" "}
            {/*  */}
            <Container className="p-0">
              <Row>
                <Col xs="6"></Col>
                <Col>
                  <ListGroup>
                    <ListGroupItem>
                      <strong className="text-secondary">Գումար</strong>
                      <span className="float-right">
                        {numToCurr(pay.subTotal)}
                      </span>
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong className="text-secondary">Հարկ (20%)</strong>
                      <span className="float-right">
                        {numToCurr((pay.tax * pay.subTotal) / 100)}
                      </span>
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong className="text-secondary">Առաքման գին</strong>
                      <span className="float-right">{numToCurr(pay.ship)}</span>
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong className="text-secondary">
                        Ընդհանուր գումար
                      </strong>
                      <span className="float-right">
                        {numToCurr(
                          +pay.subTotal +
                            +(pay.tax * pay.subTotal) / 100 +
                            +pay.ship
                        )}
                      </span>
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </Container>
            {/*  */}
            <div className="mt-3">
              {data.paid ? (
                <Alert color="success" className="w-100 mt-2">
                  <FaCheckCircle size={25} className="mr-3" />
                  Վճարումը կատարված է։
                </Alert>
              ) : (
                cook.id === cook.check && (
                  <Alert color="danger" className="w-100 mt-2">
                    <FaExclamationTriangle size={25} className="mr-3" />
                    Վճարումը կատարված չէ։
                  </Alert>
                )
              )}
            </div>
            {/*  */}
            {!data.paid && cook.id !== cook.check && (
              <div className=" mt-4 text-center">
                {data.payMethod === "PayPal" ? (
                  <Paypal payData={{ ...pay, _id: data._id }} />
                ) : (
                  <button
                    className="btn btn-outline-dark btn-block btn-lg"
                    onClick={clickHandler}
                    block
                  >
                    Վճարել {"\u00A0\u00A0\u00A0"} ( {data.payMethod} )
                  </button>
                )}
              </div>
            )}
            <div className="text-center mt-5">
              <h6 className="text-secondary">
                Շնորհակալություն ձեր բիզնեսի համար
              </h6>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
