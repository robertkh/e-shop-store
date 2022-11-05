// todo
import { useState } from "react";
import { Input, Form, FormGroup, Button } from "reactstrap";
import PlainAlert from "../hooksAndComps/PlainAlert";
import { Link } from "react-router-dom";
import HomeButton from "../hooksAndComps/HomeButton";
import FileUpload from "./FileUpload";
import { useLng } from "../context/LngContext";
import { writeName } from "../hooksAndComps/myUtilit";

// ?
const initLocal = {
	itemName: "",
	itemQty: "",
	itemPrice: "",
};

// todo
export default function AddForm() {
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
				e.target.name !== "itemName"
					? Number(e.target.value)
					: e.target.value,
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

		setAlert({ show: true, isSuccess: response.ok, msg: str });

		response.ok && setForm({ ...initLocal });
	}

	// ?
	return (
		<div className="mt-5 w-50 mx-auto">
			<HomeButton />
			<PlainAlert st={alert} setSt={setAlert} />

			<h5 className="text-center p-3 text-secondary">{strings.tab5_5}</h5>
			<Form onSubmit={submitHandler} autoComplete="off">
				<FormGroup>
					<Input
						type="text"
						name="itemName"
						value={form.itemName}
						placeholder="Անուն"
						onChange={updateField}
						className="text-danger"
					/>
				</FormGroup>
				<FormGroup>
					<Input
						name="itemQty"
						min="1"
						value={form.itemQty}
						placeholder="Քանակ"
						onChange={updateField}
						className="text-danger"
					/>
				</FormGroup>
				<FormGroup>
					<Input
						name="itemPrice"
						placeholder="Գին"
						value={form.itemPrice}
						onChange={updateField}
						className="text-danger"
					/>
				</FormGroup>
				<Button color="info">Ավելացնել</Button>{" "}
			</Form>

			<FileUpload disp={setAlert} />
		</div>
	);
}
