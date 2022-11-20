// Native
import { join } from 'path';
import util from "util";
import childProcess from "child_process";
import fs from "fs";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from 'electron';
import isDev from 'electron-is-dev';

const height = 500;
const width = 1000;
const exec = util.promisify(childProcess.exec);

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    frame: false,
    resizable: false,
    autoHideMenuBar: true,
    fullscreenable: false,
    transparent: true,
    icon: join(__dirname, "icon.png"),
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }

  ipcMain.on('close', () => {
    window.close();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('message', (event: IpcMainEvent, message: string) => {
  console.log(message);
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});

ipcMain.on("getLang", (event: IpcMainEvent) => {
  //event.sender.send("lang", app.getLocale())
  event.sender.send("lang", "ja")
})

ipcMain.on("setSettings", async (_event: IpcMainEvent, key: string, value: string) => {
  switch (key) {
    case "wallpaper":
      await exec("plasma-apply-wallpaperimage /usr/share/backgrounds/vclinux-" + value + ".png")
      break;
    case "icon":
      await exec("/usr/lib/x86_64-linux-gnu/libexec/plasma-changeicons " + value)
      break;
  }
})

ipcMain.on("exit", async (_event: IpcMainEvent) => {
  let user = await exec("whoami")
  if (fs.existsSync(`/home/${user}/.xsession`)) {
    fs.unlinkSync(`/home/${user}/.xsession`)
  }
  app.quit();
})