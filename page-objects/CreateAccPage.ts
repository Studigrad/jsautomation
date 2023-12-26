import { expect, type Locator, type Page } from "@playwright/test";
import { PwAbstractPage } from "./PwAbstractPage";
import { $ } from "playwright-elements"
export class CreateAccPage extends PwAbstractPage {
  readonly locators: Record<string, Locator>;
  readonly page: Page;
  
  constructor(page) {
    super(page);
    this.page = page;
    this.locators = {
      header: this.page.getByRole('heading', { name: 'Create a new account' }),
      continueBtn: this.page.getByTestId('member-continue--button'),
      firstContinueBtn: this.page.getByTestId('eligibility-continue--button'),
      firstName: this.page.getByTestId('eligibility-firstName--input'),
      lastName: this.page.getByTestId('eligibility-lastName--input'),
      birth: this.page.getByTestId('eligibility-dob--input'),
      okBtn: this.page.getByRole('button', { name: 'OK' }),
      sexSelect: this.page.locator(`(//div[@data-testid="member-gender--input"])[1]`),
      male: this.page.getByRole('option', { name: 'Male', exact: true }),
      street1Field: this.page.getByTestId('form-address-street1--input'),
      cityField: this.page.getByTestId('form-address-city--input'),
      stateField: this.page.getByTestId('form-address-state--input'),
      alabama: this.page.getByRole('option', { name: 'Alabama' }),
      zipCodeField: this.page.getByTestId('form-address-zip--input'),
      phoneNumberField: this.page.getByTestId('member-phone--input'),
      agreeRadioBtn: this.page.getByLabel('I agree to theTerms of Use'),
      passwordField: this.page.getByTestId('account-password--input'),
      passwordConfirmField: this.page.getByTestId('account-confirm-password--input'),
      savePasswordBtn: this.page.getByTestId('account-continue--button'),
      laterBtn: this.page.getByTestId('medical-wizard-init-later'),
      homeText: this.page.getByTestId('navigation-breadcrumbs--label-Home'),
    };
  }
  

  async createNewAccount(firstName: string,lastName: string,birth: string,street: string,city: string,zip: string,phone: string,password: string){
    await this.fillBasicInformation(firstName,lastName,birth)
    await this.fillAccountDetail()
    await this.fillAddressAndContact(street,city,zip,phone)
    await this.setupPassword(password)
    if (await this.locators.laterBtn.isVisible()) {
      await this.locators.laterBtn.click();
    }
  }

  async fillBasicInformation(firstName: string,lastName: string,birth: string) {
    await this.locators.firstName.pressSequentially(firstName)
    await this.locators.lastName.pressSequentially(lastName)
    await this.locators.birth.pressSequentially(birth)
    await this.locators.firstContinueBtn.click()
    await this.locators.okBtn.click()
    await this.page.waitForLoadState();
  }

  async fillAccountDetail() {
    await this.locators.sexSelect.click()
    await this.locators.male.click()
    await this.locators.continueBtn.click()
    await this.page.waitForLoadState();
  }

  async fillAddressAndContact(street: string,city: string,zip: string,phone: string) {
    await this.locators.street1Field.pressSequentially(street)
    await this.locators.cityField.pressSequentially(city)
    await this.locators.stateField.click()
    await this.locators.alabama.click()
    await this.locators.zipCodeField.pressSequentially(zip)
    await this.locators.phoneNumberField.pressSequentially(phone)
    await this.locators.agreeRadioBtn.click()
    await this.locators.continueBtn.click()
    await this.page.waitForLoadState();
  }

  async setupPassword(password: string) {
    await this.locators.passwordField.pressSequentially(password);
    await this.locators.passwordConfirmField.pressSequentially(password);
    await this.locators.savePasswordBtn.click();
    await this.page.waitForLoadState();
  }
}

