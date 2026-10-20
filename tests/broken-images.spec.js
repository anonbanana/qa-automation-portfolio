import { expect, test } from "../fixtures/pages.js";

test.describe("Halaman Broken Images", () => {
  test("TC-BI-001: halaman menampilkan 4 gambar", async ({ pages }) => {
    await pages.brokenImages.goto();

    await expect(pages.brokenImages.images).toHaveCount(4);
  });

  test("TC-BI-002: terdeteksi 2 gambar rusak (sesuai data halaman)", async ({
    pages,
  }) => {
    await pages.brokenImages.goto();

    await expect.poll(() => pages.brokenImages.brokenCount()).toBe(2);
  });
});
