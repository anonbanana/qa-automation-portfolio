import { expect, test } from "../fixtures/pages.js";

test.describe("Halaman Add/Remove Elements", () => {
  test("TC-AR-001: klik Add Element menambah 1 tombol Delete", async ({
    pages,
  }) => {
    await pages.addRemove.goto();

    await expect(pages.addRemove.deleteButtons).toHaveCount(0);

    await pages.addRemove.add();

    await expect(pages.addRemove.deleteButtons).toHaveCount(1);
  });

  test("TC-AR-002: klik Add Element 3 kali menambah 3 tombol Delete", async ({
    pages,
  }) => {
    await pages.addRemove.goto();

    await pages.addRemove.add(3);

    await expect(pages.addRemove.deleteButtons).toHaveCount(3);
  });

  test("TC-AR-003: klik Delete mengurangi 1 elemen", async ({ pages }) => {
    await pages.addRemove.goto();
    await pages.addRemove.add(2);

    await pages.addRemove.deleteFirst();

    await expect(pages.addRemove.deleteButtons).toHaveCount(1);
  });

  test("TC-AR-004: hapus satu-satunya elemen mengembalikan kondisi ke nol", async ({
    pages,
  }) => {
    await pages.addRemove.goto();
    await pages.addRemove.add();

    await pages.addRemove.deleteFirst();

    await expect(pages.addRemove.deleteButtons).toHaveCount(0);
  });
});
