import { test, expect } from "@playwright/test";
import path from "path";
const UI_URL = "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("kero1@gmail.com");
  await page.locator("[name=password]").fill("123123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("login successfully")).toBeVisible();
});

test("should allow user to add hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator("[name=name]").fill("Test Hotel");

  await page.locator("[name=city]").fill("Cairo");
  await page.locator("[name=country]").fill("Egypt");
  await page
    .getByLabel("Description")
    .fill("This is a description for the Test Hotel");
  await page.getByText("Budget").click();
  await page.selectOption("select[name='startRating']", "3");
  await page.getByLabel("Free Wifi").click();
  await page.getByLabel("Parking").click();
  await page.locator("[name=pricePerNight]").fill("100");
  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("3");
  await page.setInputFiles("[name=images]", [
    path.join(__dirname, "images", "1.png"),
  ]);
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Created Hotel Successfully")).toBeVisible();
});

test("should get Hotels ", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await expect(page.getByText("kerlos hany")).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
  await expect(page.getByText("cairo, Egypt", { exact: true })).toBeVisible();
  await expect(page.getByText("Budget").nth(2)).toBeVisible();
  await expect(page.getByText("£120 per night")).toBeVisible();
  await expect(page.getByText("3 adults, 4 children")).toBeVisible();
  await expect(page.getByText("4 Star Rating")).toBeVisible();
});
