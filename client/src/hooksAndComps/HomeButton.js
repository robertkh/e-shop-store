// todo
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import MyToolTip from "../hooksAndComps/MyToolTip";
import { useLng } from "../context/LngContext";

// todo
const avatarStyles = {
	position: "fixed",
	top: "50px",
	left: "50px",
	fontSize: "25px",
	lineHeight: "0%",
	textAlign: "center",
	width: "50px",
	height: "50px",
	borderRadius: "50%",
};

// todo
export default function HomeButton() {
	// ?
	const strings = useLng();

	// ?
	return (
		<Link to="/">
			<button
				type="button"
				className="btn btn-outline-success "
				style={avatarStyles}
				data-tip={strings.tab1_a}
				data-for="homePageButton"
			>
				<FaHome />
			</button>
			<MyToolTip id="homePageButton" place="bottom" type="success" />
		</Link>
	);
}
