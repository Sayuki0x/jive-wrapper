import { BrowserWindow, Tray, Menu } from 'electron';
import path from 'path';
import contextMenu from 'electron-context-menu';
import { quit } from '../main';

let tray = null;
let isQuitting = false;

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
  tray = new Tray(path.join(__dirname, '../resources/icons/128x128.png'));
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Quit', click: function () {
        isQuitting = true;
        quit();
      }
    }
  ]));

  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('close', function (event) {
    if(!isQuitting){
        event.preventDefault();
        mainWindow.hide();
    }

    return false;
});

  // load the app
  mainWindow.loadURL('https://my.jive.com');
}
