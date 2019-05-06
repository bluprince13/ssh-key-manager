import { ipcRenderer } from "electron";
import { GET_KEYS, ADD_KEY, REMOVE_KEY, REMOVE_ALL_KEYS } from "./types";

export const getKeys = () => dispatch => {
	ipcRenderer.send("get:keys");

	ipcRenderer.on("received:keys", (event, keys) => {
		dispatch({ type: GET_KEYS, payload: { keys } });
	});
};

export const addKey = key => dispatch => {
	ipcRenderer.on("key:added", (event, { video, outputPath }) => {
		dispatch({ type: ADD_KEY, payload: { ...key } });
	});
};

export const removeKey = key => {
	ipcRenderer.send("remove:key", key);

	return {
		type: REMOVE_KEY,
		payload: { key }
	};
};

export const removeAllKeys = () => {
	return {
		type: REMOVE_ALL_KEYS
	};
};
