// todo
export default function SearchBar({ setState }) {
	return (
		<div className="row ">
			<div className="col-12">
				<input
					type="text"
					placeholder="ֆիլտր ․․․"
					className="form-control form-control-sm w-25 mt-3 float-right border-left-0 border-right-0 border-top-0 border-info"
					onChange={(e) => {
						setState(e.target.value);
					}}
				/>
			</div>
		</div>
	);
}
