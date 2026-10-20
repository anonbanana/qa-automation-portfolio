export class DownloadPage {
  constructor(page) {
    this.page = page;
    this.links = page.locator('a[href^="download/"]');
  }

  async goto() {
    await this.page.goto("/download");
  }

  async count() {
    return this.links.count();
  }

  async firstHref() {
    return this.links.first().getAttribute("href");
  }

  async downloadFirst() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download", { timeout: 45_000 }),
      this.links.first().click(),
    ]);
    return download;
  }
}
