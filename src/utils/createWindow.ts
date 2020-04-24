import { BrowserWindow, shell } from 'electron';
import path from 'path';
import contextMenu from 'electron-context-menu';

export function createWindow(): void {
  // context menu configuration
  contextMenu({});

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: path.join(__dirname, '../resources/icons/512x512.png'),
    webPreferences: {
      webviewTag: true,
      nodeIntegration: false,

      sandbox: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  // load the app
  mainWindow.loadURL('https://my.jive.com');
}
