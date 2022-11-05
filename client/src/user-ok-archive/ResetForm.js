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
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useLng } from "../context/LngContext";

// todo
export default function ResetForm({ disp }) {
	// ?
	const [state, setState] = useState({
		email: "",
		password: "",
	});
	const strings = useLng();

	// ?
	async function resetSubmitHandler(e) {
		e.preventDefault();
		try {
			let response = await fetch("/users/reset", {
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

	// ?
	return (
		<>
			<Form onSubmit={resetSubmitHandler}>
				<h5 className="text-center mb-4 text-secondary">
					{strings.tab3_11}
				</h5>
				<p className="text-center text-info">
					{strings.tab3_12}
					<br />
					{strings.tab3_12a}
				</p>

				<InputGroup>
					<InputGroupAddon addonType="prepend">
						<InputGroupText className="bg-white text-info">
							<FaEnvelope />
						</InputGroupText>
					</InputGroupAddon>
					<Input
						type="email"
						name="email"
						id="resetEmail"
						placeholder="Email Address"
						value={state.email}
						onChange={(e) =>
							setState((prev) => {
								return {
									...prev,
									email: e.target.value,
								};
							})
						}
					/>
				</InputGroup>

				<InputGroup className="my-3">
					<InputGroupAddon addonType="prepend">
						<InputGroupText className="bg-white text-info">
							<FaLock />
						</InputGroupText>
					</InputGroupAddon>
					<Input
						type="password"
						name="new password"
						id="resetPassword"
						placeholder="New Password"
						value={state.password}
						onChange={(e) =>
							setState((prev) => {
								return {
									...prev,
									password: e.target.value,
								};
							})
						}
					/>
				</InputGroup>

				<InputGroup>
					<Button color="info" size="sm" block>
						{strings.tab3_13}
					</Button>
				</InputGroup>
			</Form>

			<div className="w-100 px-2 mt-4">
				{strings.tab3_14}
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
					{strings.tab3_15}
				</Button>
			</div>
		</>
	);
}
