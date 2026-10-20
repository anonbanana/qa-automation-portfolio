import { expect, test } from "../fixtures/pages.js";
import { expected } from "../support/test-data.js";

test.describe("Halaman iFrame", () => {
  test("TC-IFR-001: halaman menampilkan heading editor", async ({ pages }) => {
    await pages.frames.goto();

    await expect(pages.frames.heading).toHaveText(expected.iframeHeading);
  });

  test("TC-IFR-002: editor di dalam iframe menampilkan konten default", async ({
    pages,
  }) => {
    await pages.frames.goto();

    await expect(pages.frames.editorBody).toContainText(
      expected.iframeDefaultText
    );
  });
});
