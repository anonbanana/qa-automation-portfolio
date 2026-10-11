import { test, expect } from "@playwright/test";

test.describe("Halaman Download", () => {
  test("TC-DL-001: klik link unduhan mengunduh file dengan nama benar", async ({
    page,
  }) => {
    await page.goto("/download");

    // halaman ini menampilkan daftar file dinamis, jadi ambil link pertama
    const firstLink = page.locator('a[href^="download/"]').first();
    const expectedName = await firstLink.getAttribute("href");

    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 45_000 }),
      firstLink.click(),
    ]);

    expect(download.suggestedFilename()).toBe(expectedName.split("/")[1]);
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
