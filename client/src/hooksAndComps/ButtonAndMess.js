// todo
export default function ButtonAndMess() {
	return (
		<div
			className="alert alert-info row w-100 mx-auto mt-4"
			style={{ fontSize: "14px" }}
		>
			<div className="col-7 pt-1">
				<strong>Միայն </strong>
				գրանցված օգտատերերի համար։
			</div>

			<div className="col-5 ">
				<button
					className="btn btn-info center-block float-right"
					style={{ fontSize: "14px" }}
					onClick={}
				>
					Ուղարկել հաղորդագրություն
				</button>
			</div>
		</div>
	);
}
