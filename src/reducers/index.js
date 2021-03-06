import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

import { composeWithDevTools } from "redux-devtools-extension";

import keysReducer from "./keys_reducer";

const rootReducer = combineReducers({
	keys: keysReducer,
	form: formReducer 
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
