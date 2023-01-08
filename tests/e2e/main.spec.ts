import path from "path";
import { _electron as electron } from "playwright";
import { test } from "@playwright/test";

test("launch app", async () => {
  const electronApp = await electron.launch({
    args: [path.join(__dirname, "..", "..", "dist", "main.js")]
  })
  await electronApp.close();
});
