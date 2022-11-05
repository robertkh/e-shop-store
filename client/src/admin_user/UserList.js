// todo
import { Del } from "../admin_store/EditColoms-1";
import PlainAlert from "../hooksAndComps/PlainAlert";
import HomeButton from "../hooksAndComps/HomeButton";
// ?
import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import _ from "lodash";
import { FaCheck, FaTimes } from "react-icons/fa";
// ?
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";
import { Spinner } from "reactstrap";
// ?
import moment from "moment";
import "moment/min/locales";
moment.locale("hy-am");
// ?

// todo
export default function UserList() {
	// ?
	const [usersData, setData] = useState([]);
	const [reload, setReload] = useState(false);
	const [alertSt, setAlertSt] = useState({
		show: false,
		isSuccess: false,
		msg: "default",
	});
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
				let response = await fetch("/admin/users", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({}),
				});

				let result = await response.json();

				if (response.ok) {
					let spinObj = {};
					result.map((el) => (spinObj[el._id] = false));
					setSp(spinObj);
					//
					setData(result);
					setLoading(false);
				} else {
					console.log(response.ok);
				}
			} catch (err) {
				console.log("--->>> catch err", err.message);
			}
		}

		fetchUsers();
	}, [reload]);

	// ?
	const deleteHandler = async (id) => {
		if (window.confirm("Վստա՞հ եք, որ կուզենայիք հեռացնել։")) {
			try {
				let response = await fetch("/admin/users/del", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json;charset=utf-8",
					},
					body: JSON.stringify({ id: id }),
				});

				let result = await response.json();

				if (response.ok) {
					setReload((prev) => !prev);
					setAlertSt({
						show: true,
						isSuccess: true,
						msg: result,
					});
				} else {
					setAlertSt({
						show: true,
						isSuccess: false,
						msg: result,
					});
				}
			} catch (err) {
				console.log("-> catch-err: ", err.message);
			}
		}
	};

	// ?
	async function clickHandler(id) {
		setSp({ ...sp, [id]: true });
		try {
			let response = await fetch("/admin/users/status", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: id }),
			});

			let result = await response.json();

			if (response.ok) {
				let el = _.find(usersData, { _id: id });
				el.isAdmin = !el.isAdmin;
				setSp({ ...sp, [id]: false });
			} else {
				console.log("no ", result);
			}
		} catch (err) {
			console.log("--->>> catch err", err.message);
		}
	}

	//?
	return (
		<div className="mt-5 w-75 mx-auto">
			<PlainAlert st={alertSt} setSt={setAlertSt} />
			<HomeButton />
			<h5 className="text-center p-3 my-4 text-secondary ">
				Գործընկերներ
			</h5>

			<PuffLoader
				color="green"
				loading={loading}
				css={override}
				size={150}
			/>

			{!loading && (
				<Table hover>
					<thead className="alert-success">
						<tr>
							<th>#</th>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>JOIN DATE</th>
							<th>ADMIN</th>
							<th>REG</th>
							<th>DEL</th>
						</tr>
					</thead>
					<tbody>
						{usersData.map((el, i) => (
							<tr key={el._id}>
								<th scope="row">{i + 1}</th>
								<td>{el._id}</td>
								<td>{el.username}</td>
								<td>
									<a href={`mailto:${el.email}`}>
										{el.email}
									</a>
								</td>
								<td>{moment(el.created).format("LL")}</td>
								<td
									className="text-center"
									onClick={() => {
										clickHandler(el._id);
									}}
								>
									{" "}
									{sp[el._id] ? (
										<Spinner size="sm" color="primary" />
									) : el.isAdmin ? (
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
								<td className="text-center">
									{el.isReged ? (
										<FaCheck className="text-success" />
									) : (
										<FaTimes className="text-danger" />
									)}
								</td>
								<td
									className="text-center"
									onClick={() => deleteHandler(el._id)}
								>
									<Del />
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
}
