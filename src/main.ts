import fs from "fs/promises";
import path from "path";
import { app, ipcMain, BrowserWindow } from "electron";

const FILE_NAME = "count.txt"
const SAVE_PATH = path.join(app.getPath("userData"), FILE_NAME);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile(path.join(__dirname, "..", "index.html"))
}

app.whenReady().then(() => {
  ipcMain.handle("save", async (_e, count: number) => {
    await fs.writeFile(SAVE_PATH, count.toString());
    return
  })
  ipcMain.handle("load", async (_e) => {
    return Number(await fs.readFile(SAVE_PATH, "utf8"));
  })
  createWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});
