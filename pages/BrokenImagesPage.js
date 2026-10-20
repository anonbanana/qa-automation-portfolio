export class BrokenImagesPage {
  constructor(page) {
    this.page = page;
    this.images = page.locator("img");
  }

  async goto() {
    await this.page.goto("/broken_images");
  }

  async brokenCount() {
    return this.images.evaluateAll(
      (images) => images.filter((image) => image.naturalWidth === 0).length
    );
  }
}
