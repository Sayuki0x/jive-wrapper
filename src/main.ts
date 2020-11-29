// Modules to control application life and create native browser window
import { app, BrowserWindow, systemPreferences } from 'electron';
import { createWindow } from './utils/createWindow';
import log from 'electron-log';
import os from "os";

log.info('Launching client...');
const applicationLock = app.requestSingleInstanceLock();

if (!applicationLock) {
  log.info("There's already an instance locked. Quitting.");
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (BrowserWindow.getAllWindows().length === 1) {
      const [window] = BrowserWindow.getAllWindows();
      window.restore();
      window.focus();
    }
  });
}

app.allowRendererProcessReuse = true;
app.whenReady().then(createWindow);

// app.on('ready', async() => {
//   const value = await systemPreferences.askForMediaAccess("microphone");
//   log.info(value);
// });

app.on('window-all-closed', function () {
  if (os.platform() !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else {
    const [window] = BrowserWindow.getAllWindows();
    window.restore();
    window.show();
    window.focus(); 
  }
});

export function quit() {
  app.quit();
}
