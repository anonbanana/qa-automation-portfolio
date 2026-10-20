import { stat } from "node:fs/promises";

import { expect, test } from "../fixtures/pages.js";

test.describe("Halaman Download", () => {
  test("TC-DL-001: klik link unduhan mengunduh file dengan nama dan isi benar", async ({
    pages,
  }) => {
    await pages.download.goto();

    const href = await pages.download.firstHref();
    expect(href).toBeTruthy();

    const download = await pages.download.downloadFirst();
    const expectedName = href.split("/")[1];

    expect(download.suggestedFilename()).toBe(expectedName);
    expect(await download.failure()).toBeNull();

    const filePath = await download.path();
    expect(filePath).not.toBeNull();

    const fileStat = await stat(filePath);
    expect(fileStat.size).toBeGreaterThan(0);
  });

  test("TC-DL-002: halaman menampilkan minimal 10 link file unduhan", async ({
    pages,
  }) => {
    await pages.download.goto();

    expect(await pages.download.count()).toBeGreaterThanOrEqual(10);
  });
});
