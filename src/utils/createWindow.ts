import { BrowserWindow, Tray, Menu, protocol, app } from 'electron';
import path from 'path';
import contextMenu from 'electron-context-menu';
import { quit } from '../main';
import log from 'electron-log';
import os from "os";

let tray = null;
let isQuitting = false;

const options = {
  showTray: os.platform() !== "darwin",
  closeToTray: true,
};

function createMenu(): void {
  Menu.setApplicationMenu(null);
}

app.on('before-quit', function() {
  if (process.platform === 'darwin') {
    isQuitting = true;
  }
});

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

  protocol.registerHttpProtocol('tel', (req, cb) => {
    log.info(req);
    log.info(req.url);
  })

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
  });

  // load the app
  mainWindow.loadURL('https://my.jive.com');
}
