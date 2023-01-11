import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
  "electron",
  {
    save: (count: number) => ipcRenderer.invoke("save", count)
  }
)

declare global {
  interface Window {
    electron: {
      save (count: number): Promise<void>
    }
  }
}
