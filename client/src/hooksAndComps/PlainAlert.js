// todo
import { UncontrolledAlert } from "reactstrap";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

// todo
export default function PlainAlert({
	st = { show: false, isSuccess: true, msg: "default message" },
	setSt,
}) {
	// ?
	return (
		<div className="text-center">
			{st.show && (
				<UncontrolledAlert
					color={st.isSuccess ? "success" : "danger"}
					onClick={() => setSt({ ...st, show: false })}
				>
					{st.isSuccess ? (
						<FaCheckCircle size={25} className="float-left" />
					) : (
						<FaExclamationTriangle
							size={25}
							className="float-left"
						/>
					)}
					{st.msg}
				</UncontrolledAlert>
			)}
		</div>
	);
}
