// todo
import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { useLng } from "../context/LngContext";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdAddShoppingCart } from "react-icons/md";
import MyOrders from "../my_orders/MyOrders";
import { FaRegHandPointDown, FaFileInvoiceDollar } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { RiDashboardLine } from "react-icons/ri";
import Shop from "../shop/Shop";
import "./Home.css";
import { FetchProvider } from "../context/FetchContext";
import { useCookieContext } from "../context/CookieContext";
import { useCartContext } from "../context/CartContext";
import MessForm from "../message/MessForm";
import MainBoard from "../dashboard/Mainboard";
import Cart from "../cart/Cart";
import Note from "../notification/Note";
import UserButton from "../new-user/UserButton";

// todo
export default function Home(props) {
	// ?
	const [activeTab, setActiveTab] = useState("6");
	const [order /*  updateCart */] = useCartContext();
	const [cook /*  updateCook */] = useCookieContext();

	const strings = useLng();
	strings.setLanguage("AM");

	// ?
	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	// ?
	return (
		<div className="App w-75 mx-auto ">
			<UserButton tabSet={setActiveTab} />
			<div className="text-center pt-4 pb-3">
				<h4> {strings.title} </h4>
			</div>

			<div className="mt-2">
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classnames({
								active: activeTab === "1",
							})}
							onClick={() => {
								toggle("1");
							}}
						>
							<HiOutlineShoppingCart size={25} className="m-1" />{" "}
							{strings.tab1}
						</NavLink>
					</NavItem>
					<NavItem>
						{cook.id && cook.id !== cook.check && (
							<NavLink
								className={classnames({
									active: activeTab === "2",
								})}
								onClick={() => {
									toggle("2");
								}}
							>
								<MdAddShoppingCart size={25} className="m-1" />{" "}
								{strings.tab2}{" "}
								<span className="badge badge-danger">
									{" "}
									{order.cartContent
										? order.cartContent.length
										: 0}{" "}
								</span>
							</NavLink>
						)}
					</NavItem>
					<NavItem>
						{cook.id && cook.id !== cook.check && (
							<NavLink
								className={classnames({
									active: activeTab === "3",
								})}
								onClick={() => {
									toggle("3");
								}}
							>
								<FaFileInvoiceDollar
									size={25}
									className="m-1"
								/>
								{cook.id && " Իմ պատվերները"}
							</NavLink>
						)}
					</NavItem>
					<NavItem>
						{cook.id && !cook.check && (
							<NavLink
								className={classnames({
									active: activeTab === "4",
								})}
								onClick={() => {
									toggle("4");
								}}
							>
								<BiMessageDetail size={25} className="m-1" />{" "}
								{strings.tab4}
							</NavLink>
						)}
					</NavItem>
					<NavItem>
						{cook.id && cook.id === cook.check && (
							<NavLink
								className={classnames({
									active: activeTab === "5",
								})}
								onClick={() => {
									toggle("5");
								}}
							>
								<RiDashboardLine size={25} className="m-1" />{" "}
								{strings.tab5}
							</NavLink>
						)}
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({
								active: activeTab === "6",
							})}
							onClick={() => {
								toggle("6");
							}}
						>
							<FaRegHandPointDown size={25} className="m-1" />{" "}
							{strings.tab6}
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab}>
					<TabPane tabId="1">
						<FetchProvider>
							<Shop />
						</FetchProvider>
					</TabPane>
					<TabPane tabId="2">
						<Cart />
					</TabPane>
					<TabPane tabId="3">
						<MyOrders />
					</TabPane>
					<TabPane tabId="4">
						<MessForm />
					</TabPane>
					<TabPane tabId="5">
						<MainBoard />
					</TabPane>
					<TabPane tabId="6">
						<Note />
					</TabPane>
				</TabContent>
			</div>
		</div>
	);
}
