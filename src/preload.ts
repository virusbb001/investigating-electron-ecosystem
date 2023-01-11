import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
  "electron",
  {
    save: (count: number) => ipcRenderer.invoke("save", count),
    load: () => ipcRenderer.invoke("load")
  }
)

declare global {
  interface Window {
    electron: {
      save (count: number): Promise<void>
      load (): Promise<number>
    }
  }
}
