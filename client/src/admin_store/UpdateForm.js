// todo
import { useState, useEffect } from "react";
import { Input, Form, FormGroup, Button, Label } from "reactstrap";
import PlainAlert from "../hooksAndComps/PlainAlert";
import { useRowContext } from "./RowContext";
import { Link } from "react-router-dom";
import HomeButton from "../hooksAndComps/HomeButton";
import { currToNum, writeName } from "../hooksAndComps/myUtilit";
import { useLng } from "../context/LngContext";
// ?
const initLocal = {
  itemName: "",
  itemQty: "",
  itemPrice: "",
};

// todo
export default function UpdateForm() {
  // ?
  const [rowSt /* setRowSt */] = useRowContext();

  // ?
  useEffect(() => {
    setForm({ ...rowSt, itemPrice: currToNum(rowSt.itemPrice) });
  }, [rowSt]);

  // ? local state
  const [form, setForm] = useState(initLocal);
  const [alert, setAlert] = useState({
    show: false,
    isSuccess: false,
    msg: "",
  });
  const strings = useLng();

  // ?
  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name !== "itemName" ? Number(e.target.value) : e.target.value,
    });
  };

  // ?
  async function submitHandler(e) {
    e.preventDefault();

    const response = await fetch("/admin/store/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        itemName: writeName(form.itemName),
      }),
    });

    const result = await response.json();
    const str = (
      <span>
        {" "}
        {result}
        <Link to="/admin/store" className="font-italic ml-4">
          Վերադառնալ պահեստ
        </Link>
      </span>
    );

    if (response.ok) {
      setAlert({ show: true, isSuccess: true, msg: str });
      setForm(initLocal);
    } else {
      setAlert({ show: true, isSuccess: false, msg: result });
    }
  }

  // ?
  return (
    <div className="mt-5 w-50 mx-auto">
      <HomeButton />
      <PlainAlert st={alert} setSt={setAlert} />

      <h5 className="text-center p-3 text-secondary">{strings.tab5_10}</h5>
      <Form onSubmit={submitHandler} autoComplete="off">
        <FormGroup>
          <Label for="updateFormName">{strings.tab5_11}</Label>
          <Input
            id="updateFormName"
            type="text"
            name="itemName"
            value={form.itemName}
            onChange={updateField}
            className="text-danger"
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="updateFormQti">{strings.tab5_12}</Label>
          <Input
            id="updateFormQti"
            name="itemQty"
            min="1"
            value={form.itemQty}
            onChange={updateField}
            className="text-danger"
          />
        </FormGroup>
        <FormGroup>
          <Label for="updateFormPrice">{strings.tab5_13}</Label>
          <Input
            id="updateFormPrice"
            name="itemPrice"
            value={form.itemPrice}
            onChange={updateField}
            className="text-danger"
          />
        </FormGroup>
        <Button color="info" className="btn-block">
          {strings.tab5_14}
        </Button>{" "}
      </Form>
    </div>
  );
}
