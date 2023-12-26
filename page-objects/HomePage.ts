import { expect, type Locator, type Page } from "@playwright/test";
import { PwAbstractPage } from "./PwAbstractPage";

export class HomePage extends PwAbstractPage{
  readonly locators: Record<string, Locator>;
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.locators = {
      getCareBtn: this.page.getByTestId('t0'),
      provideCareBtn: this.page.getByTestId('t4'),
      nextBtn: this.page.getByTestId('new-visit-next--button'),
      locationBtn: this.page.getByLabel('I am in the United States'),
      typeOfVisitBtn: this.page.locator("//input[@value='medical_now']"),
      toBeSeenForBtn: this.page.getByLabel('Allergies'),
      selectPharmacyBtn: this.page.locator('(//input[@class="peer flex-none radio"])[1]'),
      visitCardBtn: this.page.getByRole('button', { name: 'ON-DEMAND VISIT MedicalNow' }),
      cancelVisitBtn: this.page.locator('//button[contains(text(), "Cancel Visit")]'),
      noLongerNeededBtn: this.page.getByLabel('No longer needed'),
      yesCancelVisitBtn: this.page.getByLabel('Yes, Cancel Visit'),
  
      yesJoinVisitBtn: this.page.getByRole('button', { name: 'YES, JOIN VISIT' }),
      skipRateBtn : this.page.getByRole('button', { name: 'Skip' }),
      joinVisitBtn: this.page.locator('(//button[contains(text(), "Join Visit")])[1]')
    }
  }


  async e2egetCareFlow(){
    await this.locators.getCareBtn.click()
    await this.locators.provideCareBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.locationBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.typeOfVisitBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.toBeSeenForBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.selectPharmacyBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.nextBtn.click()
    await expect(this.locators.visitCardBtn).toBeVisible()
  }

  async deleteCard(){
    await this.locators.visitCardBtn.click()
    await this.locators.cancelVisitBtn.click()
    await this.locators.noLongerNeededBtn.click()
    await this.locators.yesCancelVisitBtn.click()
    await this.page.waitForLoadState()
    await expect(this.locators.visitCardBtn).not.toBeVisible()
  }

  async acceptVisit(){
    if(await this.isMyElementVisible(this.locators.yesJoinVisitBtn)){
      await this.locators.yesJoinVisitBtn.click()
      await this.page.waitForLoadState()
    }else{
      await this.locators.joinVisitBtn.click()
      await this.page.waitForLoadState()
    }
  }

  async skipRates(){
    while(await this.locators.skipRateBtn.isVisible()){
      await this.locators.skipRateBtn.click();
      await this.page.waitForLoadState()
    }
  }

}
