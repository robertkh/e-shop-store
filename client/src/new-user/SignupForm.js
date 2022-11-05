// todo
import React, { useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { useLng } from "../context/LngContext";
import { FaUserAlt, FaPaperPlane, FaLock } from "react-icons/fa";

// todo
export default function SignupForm({ disp }) {
  // ?
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    conf_password: "",
  });
  const strings = useLng();

  // ?
  async function signupSubmitHandler(e) {
    e.preventDefault();
    try {
      let response = await fetch("/users/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(state),
      });

      let result = await response.json();

      if (response.ok) {
        disp({ type: "clearStates" });
        disp({ type: "showAlert", col: true, msg: result });
        disp({ type: "showLogin" });
      } else {
        disp({ type: "showAlert", col: false, msg: result });
      }
    } catch (err) {
      console.log("--->>> catch-err", err.message);
    }
  }

  return (
    <>
      <Form onSubmit={signupSubmitHandler}>
        <h5 className="text-center mb-4 text-secondary">{strings.tab3_7} </h5>

        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="bg-white text-primary">
              <FaUserAlt />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Username"
            id="signupUsername"
            value={state.username}
            onChange={(e) => {
              e.persist();
              setState((prev) => {
                return {
                  ...prev,
                  username: e.target.value,
                };
              });
            }}
          />
        </InputGroup>

        <InputGroup className="mt-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="bg-white text-primary">
              <FaPaperPlane />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="email"
            name="email"
            id="signupEmail"
            placeholder="Email Address"
            value={state.email}
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
        </InputGroup>

        <InputGroup className="mt-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="bg-white text-primary">
              <FaLock />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="password"
            name="password"
            id="signupPassword"
            placeholder="Password"
            value={state.password}
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
        </InputGroup>

        <InputGroup className="my-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="bg-white text-primary">
              <FaLock />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="password"
            name="password"
            id="signupConfirmPassword"
            placeholder="Confirm Password"
            value={state.conf_passworrd}
            onChange={(e) => {
              e.persist();
              setState((prev) => {
                return {
                  ...prev,
                  conf_password: e.target.value,
                };
              });
            }}
          />
        </InputGroup>

        <InputGroup>
          <Button color="primary" size="sm" block>
            {strings.tab3_8}
          </Button>
        </InputGroup>
      </Form>

      <div className="w-100 px-2 mt-4" style={{ fontFamily: "sans-serif" }}>
        {strings.tab3_9}
        <Button
          size="sm"
          className="text-primery float-right"
          color="link"
          style={{ lineHeight: 1 }}
          onClick={() => {
            disp({ type: "clearStates" });
            disp({ type: "showLogin" });
          }}
        >
          {strings.tab3_10}
        </Button>
      </div>
    </>
  );
}
