import { expect, test } from "../fixtures/pages.js";
import { messages } from "../support/test-data.js";

test.describe("Halaman JavaScript Alerts", () => {
  test("TC-AL-001: JS Alert — accept, muncul pesan sukses", async ({
    pages,
    page,
  }) => {
    await pages.alerts.goto();

    page.once("dialog", (dialog) => dialog.accept());

    await pages.alerts.alertButton.click();

    await expect(pages.alerts.result).toHaveText(messages.alertAccepted);
  });

  test("TC-AL-002: JS Confirm — accept, muncul pesan OK", async ({
    pages,
    page,
  }) => {
    await pages.alerts.goto();

    page.once("dialog", (dialog) => dialog.accept());

    await pages.alerts.confirmButton.click();

    await expect(pages.alerts.result).toHaveText(messages.confirmAccepted);
  });

  test("TC-AL-003: JS Confirm — dismiss, muncul pesan Cancel", async ({
    pages,
    page,
  }) => {
    await pages.alerts.goto();

    page.once("dialog", (dialog) => dialog.dismiss());

    await pages.alerts.confirmButton.click();

    await expect(pages.alerts.result).toHaveText(messages.confirmDismissed);
  });

  test("TC-AL-004: JS Prompt — accept dengan teks, teks muncul di hasil", async ({
    pages,
    page,
  }) => {
    await pages.alerts.goto();

    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      await dialog.accept(messages.promptText);
    });

    await pages.alerts.promptButton.click();

    await expect(pages.alerts.result).toHaveText(messages.promptAccepted);
  });

  test("TC-AL-005: JS Prompt — dismiss, hasil berisi null", async ({
    pages,
    page,
  }) => {
    await pages.alerts.goto();

    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      await dialog.dismiss();
    });

    await pages.alerts.promptButton.click();

    await expect(pages.alerts.result).toHaveText(messages.promptDismissed);
  });
});
