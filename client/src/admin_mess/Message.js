// todo
import { useState, useEffect } from "react";
import OneMess from "./OneMessage";
import _ from "lodash";
import HomeButton from "../hooksAndComps/HomeButton";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

// todo
export default function ShowAllMessages() {
  // ?
  const [messages, setM] = useState([]);

  // ? - spinner
  const [loading, setLoading] = useState(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  // ?
  useEffect(() => {
    setLoading(true);
    async function handler() {
      const response = await fetch("/admin/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      const result = await response.json();
      setLoading(false);
      setM(result);
    }

    handler();
  }, [setM]);

  // ?
  return (
    <div className="container w-50 mt-5">
      <HomeButton />
      <PuffLoader color="green" loading={loading} css={override} size={150} />
      {!loading && (
        <div>
          <div className="my-5 text-center text-secondary">
            <h4>Հաղորդագրություններ</h4>
          </div>
          {_.isEmpty(messages) ? (
            <span>empty data</span>
          ) : (
            messages.map((item) => (
              <OneMess key={item._id} data={item} update={setM} />
            ))
          )}{" "}
        </div>
      )}
    </div>
  );
}
