import { expect, test } from "@playwright/test";

test.describe("New Todo", () => {
  test("should allow me to add todo items", async ({ page }) => {
    page.goto("/");
    await page
      .getByRole("row", { name: "0 random random +" })
      .getByRole("link", { name: "+" })
      .click();
    await page
      .getByRole("row", { name: "1 random random +" })
      .getByRole("link", { name: "+" })
      .click();
    await page
      .getByRole("row", { name: "2 random random +" })
      .getByRole("link", { name: "+" })
      .click();
    await page
      .getByRole("row", { name: "3 random random +" })
      .getByRole("link", { name: "+" })
      .click();
    await page
      .getByRole("row", { name: "4 random random +" })
      .getByRole("link", { name: "+" })
      .click();
    await page
      .getByRole("row", { name: "5 random random +" })
      .getByRole("link", { name: "+" })
      .click();
    await page
      .getByRole("row", { name: "6 random random +" })
      .getByRole("link", { name: "+" })
      .click();
    await page
      .getByRole("row", { name: "7 random random +" })
      .getByRole("link", { name: "+" })
      .click();
    await page
      .getByRole("row", { name: "8 random random +" })
      .getByRole("link", { name: "+" })
      .click();

    expect(3).toBe(2);
  });
});
