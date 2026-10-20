import { expect, test } from "../fixtures/pages.js";
import { messages, users } from "../support/test-data.js";

test.describe("Halaman Login", () => {
  test("TC-LOGIN-001: login dengan kredensial valid berhasil", async ({
    pages,
    page,
  }) => {
    await pages.login.goto();
    await pages.login.login(users.valid.username, users.valid.password);

    await expect(pages.login.flash).toContainText(messages.loginSuccess);
    await expect(page).toHaveURL(/\/secure/);
  });

  test("TC-LOGIN-002: login dengan password salah ditolak", async ({
    pages,
    page,
  }) => {
    await pages.login.goto();
    await pages.login.login(users.valid.username, users.invalidPassword);

    await expect(pages.login.flash).toContainText(messages.invalidPassword);
    await expect(page).toHaveURL(/\/login/);
  });

  test("TC-LOGIN-003: login dengan username salah ditolak", async ({
    pages,
    page,
  }) => {
    await pages.login.goto();
    await pages.login.login(users.invalidUsername, users.valid.password);

    await expect(pages.login.flash).toContainText(messages.invalidUsername);
    await expect(page).toHaveURL(/\/login/);
  });

  test("TC-LOGIN-004: form login menampilkan label dan atribut yang benar", async ({
    pages,
  }) => {
    await pages.login.goto();

    await expect(pages.login.usernameLabel).toHaveText("Username");
    await expect(pages.login.passwordLabel).toHaveText("Password");
    await expect(pages.login.usernameInput).toHaveAttribute(
      "name",
      "username"
    );
    await expect(pages.login.passwordInput).toHaveAttribute("type", "password");
  });

  test("TC-LOGIN-005: username dan password kosong ditolak", async ({
    pages,
    page,
  }) => {
    await pages.login.goto();
    await pages.login.login("", "");

    await expect(pages.login.flash).toContainText(messages.invalidUsername);
    await expect(page).toHaveURL(/\/login/);
  });

  test("TC-LOGIN-006: password kosong dengan username valid ditolak", async ({
    pages,
    page,
  }) => {
    await pages.login.goto();
    await pages.login.login(users.valid.username, "");

    await expect(pages.login.flash).toContainText(messages.invalidPassword);
    await expect(page).toHaveURL(/\/login/);
  });

  test("TC-LOGIN-007: username dan password berisi spasi ditolak", async ({
    pages,
    page,
  }) => {
    await pages.login.goto();
    await pages.login.login(users.whitespace, users.whitespace);

    await expect(pages.login.flash).toContainText(messages.invalidUsername);
    await expect(page).toHaveURL(/\/login/);
  });

  test("TC-LOGIN-008: username bersifat case-sensitive", async ({
    pages,
    page,
  }) => {
    await pages.login.goto();
    await pages.login.login(users.uppercaseUsername, users.valid.password);

    await expect(pages.login.flash).toContainText(messages.invalidUsername);
    await expect(page).toHaveURL(/\/login/);
  });
});
