export class AddRemoveElementsPage {
  constructor(page) {
    this.page = page;
    this.addButton = page.getByRole("button", { name: "Add Element" });
    this.deleteButtons = page.getByRole("button", { name: "Delete" });
  }

  async goto() {
    await this.page.goto("/add_remove_elements/");
  }

  async add(count = 1) {
    for (let i = 0; i < count; i += 1) {
      await this.addButton.click();
    }
  }

  async deleteFirst() {
    await this.deleteButtons.first().click();
  }
}
