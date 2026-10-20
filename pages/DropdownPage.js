export class DropdownPage {
  constructor(page) {
    this.page = page;
    this.dropdown = page.locator("#dropdown");
    this.options = this.dropdown.locator("option");
  }

  async goto() {
    await this.page.goto("/dropdown");
  }

  async select(value) {
    await this.dropdown.selectOption(value);
  }
}
