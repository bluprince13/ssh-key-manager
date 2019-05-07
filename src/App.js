import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import history from "./helpers/history";

import store from "./reducers";

import Browser from "./screens/Browser";
import AddForm from "./screens/AddForm";
import Header from "./components/Header";

export default function App() {
	return (
		<Provider store={store}>
			<Router history={history}>
				<div className="app">
					<Header />
					<Switch>
						<Route path="/add" component={AddForm} />
						<Route path="/" component={Browser} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}
