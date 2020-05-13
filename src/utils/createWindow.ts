import { BrowserWindow, Tray, Menu } from 'electron';
import path from 'path';
import contextMenu from 'electron-context-menu';
import { quit } from '../main';
import log from 'electron-log';

let tray = null;
let isQuitting = false;

const options = {
  showTray: true,
  closeToTray: true,
};

function createMenu(): void {
  Menu.setApplicationMenu(null);
}

export function createWindow(): void {
  // context menu configuration
  contextMenu({});

  // top menu configuration
  createMenu();

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



  if (options.showTray) {
    tray = new Tray(path.join(__dirname, '../resources/icons/128x128.png'));
    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: 'Show App',
          click: () => {
            mainWindow.show();
          },
        },
        {
          label: 'Quit',
          click: () => {
            isQuitting = true;
            quit();
          },
        },
      ])
    );
  }

  mainWindow.on('close', (event) => {
    if (!isQuitting && options.closeToTray) {
      event.preventDefault();
      mainWindow.hide();
    }

    return false;
  });

  // load the app
  mainWindow.loadURL('https://my.jive.com');
}
