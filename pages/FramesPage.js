export class FramesPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h3");
    this.editorBody = page.frameLocator("iframe").locator("body");
  }

  async goto() {
    await this.page.goto("/iframe");
  }
}
