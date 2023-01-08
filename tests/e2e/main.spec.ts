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

test("show one number and two buttons increment and decrement", async () => {
  const window = await electronApp.firstWindow();
  const displayCount = window.locator("#container > span");
  const incButton = window.getByText("increment");
  const decButton = window.getByText("Decrement");

  await expect(displayCount).toBeVisible();
  await expect(incButton).toBeVisible();
  await expect(decButton).toBeVisible();
});
