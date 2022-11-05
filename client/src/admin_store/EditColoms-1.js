// todo
import { MdBorderColor, MdDelete } from "react-icons/md";

// todo
export function Edit({ color, size = 22 }) {
	// ?
	return (
		<MdBorderColor
			color={color}
			size={size}
			style={{ cursor: "pointer" }}
		/>
	);
}

// todo
export function Del({ color, size = 25 }) {
	// ?
	return (
		<MdDelete color="orange" size={size} style={{ cursor: "pointer" }} />
	);
}
