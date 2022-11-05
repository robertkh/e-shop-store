// todo
import { useState } from "react";
import cookies from "browser-cookies";

// todo
export default function useMyCookie() {
	// ?
	if (!cookies.get("activeu")) {
		cookies.set("activeid", "");
		cookies.set("activeu", "guest");
	}

	// ?
	const [cook, setCook] = useState({
		id: cookies.get("activeid") || "",
		name: cookies.get("activeu") || "guest",
		check: cookies.get("checkfild") || false,
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
