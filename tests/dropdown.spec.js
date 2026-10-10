import { test, expect } from "@playwright/test";

test.describe("Halaman Dropdown", () => {
  test("TC-DD-001: dropdown kondisi awal kosong", async ({ page }) => {
    await page.goto("/dropdown");

    await expect(page.locator("#dropdown")).toHaveValue("");
  });

  test("TC-DD-002: pilih Option 1", async ({ page }) => {
    await page.goto("/dropdown");

    await page.locator("#dropdown").selectOption("1");

    await expect(page.locator("#dropdown")).toHaveValue("1");
  });

  test("TC-DD-003: pilih Option 2", async ({ page }) => {
    await page.goto("/dropdown");

    await page.locator("#dropdown").selectOption("2");

    await expect(page.locator("#dropdown")).toHaveValue("2");
  });
});
