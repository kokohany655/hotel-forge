import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:3000/";
test("should allow to user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("kero1@gmail.com");
  await page.locator("[name=password]").fill("123123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("login successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("create account user ", async ({ page }) => {
  const testEmail = `test-email-${
    Math.floor(Math.random() + 90000) + 10000
  }@gmail.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await page
    .getByRole("link", { name: "Don't have an account ? register" })
    .click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("kerlos");
  await page.locator("[name=lastName]").fill("hany");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123123");
  await page.locator("[name=confirmPassword]").fill("123123");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Created account successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
