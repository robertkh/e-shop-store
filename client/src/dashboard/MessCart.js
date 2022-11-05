// todo
import { FaComments, FaArrowAltCircleRight } from "react-icons/fa";

// todo
export default function MessRead() {
	return (
		<div id="message-card" className="col-3 px-4">
			<div className="row  alert-success py-2 ">
				<div
					className="col-2 text-left pt-2"
					style={{ height: "70px" }}
				>
					<FaComments size={50} />
				</div>
				<div className="col-10 text-right">
					<p className="pt-2"> Հաղորդագրություններ </p>
				</div>
			</div>

			<a href="/admin/messages" style={{ textDecoration: "none" }}>
				<div className="row  alert-secondary py-2">
					<div className="col-4 text-left">Կարդալ</div>
					<div className="col-8 text-right">
						<FaArrowAltCircleRight />
					</div>
				</div>
			</a>
		</div>
	);
}
