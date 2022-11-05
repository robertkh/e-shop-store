import { useState } from "react";

export default function useAlerts() {
	// ?
	const [is, set] = useState({ succ: true, danger: true });

	// ?
	function showS(mess) {
		set({ ...is, succ: true });
	}

	// ?
	function hideS() {
		set({ ...is, succ: false });
	}

	// ?
	function showD(mess) {
		set({ ...is, danger: true });
	}

	// ?
	function hideD() {
		set({ ...is, danger: false });
	}

	return [is, showS, hideS, showD, hideD];
}
