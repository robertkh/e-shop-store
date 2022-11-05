// ?
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";
import { Spinner } from "reactstrap";
// ?
import { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { currToNum, numToCurr } from "../hooksAndComps/myUtilit";
import { FaCheck, FaTimes } from "react-icons/fa";
import HomeButton from "../hooksAndComps/HomeButton";
import _ from "lodash";
// ?
import moment from "moment";
import "moment/min/locales";
moment.locale("hy-am");
// ?

// todo
export default function OrderList() {
	// ?
	const [orders, setOrder] = useState([]);

	// ? - spinner
	const [sp, setSp] = useState({});
	const [loading, setLoading] = useState(false);
	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
	`;
	// ? - spinner

	useEffect(() => {
		async function fetchUsers() {
			setLoading(true);
			try {
				let response = await fetch("/admin/orders", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({}),
				});

				let result = await response.json();

				if (response.ok) {
					let data = result.map((el) => {
						let { cartContent, ...rest } = el;
						let total = el.cartContent.reduce((sum, val) => {
							return sum + val.qty * currToNum(val.price);
						}, 0);

						return {
							...rest,
							total: numToCurr(total),
							user: el.user.username,
						};
					});
					// պտույտ չի լինի
					let x = {};
					result.map((el) => {
						return (x[el._id] = { paid: false, delevered: false });
					});
					setSp(x);
					//
					setOrder(data);
					setLoading(false);
				} else {
					console.log("no -> ", response.ok);
				}
			} catch (err) {
				console.log("-> catch err", err.message);
			}
		}

		fetchUsers();
	}, []);

	// ?
	async function clickHandler(id, field) {
		// պտույտ կա
		setSp({ ...sp, [id]: { ...sp[id], [field]: true } });
		//
		try {
			let response = await fetch("/admin/orders/status", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: id, field: field }),
			});
			let result = await response.json();

			if (response.ok) {
				let el = _.find(orders, { _id: id });
				el[field] = !el[field];
				// պտույտ չկա
				setSp({ ...sp, [id]: { ...sp[id], [field]: false } });
			} else {
				console.log("no ", result);
			}
		} catch (err) {
			console.log("--->>> catch err", err.message);
		}
	}

	// ?
	return (
		<div className="mt-5 w-75 mx-auto">
			<HomeButton />
			<PuffLoader
				color="green"
				loading={loading}
				css={override}
				size={150}
			/>
			{!loading && (
				<div>
					<h5 className="text-center p-3 my-4 text-secondary ">
						Պատվերներ
					</h5>

					<Table>
						<thead className="alert-primary">
							<tr>
								<th>#</th>
								<th>ID</th>
								<th>USER</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th>DETAILS</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((el, i) => (
								<tr key={el._id}>
									<th scope="row">{i + 1}</th>
									<td>{el._id}</td>
									<td>{el.user}</td>
									<td>{moment(el.created).format("LL")}</td>
									<td>{el.total}</td>
									<td
										className="text-center"
										onClick={() =>
											clickHandler(el._id, "paid")
										}
									>
										{sp[el._id] && sp[el._id].paid ? (
											<Spinner
												size="sm"
												color="primary"
											/>
										) : el.paid ? (
											<FaCheck
												className="text-success"
												style={{ cursor: "pointer" }}
											/>
										) : (
											<FaTimes
												className="text-danger"
												style={{ cursor: "pointer" }}
											/>
										)}
									</td>
									<td
										className="text-center"
										onClick={() =>
											clickHandler(el._id, "shipped")
										}
									>
										{sp[el._id] && sp[el._id].shipped ? (
											<Spinner
												size="sm"
												color="primary"
											/>
										) : el.shipped ? (
											<FaCheck
												className="text-success"
												style={{ cursor: "pointer" }}
											/>
										) : (
											<FaTimes
												className="text-danger"
												style={{ cursor: "pointer" }}
											/>
										)}
									</td>
									<td>
										<a href={`/invoice/${el._id}`}>
											<Button
												outline
												color="info"
												size="sm"
											>
												Դիտել մանրամասն
											</Button>
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			)}
		</div>
	);
}
