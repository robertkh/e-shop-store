// todo
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LngProvider } from "./context/LngContext";
import { CookieContextProvider } from "./context/CookieContext";
import { UpdateComponentContextProvider } from "./context/UpdateComponentContext";
import { CartContextProvider } from "./context/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { RowContextProvider } from "./admin_store/RowContext";
import "bootstrap/dist/css/bootstrap.css";

// todo
ReactDOM.render(
	<UpdateComponentContextProvider>
		<LngProvider>
			<CartContextProvider>
				<CookieContextProvider>
					<RowContextProvider>
						<Router>
							<App />
						</Router>
					</RowContextProvider>
				</CookieContextProvider>
			</CartContextProvider>
		</LngProvider>
	</UpdateComponentContextProvider>,
	document.getElementById("root")
);
