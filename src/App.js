import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import history from "./helpers/history";

import store from "./reducers";

import Browser from "./screens/Browser";
import AddForm from "./screens/AddForm";
import Header from "./components/Header";

import { ThemeProvider } from "styled-components";

const theme = {
	lightest: "#e0f7fa",
	light: "#b2ebf2",
	highlight: "red",
	dark: "#4dd0e1",
	darkest: "#0097a7",

	small: "0.75rem",
	medium: "1rem"
};

export default function App() {
	return (
		<Provider store={store}>
			<Router history={history}>
				<ThemeProvider theme={theme}>
					<div className="app">
						<Header />
						<Switch>
							<Route path="/add" component={AddForm} />
							<Route path="/" component={Browser} />
						</Switch>
					</div>
				</ThemeProvider>
			</Router>
		</Provider>
	);
}
