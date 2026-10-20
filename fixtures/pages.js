import { test as base } from "@playwright/test";

import { AddRemoveElementsPage } from "../pages/AddRemoveElementsPage.js";
import { BrokenImagesPage } from "../pages/BrokenImagesPage.js";
import { CheckboxesPage } from "../pages/CheckboxesPage.js";
import { DownloadPage } from "../pages/DownloadPage.js";
import { DropdownPage } from "../pages/DropdownPage.js";
import { FramesPage } from "../pages/FramesPage.js";
import { InputsPage } from "../pages/InputsPage.js";
import { JavascriptAlertsPage } from "../pages/JavascriptAlertsPage.js";
import { LoginPage } from "../pages/LoginPage.js";

export const test = base.extend({
  pages: async ({ page }, use) => {
    await use({
      login: new LoginPage(page),
      checkboxes: new CheckboxesPage(page),
      dropdown: new DropdownPage(page),
      inputs: new InputsPage(page),
      addRemove: new AddRemoveElementsPage(page),
      alerts: new JavascriptAlertsPage(page),
      brokenImages: new BrokenImagesPage(page),
      download: new DownloadPage(page),
      frames: new FramesPage(page),
    });
  },
});

export { expect } from "@playwright/test";
