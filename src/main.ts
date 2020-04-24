// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron';
import { createWindow } from './utils/createWindow';

app.allowRendererProcessReuse = true;

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
