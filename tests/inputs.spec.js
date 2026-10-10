import { test, expect } from "@playwright/test";

test.describe("Halaman Inputs", () => {
  test("TC-IN-001: masukkan angka valid, nilai tersimpan", async ({ page }) => {
    await page.goto("/inputs");

    const field = page.locator("input[type=number]");
    await field.fill("42");

    await expect(field).toHaveValue("42");
  });

  test("TC-IN-002: field hanya menerima angka (input teks ditolak browser)", async ({ page }) => {
    await page.goto("/inputs");

    const field = page.locator("input[type=number]");
    await field.click();
    await field.pressSequentially("abc");

    await expect(field).toHaveValue("");
  });

  test("TC-IN-003: batas atas — angka besar tetap diterima", async ({ page }) => {
    await page.goto("/inputs");

    const field = page.locator("input[type=number]");
    await field.fill("9999");

    await expect(field).toHaveValue("9999");
  });
});
