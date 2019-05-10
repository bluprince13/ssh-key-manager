import { ipcRenderer } from "electron";
import { GET_KEYS, REMOVE_KEY, COPY_KEY } from "./types";
import history from "../helpers/history";
import { copyToClipboard } from "../helpers";

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

export const copyKey = key => dispatch => {
	ipcRenderer.send("copy:key", key);

	ipcRenderer.on("copied:key", (event, { key, publicKey }) => {
		copyToClipboard(publicKey);
		dispatch({ type: COPY_KEY, payload: { key, publicKey } });
	});
};
