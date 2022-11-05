// todo
import { useState } from "react";
import cookies from "browser-cookies";

// todo
export default function useMyCookie() {
	// ?
	const [cook, setCook] = useState({
		id: cookies.get("activeid"),
		name: cookies.get("activeu"),
		check: cookies.get("checkfild"),
	});

	// ?
	function updateCook() {
		setCook({
			id: cookies.get("activeid"),
			name: cookies.get("activeu"),
			check: cookies.get("checkfild"),
		});
	}

	// ?
	return [cook, updateCook];
}
