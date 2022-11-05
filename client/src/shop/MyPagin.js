// todo
import {
	BsCaretRight,
	BsCaretLeft,
	BsChevronBarRight,
	BsChevronBarLeft,
} from "react-icons/bs";
import { useLng } from "../context/LngContext";
import MyToolTip from "../hooksAndComps/MyToolTip";
import { Badge } from "reactstrap";

// todo
export default function MyPagin({
	page,
	setPage,
	pageSize,
	setPageSize,
	restinfo,
}) {
	// ?
	const { hasPrevPage, hasNextPage, totalPages } = restinfo;
	const strings = useLng();

	// ?
	return (
		<div
			className="row  border-warning p-3"
			style={{ borderTop: "4px solid" }}
		>
			<div className="col-6">
				<span className="mr-3">
					{strings.tab7_1}:{" "}
					<input
						type="number"
						value={page}
						min={1}
						max={totalPages}
						onChange={(e) => setPage(e.target.value)}
						style={{ width: "50px" }}
						className="border-top-0 border-left-0 border-bottom-0 pr-2"
					/>
				</span>
				{strings.tab7_2}:{" "}
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(e.target.value);
						setPage(+1);
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
						onClick={() => setPage(+1)}
						disabled={!hasPrevPage}
						className="btn btn-outline-dark p-2 mr-1"
						data-tip={strings.tab1_0}
						data-for="firstPage"
					>
						<BsChevronBarLeft />
					</button>
					<MyToolTip id="firstPage" place="left" type="dark" />

					<button
						onClick={() => setPage((pr) => +pr - 1)}
						disabled={!hasPrevPage}
						className="btn btn-outline-dark p-2 mr-1"
						data-tip={strings.tab1_2}
						data-for="prevPage"
					>
						<BsCaretLeft />
					</button>
					<MyToolTip id="prevPage" place="bottom" type="dark" />

					<button
						onClick={() => setPage((pr) => +pr + 1)}
						disabled={!hasNextPage}
						className="btn btn-outline-dark p-2 mr-1"
						data-tip={strings.tab1_3}
						data-for="nextPage"
					>
						<BsCaretRight />
					</button>
					<MyToolTip id="nextPage" place="bottom" type="dark" />

					<button
						onClick={() => setPage(+totalPages)}
						disabled={!hasNextPage}
						className="btn btn-outline-dark p-2 mr-1"
						data-tip={strings.tab1_4}
						data-for="lastPage"
					>
						<BsChevronBarRight />
					</button>
					<MyToolTip id="lastPage" place="bottom" type="dark" />

					<span className="px-2">
						{strings.tab7_3}
						<Badge color="secondary" className="m-1">
							{page}
						</Badge>
					</span>
					<span>
						{strings.tab7_4}
						<Badge color="secondary" className="m-1">
							{totalPages}
						</Badge>
					</span>
				</div>
			</div>
		</div>
	);
}
