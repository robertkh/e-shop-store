// todo
import useToggle from "../hooksAndComps/usetoggle";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

// todo
export default function OneMessage({ data, update }) {
	// ?
	const [isOpen, toggle] = useToggle();

	// ?
	async function clickHandler() {
		await fetch("/admin/messages/del", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				messId: data._id,
			}),
		});

		update((pr) => {
			let old = pr.filter((value) => value._id !== data._id);
			return [...old];
		});
	}

	// ?
	return (
		<div className="card small rounded-bottom my-2 border-info">
			<div className="text-hide"> {data._id} </div>
			<div
				className="card-header bg-primary text-white rounded p-1 px-3 "
				onClick={() => toggle()}
				style={{ cursor: "pointer" }}
			>
				<div className="row pt-1">
					<div className="col-8 ">
						<h6 className="panel-title name text-left">
							{data.username}
						</h6>
					</div>
					<div className="col-4 text-right">
						{isOpen ? (
							<FaAngleUp size={18} />
						) : (
							<FaAngleDown size={18} />
						)}
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="card-body">
					<div className="row m-1">
						<div className="col-2">
							<strong>E-mail:</strong>
						</div>
						<div className="col-10 text-left alert-secondary py-2 rounded">
							{data.email}
						</div>
					</div>
					<div className="row m-1">
						<div className="col-2">
							<strong>Subject:</strong>
						</div>
						<div className="col-10 text-left alert-secondary py-2 rounded">
							{data.subject}
						</div>
					</div>
					<div className="row m-1">
						<div className="col-2">
							<strong>Message:</strong>
						</div>
						<div className="col-10 text-left alert-secondary py-2 rounded">
							{data.message}
						</div>
					</div>
					<button
						className="btn btn-danger btn-block mt-3 "
						onClick={clickHandler}
					>
						Հեռացնել հաղորդագրությունը
					</button>
				</div>
			)}
		</div>
	);
}
