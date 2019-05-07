import { ipcRenderer } from "electron";
import { GET_KEYS, ADD_KEY, REMOVE_KEY, REMOVE_ALL_KEYS } from "./types";
import history from "../helpers/history";

export const getKeys = () => dispatch => {
	ipcRenderer.send("get:keys");

	ipcRenderer.on("received:keys", (event, keys) => {
		dispatch({ type: GET_KEYS, payload: { keys } });
	});
};

export const addKey = key => dispatch => {
	ipcRenderer.send("add:key", key);

	ipcRenderer.on("added:key", (event, key) => {
		history.push("/");
	});
};

export const removeKey = key => dispatch => {
	ipcRenderer.send("remove:key", key);

	ipcRenderer.on("removed:key", (event, key) => {
		dispatch({ type: REMOVE_KEY, payload: { key } });
	});
};

export const removeAllKeys = () => {
	return {
		type: REMOVE_ALL_KEYS
	};
};
