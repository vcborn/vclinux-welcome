import { ipcRenderer, contextBridge } from 'electron';

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

const api = {
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },
  setSettings: (key: string, value: string) => {
    ipcRenderer.send("setSettings", key, value)
  },
  getLang: () => {
    ipcRenderer.send("getLang")
  },
  exit: () => {
    ipcRenderer.send("exit")
  },
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  }
};
contextBridge.exposeInMainWorld('Main', api);

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
