import _ from "lodash";
import {
	GET_KEYS,
	ADD_KEY,
	REMOVE_KEY,
	REMOVE_ALL_KEYS
} from "../actions/types";
import { statement } from "@babel/template";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_KEYS:
			const { keys } = action.payload;
			return keys;
		case ADD_KEY:
			return { ...state, [action.payload.path]: action.payload };
		case REMOVE_KEY:
			const { key: keyToRemove } = action.payload;
			const new_keys = state.filter(key => {
				return (
					key.privateKeyFilename !== keyToRemove.privateKeyFilename
				);
			});
			return new_keys;
		case REMOVE_ALL_KEYS:
			return INITIAL_STATE;
		default:
			return state;
	}
};
