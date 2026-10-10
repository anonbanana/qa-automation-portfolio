import { test, expect } from "@playwright/test";

test.describe("Halaman JavaScript Alerts", () => {
  test("TC-AL-001: JS Alert — accept, muncul pesan sukses", async ({ page }) => {
    await page.goto("/javascript_alerts");

    page.once("dialog", (dialog) => dialog.accept());

    await page.getByRole("button", { name: "Click for JS Alert" }).click();

    await expect(page.locator("#result")).toHaveText("You successfully clicked an alert");
  });

  test("TC-AL-002: JS Confirm — accept, muncul pesan OK", async ({ page }) => {
    await page.goto("/javascript_alerts");

    page.once("dialog", (dialog) => dialog.accept());

    await page.getByRole("button", { name: "Click for JS Confirm" }).click();

    await expect(page.locator("#result")).toHaveText("You clicked: Ok");
  });

  test("TC-AL-003: JS Confirm — dismiss, muncul pesan Cancel", async ({ page }) => {
    await page.goto("/javascript_alerts");

    page.once("dialog", (dialog) => dialog.dismiss());

    await page.getByRole("button", { name: "Click for JS Confirm" }).click();

    await expect(page.locator("#result")).toHaveText("You clicked: Cancel");
  });
});
