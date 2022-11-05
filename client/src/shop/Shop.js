// todo
import { useState, useEffect } from "react";
import ShopItem from "./ShopItem";
import MyPagin from "./MyPagin";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import SearchBar from "./SearchBar";
import { numToCurr } from "../hooksAndComps/myUtilit";

// todo
export default function Shop() {
	// ?
	const [search, setSearch] = useState("");

	// ? - spinner
	const [loading, setLoading] = useState(true);

	// ?
	const [fetchData, setFetchData] = useState({});
	const { docs, ...restData } = fetchData;

	// ? - pagination
	const [limit, setLimit] = useState(+2);
	const [page, setPage] = useState(+1);

	// ? - spinner
	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
	`;

	// ?
	useEffect(() => {
		setLoading(true);

		async function getData() {
			const response = await fetch("/shop", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ pageNum: page, pageLim: +limit }),
			});

			let result = await response.json();

			setFetchData((pr) => result);
			setLoading(false);
		}

		getData();
	}, [page, limit]);

	// ?
	const shopList = search
		? docs.filter(
				(o) =>
					o.itemName.toLowerCase().includes(search.toLowerCase()) ||
					o.itemPrice.toLowerCase().includes(search.toLowerCase())
		  )
		: docs;

	// ?
	const shopItems = shopList
		? shopList.map((val) => (
				<ShopItem
					key={val.itemName}
					name={val.itemName}
					maxQty={val.itemQty}
					price={numToCurr(val.itemPrice)}
				/>
		  ))
		: undefined;

	// ? _.isEmpty(fetchRes)
	return (
		<div>
			<PuffLoader
				color="green"
				loading={loading}
				css={override}
				size={150}
			/>
			<SearchBar setState={setSearch} />

			{!loading && (
				<div className="row justify-content-center mt-4">
					{shopItems}
				</div>
			)}

			<div>
				<MyPagin
					page={page}
					setPage={setPage}
					pageSize={limit}
					setPageSize={setLimit}
					restinfo={restData}
				/>
			</div>
		</div>
	);
}
