// @ts-check
import { expect, type Locator, type Page } from "@playwright/test";
import { PwAbstractPage } from "./PwAbstractPage";

export class LoginPage extends PwAbstractPage {
  readonly locators: Record<string, Locator>;

  readonly page: Page;
  readonly urlM: string;
  readonly urlP: string;
  
  constructor(page) {
    super(page);
    this.page = page;
    this.urlM = "https://staging.timelycare.com/auth/login";
    this.urlP = "https://staging.timelyprovider.com/auth/login";

    this.locators = {
      emailField : this.page.getByTestId('login-email--input'),
      continueBtn : this.page.getByTestId("login-continue--button"),
      passField : this.page.getByTestId('login-password--input'),
      continueBtnLast : this.page.getByTestId('login--button'),
  
      registerBtn : this.page.getByTestId("forgot-password--button"),
      newEmailField : this.page.getByTestId('login-verify-create-account-email--input'),
      birthField : this.page.getByTestId("login-verify-create-account-dob--input"),
      codeField : this.page.getByLabel('Access Code*'),
      lastContinueRegBtn: this.page.getByTestId('login-verify-code--button')
    }
  }

  async goto() {
    await this.page.goto(this.urlM);
  }

  async register(email: string, birth: string, code: string){
    await this.locators.registerBtn.click();
    await this.locators.newEmailField.pressSequentially(email);
    await this.locators.birthField.pressSequentially(birth);
    await this.locators.continueBtn.click();
    await this.locators.codeField.pressSequentially(code)
    await this.locators.lastContinueRegBtn.click();
    await this.waitForPageToLoad()
  }

  async loginAsMember(username: string, pass: string) {
    await this.page.goto(this.urlM);
    await this.locators.emailField.pressSequentially(username);
    await this.locators.continueBtn.click();
    await this.waitForPageToLoad()
    await this.locators.passField.pressSequentially(pass);
    await this.locators.continueBtnLast.click();
    await this.waitForPageToLoad()
  }

  async loginAsProvider(username: string, pass: string) {
    await this.page.goto(this.urlP);
    await this.locators.emailField.pressSequentially(username);
    await this.locators.continueBtn.click();
    await this.waitForPageToLoad()
    await this.locators.passField.pressSequentially(pass);
    await this.locators.continueBtnLast.click();
    await this.waitForPageToLoad()
  }


//   async loginAs() {
//   }
  
}
