import { test, expect } from "@playwright/test";

test.describe("Halaman Checkboxes", () => {
  test("TC-CB-001: checkbox kedua kondisi awal tercentang", async ({ page }) => {
    await page.goto("/checkboxes");

    const second = page.locator("#checkboxes input").nth(1);
    await expect(second).toBeChecked();
  });

  test("TC-CB-002: uncentang checkbox yang tercentang", async ({ page }) => {
    await page.goto("/checkboxes");

    const second = page.locator("#checkboxes input").nth(1);
    await second.uncheck();

    await expect(second).not.toBeChecked();
  });

  test("TC-CB-003: centang checkbox yang belum tercentang", async ({ page }) => {
    await page.goto("/checkboxes");

    const first = page.locator("#checkboxes input").first();
    await first.check();

    await expect(first).toBeChecked();
  });
});
