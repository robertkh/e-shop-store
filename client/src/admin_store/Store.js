// todo
import StoreTable from "./StoreTable";
import { StoreContextProvider } from "./StoreContext";

// todo
export default function Store(params) {
	return (
		<StoreContextProvider>
			<StoreTable />
		</StoreContextProvider>
	);
}
