// todo
import { FaRegHandPointRight, FaCheck } from "react-icons/fa";
import { UncontrolledAlert } from "reactstrap";

// todo
export default function UserAlert({ state, disp }) {
	// ?
	return (
		<UncontrolledAlert
			color={state.col ? "success" : "danger"}
			className="pr-3 py-2"
			closeClassName="py-1 px-3 alert-x"
			onClick={() => {
				disp({ type: "hideAlert" });
			}}
		>
			{state.col ? (
				<>
					<FaCheck /> <strong>Success Message</strong>
				</>
			) : (
				<>
					<FaRegHandPointRight /> <strong>Danger Message</strong>
				</>
			)}

			<hr className=" my-2" />
			<p className="my-1">{state.msg}</p>
		</UncontrolledAlert>
	);
}
