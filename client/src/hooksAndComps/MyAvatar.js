// todo
import { FaRegUser } from "react-icons/fa";

// todo
const avatarStyles = {
	fontSize: "50px",
	color: "#fff",
	margin: "20px auto",
	textAlign: "center",
	width: "100px",
	height: "100px",
	borderRadius: "50%",
};

// todo
export default function Avatar() {
	return (
		<div className="bg-success" style={avatarStyles}>
			<FaRegUser />
		</div>
	);
}
