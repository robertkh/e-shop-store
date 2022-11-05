// todo
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import Store from "./admin_store/Store";
import ShowAllMessage from "./admin_mess/Message";
import AddForm from "./admin_store/AddForm";
import UpdateForm from "./admin_store/UpdateForm";
import UserList from "./admin_user/UserList";
import OrderList from "./admin_order/OrderList";
import Invoice from "./my_orders/Invoice";

import "./App.css";

// todo
export default function App() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>

			<Route exact path="/invoice/:id">
				<Invoice path={window.location.pathname} />
			</Route>

			<Route exact path="/admin/store">
				<Store />
			</Route>

			<Route exact path="/admin/store/add">
				<AddForm />
			</Route>

			<Route exact path="/admin/store/update">
				<UpdateForm />
			</Route>

			<Route exact path="/admin/messages">
				<ShowAllMessage />
			</Route>

			<Route exact path="/admin/users">
				<UserList />
			</Route>

			<Route exact path="/admin/orders">
				<OrderList />
			</Route>
		</Switch>
	);
}
