import { expect, test } from "../fixtures/pages.js";

test.describe("Halaman Inputs", () => {
  test("TC-IN-001: masukkan angka valid, nilai tersimpan", async ({
    pages,
  }) => {
    await pages.inputs.goto();

    await pages.inputs.fill("42");

    await expect(pages.inputs.numberInput).toHaveValue("42");
  });

  test("TC-IN-002: field hanya menerima angka (input teks ditolak browser)", async ({
    pages,
  }) => {
    await pages.inputs.goto();

    await pages.inputs.type("abc");

    await expect(pages.inputs.numberInput).toHaveValue("");
  });

  test("TC-IN-003: angka besar 9999 tetap diterima", async ({ pages }) => {
    await pages.inputs.goto();

    await pages.inputs.fill("9999");

    await expect(pages.inputs.numberInput).toHaveValue("9999");
  });

  test("TC-IN-004: angka nol diterima", async ({ pages }) => {
    await pages.inputs.goto();

    await pages.inputs.fill("0");

    await expect(pages.inputs.numberInput).toHaveValue("0");
  });

  test("TC-IN-005: angka negatif diterima", async ({ pages }) => {
    await pages.inputs.goto();

    await pages.inputs.fill("-1");

    await expect(pages.inputs.numberInput).toHaveValue("-1");
  });

  test("TC-IN-006: angka desimal diterima", async ({ pages }) => {
    await pages.inputs.goto();

    await pages.inputs.fill("1.5");

    await expect(pages.inputs.numberInput).toHaveValue("1.5");
  });
});
