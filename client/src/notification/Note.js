// todo
import { FaInfoCircle } from "react-icons/fa";

// todo
export default function Note() {
	// ?
	return (
		<div className="w-75 mx-auto pt-5" style={{ fontSize: "16px" }}>
			<div className="alert alert-warning">
				<span>
					<FaInfoCircle />
				</span>
				<strong> Ծանուցում կայքի կողմից՝ </strong>
				<hr className="rrr_alert my-3" />
				<p>
					Կայքին ծանոթանալու համար կարիք կունենաք օգտվելու երկու
					ֆիկտիվ հաշիվներից՝
				</p>
				<p>- Ադմինիստրատորի</p>
				<ul>
					<li> email: adminuser@a.com</li>
					<li> password: aaaaaa</li>
				</ul>
				<p>- Սովորական օգտատիրոջ</p>
				<ul>
					<li> email: plainuser@a.com</li>
					<li> password: aaaaaa</li>
				</ul>
				<p>
					- PayPal փոխանցումների համակարգը թեսթավորելու համար այցելեք
				</p>
				<ul>
					<li> sandbox.paypal.com</li>
				</ul>
				<p>կայք և գրանցեք ուսուցողական հաշիվ։</p>
			</div>
		</div>
	);
}
