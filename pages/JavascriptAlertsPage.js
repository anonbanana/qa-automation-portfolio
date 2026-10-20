export class JavascriptAlertsPage {
  constructor(page) {
    this.page = page;
    this.alertButton = page.getByRole("button", { name: "Click for JS Alert" });
    this.confirmButton = page.getByRole("button", {
      name: "Click for JS Confirm",
    });
    this.promptButton = page.getByRole("button", {
      name: "Click for JS Prompt",
    });
    this.result = page.locator("#result");
  }

  async goto() {
    await this.page.goto("/javascript_alerts");
  }
}
