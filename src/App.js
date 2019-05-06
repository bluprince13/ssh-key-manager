import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./reducers";

import Browser from "./screens/Browser";
import Header from "./components/Header";

export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="app">
					<Header />
					<Switch>
						<Route path="/" component={Browser} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}
