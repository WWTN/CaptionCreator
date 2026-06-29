const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function resolveIndex() {
  // In dev, the build/ directory sits next to electron/ in the repo root.
  // In a packaged app, electron-builder copies build/ alongside electron/.
  return path.join(__dirname, '..', 'build', 'index.html');
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#1f1f1f',
    title: 'Caption Creator',
    icon: path.join(__dirname, '..', 'app', 'images', 'icon-512x512.png'),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // Send navigations to new tabs/windows to the user's default browser
  // instead of opening another Electron window.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.loadFile(resolveIndex());

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// Quiet the Windows menu bar; keep a minimal app menu so DevTools/reload
// shortcuts still work for power users.
Menu.setApplicationMenu(
  Menu.buildFromTemplate([
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Window',
      submenu: [{ role: 'minimize' }, { role: 'close' }],
    },
  ]),
);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
