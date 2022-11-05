// todo
import { useState, useEffect } from "react";
import { useCookieContext } from "../context/CookieContext";
import PlainAlert from "../hooksAndComps/PlainAlert";
import { useLng } from "../context/LngContext";

// todo
export default function MessForm() {
	// ?
	const [cook /*  updateCook */] = useCookieContext();
	const initformState = {
		username: "",
		email: "",
		subject: "",
		message: "",
	};
	const [form, setForm] = useState(initformState);
	const [alert, setAlert] = useState({
		show: false,
		isSuccess: false,
		msg: "",
	});
	const strings = useLng();

	useEffect(() => {
		setForm((prevSt) => {
			return { ...prevSt, username: cook.name };
		});
	}, [cook.name]);

	// ?
	const updateField = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value.trim(),
		});
	};

	// ?
	async function submitHandler(e) {
		e.preventDefault();

		const response = await fetch("/contact", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form),
		});

		const result = await response.json();

		setAlert({ show: true, isSuccess: response.ok, msg: result });

		response.ok && setForm({ ...initformState });
	}

	// ?
	return (
		<div className="w-50 mx-auto my-5 text-center">
			<PlainAlert st={alert} setSt={setAlert} />
			<h5 className="mb-4 text-secondary p-3">{strings.tab4_1}</h5>

			<form className="pb-5" onSubmit={submitHandler}>
				<div>
					<input
						className="form-control mt-3 text-danger"
						name="username"
						type="text"
						value={form.username}
						readOnly // disabled
					/>

					<input
						className="form-control mt-3 text-danger"
						name="email"
						placeholder="E-mail"
						type="text"
						value={form.email}
						required
						autoComplete="off"
						onChange={updateField}
					/>

					<input
						className="form-control mt-3 text-danger"
						name="subject"
						placeholder="Subject"
						type="text"
						value={form.subject}
						autoComplete="off"
						required
						onChange={updateField}
					/>

					<textarea
						className="form-control mt-3 text-danger"
						style={{
							resize: "vertical",
						}}
						placeholder="Message..."
						value={form.message}
						rows="6"
						name="message"
						required
						autoComplete="off"
						onChange={updateField}
					></textarea>
				</div>

				<div className="p-3">
					<input
						className="btn btn-success w-25 float-left"
						type="submit"
						value={strings.tab4_2}
					/>
					<input
						className="btn btn-warning w-25 float-right"
						type="reset"
						value={strings.tab4_3}
						// * Մենակ էսպես ճիշտ աշխատեց
						onClick={() => setForm({ ...initformState })}
					/>
				</div>
			</form>
		</div>
	);
}
