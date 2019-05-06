import _ from "lodash";
import {
	GET_KEYS,
	ADD_KEY,
	REMOVE_KEY,
	REMOVE_ALL_KEYS
} from "../actions/types";

const INITIAL_STATE = { keys: [] };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_KEYS:
			const { keys } = action.payload;
			console.log(keys);
			return { keys };
		case ADD_KEY:
			return { ...state, [action.payload.path]: action.payload };
		case REMOVE_KEY:
			return _.omit(state, action.payload.path);
		case REMOVE_ALL_KEYS:
			return INITIAL_STATE;
		default:
			return state;
	}
};
