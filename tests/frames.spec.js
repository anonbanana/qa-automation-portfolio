import { test, expect } from "@playwright/test";

test.describe("Halaman iFrame", () => {
  test("TC-IFR-001: halaman menampilkan heading editor", async ({ page }) => {
    await page.goto("/iframe");

    await expect(page.locator("h3")).toHaveText(
      "An iFrame containing the TinyMCE WYSIWYG Editor"
    );
  });

  test("TC-IFR-002: editor di dalam iframe menampilkan konten default", async ({
    page,
  }) => {
    await page.goto("/iframe");

    await expect(
      page.frameLocator("iframe").locator("body")
    ).toContainText("Your content goes here.");
  });
});
