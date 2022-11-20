"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const api = {
    sendMessage: (message) => {
        electron_1.ipcRenderer.send('message', message);
    },
    setSettings: (key, value) => {
        electron_1.ipcRenderer.send("setSettings", key, value);
    },
    getLang: () => {
        electron_1.ipcRenderer.send("getLang");
    },
    exit: () => {
        electron_1.ipcRenderer.send("exit");
    },
    on: (channel, callback) => {
        electron_1.ipcRenderer.on(channel, (_, data) => callback(data));
    }
};
electron_1.contextBridge.exposeInMainWorld('Main', api);
electron_1.contextBridge.exposeInMainWorld('ipcRenderer', electron_1.ipcRenderer);
