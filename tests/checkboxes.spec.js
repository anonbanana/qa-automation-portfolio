import { expect, test } from "../fixtures/pages.js";

test.describe("Halaman Checkboxes", () => {
  test("TC-CB-001: checkbox kedua kondisi awal tercentang", async ({
    pages,
  }) => {
    await pages.checkboxes.goto();

    await expect(pages.checkboxes.checkbox(1)).toBeChecked();
  });

  test("TC-CB-002: uncentang checkbox yang tercentang", async ({ pages }) => {
    await pages.checkboxes.goto();
    const second = pages.checkboxes.checkbox(1);

    await second.uncheck();

    await expect(second).not.toBeChecked();
  });

  test("TC-CB-003: centang checkbox yang belum tercentang", async ({
    pages,
  }) => {
    await pages.checkboxes.goto();
    const first = pages.checkboxes.checkbox(0);

    await first.check();

    await expect(first).toBeChecked();
  });
});
