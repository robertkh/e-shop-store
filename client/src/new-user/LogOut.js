// todo
import { Button } from "reactstrap";
import Avatar from "../hooksAndComps/MyAvatar";
import { useCookieContext } from "../context/CookieContext";
import { useLng } from "../context/LngContext";

// todo
const maindivStyle = {
	fontFamily: "sans-serif",
};

// todo
export default function LogOut({ disp, tabSet }) {
	// ?
	const [cook, updateCook] = useCookieContext();
	const strings = useLng();

	// ?
	async function onClickHandler() {
		try {
			let response = await fetch("/users/logout", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			let result = await response.json();

			if (response.ok) {
				disp({ type: "clearStates" });
				disp({ type: "showAlert", col: true, msg: result });
				disp({ type: "showLogin" });
				tabSet("1");
				updateCook();
			} else {
				disp({ type: "showAlert", col: false, msg: result });
			}
		} catch (err) {
			console.log(err.message);
		}
	}

	// ?
	return (
		<div style={maindivStyle}>
			<h5 className="text-center mb-4 ">Բարի գալուստ {cook.name}</h5>
			<Avatar />

			<Button color="success" block onClick={onClickHandler}>
				{strings.tab3_16}
			</Button>
		</div>
	);
}
