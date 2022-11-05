// todo
import { FaBarcode, FaArrowAltCircleRight } from "react-icons/fa";

// todo
export default function Store() {
	return (
		<div id="store-card" className="col-3 px-4">
			<div className="row  alert-warning py-2 ">
				<div className="col-4 text-left">
					<FaBarcode size={70} />
				</div>
				<div className="col-8 text-right">
					<p className="pt-2"> Պահեստ </p>
				</div>
			</div>

			<a href="/admin/store" style={{ textDecoration: "none" }}>
				<div className="row  alert-secondary py-2">
					<div className="col-4 text-left">Դիտել</div>
					<div className="col-8 text-right">
						<FaArrowAltCircleRight />
					</div>
				</div>
			</a>
		</div>
	);
}
