const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        title: process.env.npm_package_name,
        height: 480,
        width: 720,
        maximizable: true,
        alwaysOnTop: false,
        fullscreenable: true,
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false,
            worldSafeExecuteJavaScript: true,
            //devTools: false,
        },
    });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, "/public/index.html"),
            protocol: "file:",
            slashes: true,
        }),
    );
}

if (isDev) {
    require("electron-reload")(__dirname, {
        Electron: path.join(process.cwd(), "node_modules", ".bin", "electron"),
    });
}

app.whenReady().then(createWindow);

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
