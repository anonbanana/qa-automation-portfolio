import { test, expect } from "@playwright/test";

test.describe("Halaman Broken Images", () => {
  test("TC-BI-001: halaman menampilkan 4 gambar", async ({ page }) => {
    await page.goto("/broken_images");

    await expect(page.locator("img")).toHaveCount(4);
  });

  test("TC-BI-002: terdeteksi 2 gambar rusak (sesuai data halaman)", async ({ page }) => {
    await page.goto("/broken_images");

    // halaman ini memang didesain punya 2 gambar rusak untuk latihan deteksi
    await expect
      .poll(async () =>
        page
          .locator("img")
          .evaluateAll((imgs) => imgs.filter((i) => i.naturalWidth === 0).length)
      )
      .toBe(2);
  });
});
