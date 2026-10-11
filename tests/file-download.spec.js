import { test, expect } from "@playwright/test";

test.describe("Halaman Download", () => {
  test("TC-DL-001: klik link SomeFile.txt mengunduh file dengan nama benar", async ({
    page,
  }) => {
    await page.goto("/download");

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.click('a[href="download/SomeFile.txt"]'),
    ]);

    expect(download.suggestedFilename()).toBe("SomeFile.txt");
    expect(await download.failure()).toBeNull();
  });

  test("TC-DL-002: halaman menampilkan minimal 10 link file unduhan", async ({
    page,
  }) => {
    await page.goto("/download");

    const links = page.locator('a[href^="download/"]');

    expect(await links.count()).toBeGreaterThanOrEqual(10);
  });
});
