// todo
import { useEffect } from "react";
import { useStoreContext } from "./StoreContext";
import { useLng } from "../context/LngContext";
import {
	BsCaretRight,
	BsCaretLeft,
	BsChevronBarRight,
	BsChevronBarLeft,
} from "react-icons/bs";
import MyToolTip from "../hooksAndComps/MyToolTip";
import { Badge } from "reactstrap";

// todo
export default function MyPagin() {
	// ?
	const [storeState, disp] = useStoreContext();
	const strings = useLng();

	// ?
	useEffect(() => {
		disp({ type: "wait" });
		async function getData() {
			const response = await fetch("/admin/store", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					pageNum: storeState.pageNum,
					pageLim: +storeState.pageLim,
				}),
			});

			const result = await response.json();

			disp({ type: "pFetch", pf: result });
			disp({ type: "hide" });
		}

		getData();
	}, [storeState.pageNum, storeState.pageLim, storeState.delFactor, disp]);

	// ?
	return (
		<div className="row p-3">
			<div className="col-6">
				<span className="mr-3">
					{strings.tab7_1}{" "}
					<input
						type="number"
						value={storeState.pageNum}
						min={1}
						max={storeState.fetch.totalPages}
						onChange={(e) =>
							disp({ type: "pNum", val: e.target.value })
						}
						style={{ width: "50px" }}
						className="border-top-0 border-left-0 border-bottom-0 pr-2"
					/>
				</span>
				{strings.tab7_2}{" "}
				<select
					value={storeState.pageLim}
					onChange={(e) => {
						disp({ type: "pLim", val: e.target.value });
						disp({ type: "pOne" });
					}}
					className="border-0 "
				>
					{[2, 4, 6, "All"].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							{pageSize}
						</option>
					))}
				</select>
			</div>

			<div className="col-6 ">
				<div className="float-right">
					<button
						onClick={() => disp({ type: "pOne" })}
						disabled={!storeState.fetch.hasPrevPage}
						className="btn btn-outline-dark p-2 mr-1"
						data-tip={strings.tab1_0}
						data-for="firstPageStore"
					>
						<BsChevronBarLeft />
					</button>
					<MyToolTip id="firstPageStore" place="left" type="dark" />
					<button
						onClick={() => disp({ type: "pMin" })}
						disabled={!storeState.fetch.hasPrevPage}
						className="btn btn-outline-dark p-2 mr-1"
						data-tip={strings.tab1_2}
						data-for="prevPageStore"
					>
						<BsCaretLeft />
					</button>
					<MyToolTip id="prevPageStore" place="bottom" type="dark" />
					<button
						onClick={() => disp({ type: "pPlus" })}
						disabled={!storeState.fetch.hasNextPage}
						className="btn btn-outline-dark p-2 mr-1"
						data-tip={strings.tab1_3}
						data-for="nextPageStore"
					>
						<BsCaretRight />
					</button>
					<MyToolTip id="nextPageStore" place="bottom" type="dark" />
					<button
						onClick={() => disp({ type: "total" })}
						disabled={!storeState.fetch.hasNextPage}
						className="btn btn-outline-dark p-2 "
						data-tip={strings.tab1_4}
						data-for="lastPageStore"
					>
						<BsChevronBarRight />
					</button>
					<MyToolTip id="lastPageStore" place="bottom" type="dark" />
					<span className="mx-3">
						{strings.tab7_3}
						<Badge color="secondary" className="m-1">
							{storeState.fetch.page}
						</Badge>
					</span>
					<span>
						{strings.tab7_4}
						<Badge color="secondary" className="m-1">
							{storeState.fetch.totalPages}
						</Badge>
					</span>
				</div>
			</div>
		</div>
	);
}
