import path from "path";
import { _electron as electron } from "playwright";
import { ElectronApplication, test, expect, Page } from "@playwright/test";

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

function generateLocator (window: Page) {
  return {
    displayCount: window.locator("#container > span"),
    incButton: window.getByText("increment"),
    decButton: window.getByText("Decrement")
  }
}

test("show one number and two buttons increment and decrement", async () => {
  const window = await electronApp.firstWindow();
  const { displayCount, incButton, decButton } = generateLocator(window);

  await expect(displayCount).toBeVisible();
  await expect(incButton).toBeVisible();
  await expect(decButton).toBeVisible();
});

test("increment number when click inc button", async () => {
  const window = await electronApp.firstWindow();
  const { displayCount, incButton } = generateLocator(window);

  await expect(displayCount).toHaveText("0");
  await incButton.click()
  await expect(displayCount).toHaveText("1");
});

test("decrement number when click dec button", async () => {
  const window = await electronApp.firstWindow();
  const { displayCount, decButton } = generateLocator(window);

  await expect(displayCount).toHaveText("0");
  await decButton.click()
  await expect(displayCount).toHaveText("-1");
});
