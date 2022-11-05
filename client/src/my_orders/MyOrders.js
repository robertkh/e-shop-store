// todo
import { Table, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { useCookieContext } from "../context/CookieContext";
import { useUpdateComponentContext } from "../context/UpdateComponentContext";
import { FaCheck, FaTimes } from "react-icons/fa";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
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
		async function getOrders() {
			setLoading(true);
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
					setOrder(result);
					setLoading(false);
				} else {
					console.log("no -> ", response.ok);
				}
			} catch (err) {
				console.log("-> catch err", err.message);
			}
		}

		getOrders();
	}, [cook.name, toggle]);

	// ?
	return (
		<>
			<h5 className="text-center p-3 mb-3 text-secondary ">
				Իմ պատվերները
			</h5>
			<PuffLoader
				color="green"
				loading={loading}
				css={override}
				size={150}
			/>
			{!loading && (
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
										<FaCheck className="text-success" />
									) : (
										<FaTimes className="text-danger" />
									)}
								</td>
								<td className="text-center">
									{el.shipped ? (
										<FaCheck className="text-success" />
									) : (
										<FaTimes className="text-danger" />
									)}
								</td>
								<td>
									<a href={`/invoice/${el._id}`}>
										<Button outline color="info" size="sm">
											Դիտել մանրամասն
										</Button>
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
}
