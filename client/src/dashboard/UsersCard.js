// todo
import { FaArrowAltCircleRight } from "react-icons/fa";
import { ImUsers } from "react-icons/im";

// todo
export default function UserList() {
	return (
		<div id="user-card" className="col-3 px-4">
			<div className="row  alert-danger py-2 ">
				<div
					className="col-2 text-left pt-2"
					style={{ height: "70px" }}
				>
					<ImUsers size={50} />
				</div>
				<div className="col-10 text-right">
					<p className="pt-2"> Գործընկերներ </p>
				</div>
			</div>

			<a href="/admin/users" style={{ textDecoration: "none" }}>
				<div className="row  alert-secondary py-2">
					<div className="col-4 text-left">Տվյալներ</div>
					<div className="col-8 text-right">
						<FaArrowAltCircleRight />
					</div>
				</div>
			</a>
		</div>
	);
}
