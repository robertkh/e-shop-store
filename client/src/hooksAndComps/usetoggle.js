// todo
import { useState } from "react";

// todo
export default function useToggle() {
	const [isOpen, setState] = useState(false);
	function toggle() {
		setState(!isOpen);
	}
	return [isOpen, toggle];
}
