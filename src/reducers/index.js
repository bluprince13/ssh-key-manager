import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import keysReducer from "./keys_reducer";

const rootReducer = combineReducers({
	keys_reducer: keysReducer
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
