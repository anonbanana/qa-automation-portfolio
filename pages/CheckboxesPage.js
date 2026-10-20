export class CheckboxesPage {
  constructor(page) {
    this.page = page;
    this.checkboxes = page.locator("#checkboxes input[type=checkbox]");
  }

  async goto() {
    await this.page.goto("/checkboxes");
  }

  checkbox(index) {
    return this.checkboxes.nth(index);
  }
}
