import fs from "fs";
import path from "path";
import { _electron as electron } from "playwright";
import { ElectronApplication, test, expect, Page } from "@playwright/test";

function launchApp (): Promise<ElectronApplication> {
  return electron.launch({
    args: [path.join(__dirname, "..", "..", "dist", "main.js")]
  })
}

let electronApp: ElectronApplication

const FILE_NAME = "count.txt";

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
    decButton: window.getByText("Decrement"),
    saveButton: window.getByText("Save"),
    loadButton: window.getByText("Load"),
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

test("save count to file", async () => {
  const window = await electronApp.firstWindow();
  const userPath = await electronApp.evaluate(({ app }) => app.getPath("userData"));
  const savePath = path.join(userPath, FILE_NAME);

  const { displayCount, incButton, saveButton } = generateLocator(window);
  await expect(displayCount).toHaveText("0");
  for(let i = 0; i<3; i++) {
    await incButton.click();
  }
  await expect(displayCount).toHaveText("3");
  await fs.promises.rm(savePath, {
    force: true
  });
  await saveButton.click();
  const content = await fs.promises.readFile(savePath, { encoding: "utf8" });
  expect(content.trim()).toEqual("3");
});
