import {
	GET_KEYS,
	REMOVE_KEY,
} from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_KEYS:
			const { keys } = action.payload;
			return keys;
		case REMOVE_KEY:
			const { key: keyToRemove } = action.payload;
			const new_keys = state.filter(key => {
				return (
					key.privateKeyFilename !== keyToRemove.privateKeyFilename
				);
			});
			return new_keys;
		default:
			return state;
	}
};
