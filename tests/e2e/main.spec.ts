import path from "path";
import { _electron as electron } from "playwright";
import { ElectronApplication, test, expect } from "@playwright/test";

function launchApp (): Promise<ElectronApplication> {
  return electron.launch({
    args: [path.join(__dirname, "..", "..", "dist", "main.js")]
  })
}

let electronApp: ElectronApplication

test.beforeEach(async () => {
  electronApp = await launchApp();
});

test.afterEach(async () => {
  await electronApp.close();
});

test("contains page that contains hello world", async () => {
  const window = await electronApp.firstWindow();
  await expect(window.getByText("Hello World.")).toBeVisible()
});
