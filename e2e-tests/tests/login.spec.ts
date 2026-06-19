import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

test.describe("Login flow", () => {
  test("should log in with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await loginPage.login("standard_user", "secret_sauce");

    // Expect navigation to a protected page after successful login
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("should display error message with invalid credentials", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await loginPage.login("invalid_user", "invalid_password");

    await expect(loginPage.incorrectCredentialsErrorMessage).toBeVisible();
    const errorMessage = await loginPage.getIncorrectCredentialsErrorMessage();
    expect(errorMessage).toContain(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("should display error message with empty password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await loginPage.login("invalid_user", "");

    await expect(loginPage.emptyPasswordErrorMessage).toBeVisible();
    const errorMessage = await loginPage.getEmptyPasswordErrorMessage();
    expect(errorMessage).toContain("Epic sadface: Password is required");
  });

  test("should display error message with empty username", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await loginPage.login("", "invalid_password");

    await expect(loginPage.emptyUsernameErrorMessage).toBeVisible();
    const errorMessage = await loginPage.getEmptyUsernameErrorMessage();
    expect(errorMessage).toContain("Epic sadface: Username is required");
  });
});
