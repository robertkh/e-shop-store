// todo
import _ from "lodash";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";
import { useCookieContext } from "../context/CookieContext";
import { currToNum, numToCurr } from "../hooksAndComps/myUtilit";
import { readName } from "../hooksAndComps/myUtilit";

// todo
export default function CartRow({ row }) {
	// ?
	const [qty, setQty] = useState(row.qty);
	const [order, orderDisp] = useCartContext();
	const [cook /*  updateCook */] = useCookieContext();

	// ?
	function onclickHandler() {
		orderDisp({ type: "del", name: row.name, id: cook.id });
	}

	// ?
	return (
		<tr>
			<td className="p-1 text-center">
				<img
					src={`images/${row.name}.jpg`}
					alt="rrr"
					width="70"
					onError={(e) => (e.target.src = "images/Phold.png")}
				></img>
			</td>
			<td className="align-middle">{readName(row.name)}</td>
			<td className="align-middle">
				<input
					type="number"
					min="1"
					max={row.maxQty}
					value={qty}
					onChange={(e) => {
						setQty(e.target.value);
						let i = _.findIndex(order.cartContent, [
							"name",
							row.name,
						]);
						order.cartContent[i].qty = e.target.value;
						orderDisp({ type: "qty", id: cook.id });
					}}
				/>
			</td>
			<td className="align-middle">{row.price}</td>
			<td className="align-middle">
				{numToCurr(qty * currToNum(row.price))}
			</td>
			<td className="align-middle text-center">
				<button className="btn btn-danger" onClick={onclickHandler}>
					<FaTrashAlt size={16} /> Trash
				</button>
			</td>
		</tr>
	);
}
