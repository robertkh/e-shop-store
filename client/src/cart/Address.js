// todo
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useCartContext } from "../context/CartContext";
import { useCookieContext } from "../context/CookieContext";

// todo
export default function ShippingAddress({ state, disp }) {
	const [order, orderDisp] = useCartContext();
	const [cook /*  updateCook */] = useCookieContext();

	// ?
	function submitHundler(e) {
		e.preventDefault();
		const f = e.target;
		orderDisp({
			type: "addAddress",
			data: f,
			id: cook.id,
			name: cook.name,
		});
		disp({ type: "goPayDiv" });
	}

	// ?
	return (
		<div className="w-75 mx-auto">
			<h5 className="text-secondary text-center my-5">Առաքման հասցե</h5>
			<Form onSubmit={submitHundler} className="text-info">
				<Row form>
					<Col>
						<FormGroup>
							<Label for="exampleCity">Քաղաք</Label>
							<Input
								type="text"
								name="city"
								id="exampleCity"
								defaultValue={order.address.city}
								required
							/>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="exampleState">Համայք</Label>
							<Input
								type="text"
								name="region"
								id="exampleState"
								defaultValue={order.address.region}
								required
							/>
						</FormGroup>
					</Col>
					<Col md={2}>
						<FormGroup>
							<Label for="exampleZip">Փոստային կոդ</Label>
							<Input
								type="text"
								name="zip"
								id="exampleZip"
								defaultValue={order.address.zip}
								required
							/>
						</FormGroup>
					</Col>
				</Row>
				<FormGroup>
					<Label for="exampleAddress2">Փողոց ․․․</Label>
					<Input
						type="text"
						name="str"
						defaultValue={order.address.str}
						required
					/>
				</FormGroup>
				<Row form>
					<Col>
						<FormGroup check>
							<Input
								type="checkbox"
								name="chk"
								id="exampleCheck"
								defaultChecked={true}
							/>
							<Label for="exampleCheck" check>
								Հիշել հասցեն։
							</Label>
						</FormGroup>
					</Col>

					<Col className="text-right">
						<Button>Շարունակել</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
}
