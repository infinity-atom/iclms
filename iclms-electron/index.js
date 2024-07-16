const { app, BrowserWindow, shell, ipcMain } = require("electron");
const express = require("express");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            devTools: true, // switch in prod
            webSecurity: false
        },
        icon: "./icon.ico"
    });

    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: "deny" };
    });

    const server = express();
    server.use(express.static("serve"));

    server.get("*", (req, res) => {
        res.send("<meta http-equiv='refresh' content='0;url=http://localhost:3752'>");
    });

    server.listen(3752);

    win.loadURL("http://localhost:3752");
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});