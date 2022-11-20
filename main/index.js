"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
const util_1 = __importDefault(require("util"));
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const exec = util_1.default.promisify(child_process_1.default.exec);
function createWindow() {
    const primaryDisplay = electron_1.screen.getPrimaryDisplay();
    const { width } = primaryDisplay.workAreaSize;
    const h = width > 800 ? 500 : 300;
    const w = width > 800 ? 1000 : 600;
    const window = new electron_1.BrowserWindow({
        width: w,
        height: h,
        frame: false,
        resizable: false,
        autoHideMenuBar: true,
        fullscreenable: false,
        transparent: true,
        icon: (0, path_1.join)(__dirname, "icon.png"),
        webPreferences: {
            preload: (0, path_1.join)(__dirname, 'preload.js')
        }
    });
    const port = process.env.PORT || 3000;
    const url = electron_is_dev_1.default ? `http://localhost:${port}` : (0, path_1.join)(__dirname, '../src/out/index.html');
    if (electron_is_dev_1.default) {
        window?.loadURL(url);
    }
    else {
        window?.loadFile(url);
    }
    electron_1.ipcMain.on('close', () => {
        window.close();
    });
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.ipcMain.on('message', (event, message) => {
    console.log(message);
    setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});
electron_1.ipcMain.on("getLang", (event) => {
    event.sender.send("lang", electron_1.app.getLocale());
});
electron_1.ipcMain.on("setSettings", async (_event, key, value) => {
    switch (key) {
        case "wallpaper":
            await exec("plasma-apply-wallpaperimage /usr/share/backgrounds/vclinux-" + value + ".png");
            break;
        case "icon":
            await exec("/usr/lib/x86_64-linux-gnu/libexec/plasma-changeicons " + value);
            break;
    }
});
electron_1.ipcMain.on("exit", async (_event) => {
    let user = await exec("whoami");
    if (fs_1.default.existsSync(`/home/${user}/.config/autostart/vclinux-welcome.desktop`)) {
        fs_1.default.unlinkSync(`/home/${user}/.config/autostart/vclinux-welcome.desktop`);
    }
    electron_1.app.quit();
});
