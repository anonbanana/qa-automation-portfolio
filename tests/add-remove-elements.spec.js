import { test, expect } from "@playwright/test";

test.describe("Halaman Add/Remove Elements", () => {
  test("TC-AR-001: klik Add Element menambah 1 tombol Delete", async ({ page }) => {
    await page.goto("/add_remove_elements/");

    const addBtn = page.getByRole("button", { name: "Add Element" });
    const deleteBtns = page.getByRole("button", { name: "Delete" });

    await expect(deleteBtns).toHaveCount(0);
    await addBtn.click();
    await expect(deleteBtns).toHaveCount(1);
  });

  test("TC-AR-002: klik Add Element 3 kali menambah 3 tombol Delete", async ({ page }) => {
    await page.goto("/add_remove_elements/");

    const addBtn = page.getByRole("button", { name: "Add Element" });
    const deleteBtns = page.getByRole("button", { name: "Delete" });

    await addBtn.click();
    await addBtn.click();
    await addBtn.click();

    await expect(deleteBtns).toHaveCount(3);
  });

  test("TC-AR-003: klik Delete mengurangi 1 elemen", async ({ page }) => {
    await page.goto("/add_remove_elements/");

    const addBtn = page.getByRole("button", { name: "Add Element" });
    const deleteBtns = page.getByRole("button", { name: "Delete" });

    await addBtn.click();
    await addBtn.click();

    await deleteBtns.first().click();

    await expect(deleteBtns).toHaveCount(1);
  });
});
