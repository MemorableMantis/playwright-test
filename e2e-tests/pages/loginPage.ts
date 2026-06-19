import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly incorrectCredentialsErrorMessage: Locator;
  readonly emptyUsernameErrorMessage: Locator;
  readonly emptyPasswordErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.incorrectCredentialsErrorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
    this.emptyUsernameErrorMessage = page.getByText('Epic sadface: Username is required');
    this.emptyPasswordErrorMessage = page.getByText('Epic sadface: Password is required');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getIncorrectCredentialsErrorMessage() {
    return await this.incorrectCredentialsErrorMessage.textContent();
  }

  async getEmptyUsernameErrorMessage() {
    return await this.emptyUsernameErrorMessage.textContent();
  }

  async getEmptyPasswordErrorMessage() {
    return await this.emptyPasswordErrorMessage.textContent();
  }
}
