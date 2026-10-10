import { test, expect } from "@playwright/test";

const VALID_USER = "tomsmith";
const VALID_PASS = "SuperSecretPassword!";

test.describe("Halaman Login", () => {
  test("TC-LOGIN-001: login dengan kredensial valid berhasil", async ({ page }) => {
    await page.goto("/login");

    await page.locator("#username").fill(VALID_USER);
    await page.locator("#password").fill(VALID_PASS);
    await page.locator("button[type=submit]").click();

    await expect(page.locator("#flash")).toContainText("You logged into a secure area!");
    await expect(page).toHaveURL(/\/secure/);
  });

  test("TC-LOGIN-002: login dengan password salah ditolak", async ({ page }) => {
    await page.goto("/login");

    await page.locator("#username").fill(VALID_USER);
    await page.locator("#password").fill("password-salah");
    await page.locator("button[type=submit]").click();

    await expect(page.locator("#flash")).toContainText("Your password is invalid!");
    await expect(page).toHaveURL(/\/login/);
  });

  test("TC-LOGIN-003: login dengan username salah ditolak", async ({ page }) => {
    await page.goto("/login");

    await page.locator("#username").fill("username-salah");
    await page.locator("#password").fill(VALID_PASS);
    await page.locator("button[type=submit]").click();

    await expect(page.locator("#flash")).toContainText("Your username is invalid!");
    await expect(page).toHaveURL(/\/login/);
  });

  test("TC-LOGIN-004: form login menampilkan label yang benar", async ({ page }) => {
    await page.goto("/login");

    await expect(page.locator("label[for=username]")).toHaveText("Username");
    await expect(page.locator("label[for=password]")).toHaveText("Password");
    await expect(page.locator("#username")).toHaveAttribute("name", "username");
    await expect(page.locator("#password")).toHaveAttribute("type", "password");
  });
});
