const electron = require("electron");
const os = require("os");

const { app, BrowserWindow, ipcMain } = electron;

const path = require("path");
const isDev = require("electron-is-dev");

const { exec } = require("child_process");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 680,
		webPreferences: {
			nodeIntegration: true
		}
	});
	mainWindow.loadURL(
		isDev
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../build/index.html")}`
	);
	if (isDev) {
		// Open the DevTools.
		BrowserWindow.addDevToolsExtension(
			path.join(
				os.homedir(),
				"/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0"
			)
		);
		BrowserWindow.addDevToolsExtension(
			path.join(
				os.homedir(),
				"/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0"
			)
		);
		mainWindow.webContents.openDevTools();
	}
	mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on("get:keys", event => {
	const homedir = process.env.HOME;
	const sshdir = homedir + "/.ssh";
	exec("ls -a " + sshdir, (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`);
			return;
		}

		const filenames = stdout.split(/\r?\n/).slice(2);
		filenames.pop();

		var keys = [];
		const filenamesLength = filenames.length;
		for (var i = 0; i < filenamesLength; i++) {
			const filename = filenames[i];
			if (filename.endsWith(".pub")) {
				const publicKeyFilename = filename;
				const privateKeyFilename = filename.split(".")[0];
				keys.push({
					privateKeyFilename,
					publicKeyFilename,
					privateKeyPath: sshdir + "/" + privateKeyFilename,
					publicKeyPath: sshdir + "/" + publicKeyFilename
				});
			}
		}

		mainWindow.webContents.send("received:keys", keys);
	});
});

ipcMain.on("remove:key", (event, key) => {
	const { privateKeyPath, publicKeyPath } = key;
	exec(
		"rm " + privateKeyPath + " " + publicKeyPath,
		(err, stdout, stderr) => {
			if (err) {
				console.error(`exec error: ${err}`);
				return;
			}

			mainWindow.webContents.send("removed:key", key);
		}
	);
});

ipcMain.on("add:key", (event, key) => {
	const homedir = process.env.HOME;
	const sshdir = homedir + "/.ssh";
	const { filename, passphrase, comment } = key;
	var command =
		"ssh-keygen -t rsa -b 4096 -f " +
		sshdir +
		"/" +
		filename +
		" -N " +
		(passphrase ? passphrase + '""' : '""') +
		(comment ? " -C " + '"' + comment + '"' : "");

	exec(command, (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`);
			return;
		}

		mainWindow.webContents.send("added:key", key);
	});
});

ipcMain.on("copy:key", (event, key) => {
	const { publicKeyPath } = key;
	exec(" pbcopy < " + publicKeyPath, (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`);
			return;
		}

		mainWindow.webContents.send("copied:key", { publicKey: stdout, key });
	});
});
