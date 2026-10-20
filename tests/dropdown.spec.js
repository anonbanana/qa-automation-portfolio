import { expect, test } from "../fixtures/pages.js";
import { expected } from "../support/test-data.js";

test.describe("Halaman Dropdown", () => {
  test("TC-DD-001: dropdown kondisi awal kosong", async ({ pages }) => {
    await pages.dropdown.goto();

    await expect(pages.dropdown.dropdown).toHaveValue("");
  });

  test("TC-DD-002: pilih Option 1", async ({ pages }) => {
    await pages.dropdown.goto();

    await pages.dropdown.select("1");

    await expect(pages.dropdown.dropdown).toHaveValue("1");
  });

  test("TC-DD-003: pilih Option 2", async ({ pages }) => {
    await pages.dropdown.goto();

    await pages.dropdown.select("2");

    await expect(pages.dropdown.dropdown).toHaveValue("2");
  });

  test("TC-DD-004: dropdown berisi tiga opsi yang benar", async ({ pages }) => {
    await pages.dropdown.goto();

    await expect(pages.dropdown.options).toHaveCount(
      expected.dropdownOptions.length
    );

    const options = await pages.dropdown.options.evaluateAll((items) =>
      items.map((item) => ({
        label: item.textContent.trim(),
        value: item.value,
      }))
    );

    expect(options).toEqual(expected.dropdownOptions);
  });
});
