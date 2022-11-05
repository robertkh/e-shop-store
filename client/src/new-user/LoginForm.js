// todo
import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  CustomInput,
  Row,
  Col,
} from "reactstrap";
import { useCookieContext } from "../context/CookieContext";
import { useLng } from "../context/LngContext";

// todo
export default function LoginForm({ disp }) {
  // ?
  const strings = useLng();
  const [, /* cook, */ updateCook] = useCookieContext();

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  console.log(state);

  // ?
  async function loginSubmitHandler(e) {
    e.preventDefault();

    try {
      let response = await fetch("/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      let result = await response.json();

      if (response.ok) {
        disp({ type: "clearStates" });
        disp({ type: "showAlert", col: true, msg: result });
        disp({ type: "showLogout" });
        updateCook();
      } else {
        disp({ type: "showAlert", col: false, msg: result });
      }
    } catch (err) {
      console.log("--->>> catch err", err.message);
    }
  }

  // ?
  return (
    <>
      <Form onSubmit={loginSubmitHandler}>
        <h5 className="text-center mb-5 text-secondary">{strings.tab3_1} </h5>

        <FormGroup>
          <Input
            type="email"
            name="email"
            id="loginEmail"
            placeholder="Email"
            onChange={(e) => {
              e.persist();
              setState((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              });
            }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            name="password"
            id="loginPassword"
            placeholder="Password"
            onChange={(e) => {
              e.persist();
              setState((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              });
            }}
          />
        </FormGroup>

        <Row form className="px-1">
          <Col sm={6}>
            <div className="float-left">
              <FormGroup style={{ lineHeight: 1.7 }}>
                <CustomInput
                  type="checkbox"
                  id="loginCheckbox"
                  label={strings.tab3_2}
                />
              </FormGroup>{" "}
            </div>
          </Col>

          <Col sm={6}>
            <div className="float-right">
              <FormGroup>
                <Button
                  size="sm"
                  className="text-success"
                  color="link"
                  style={{ lineHeight: 1 }}
                  onClick={() => {
                    disp({ type: "clearStates" });
                    disp({ type: "showReset" });
                  }}
                >
                  {strings.tab3_3}
                </Button>
              </FormGroup>
            </div>
          </Col>
        </Row>

        <Button color="success" size="sm" block>
          {strings.tab3_4}
        </Button>
      </Form>

      <div className="w-100 px-2 mt-4">
        {strings.tab3_5}
        <Button
          size="sm"
          className="text-success float-right"
          color="link"
          style={{ lineHeight: 1 }}
          onClick={() => {
            disp({ type: "clearStates" });
            disp({ type: "showSignup" });
          }}
        >
          {strings.tab3_6}
        </Button>
      </div>
    </>
  );
}
