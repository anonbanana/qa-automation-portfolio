export class InputsPage {
  constructor(page) {
    this.page = page;
    this.numberInput = page.locator("input[type=number]");
  }

  async goto() {
    await this.page.goto("/inputs");
  }

  async fill(value) {
    await this.numberInput.fill(value);
  }

  async type(text) {
    await this.numberInput.click();
    await this.numberInput.pressSequentially(text);
  }
}
