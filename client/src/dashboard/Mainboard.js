// todo
import StoreCart from "./StoreCart";
import MessCart from "./MessCart";
import UsersCard from "./UsersCard";
import OrdersCard from "./OrdersCard";

export default function MainBoard() {
	return (
		<div className="pt-5">
			<h4 className="text-center text-secondary">Կայքավարի վահանակ</h4>
			<div className="row mt-5 ">
				<StoreCart />
				<MessCart />
				<UsersCard />
				<OrdersCard />
			</div>
		</div>
	);
}
