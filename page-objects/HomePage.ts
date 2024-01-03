// @ts-check
import { expect, type Locator, type Page } from "@playwright/test";
import { PwAbstractPage } from "./PwAbstractPage";
import { parseDate } from "../helpers/helpers";
type TypeOfVisitLocators = Locator & {
  medicalNow: Locator;
  talkNow: Locator;
  counseling: Locator;
  healthCoaching: Locator;
  medical: Locator;
  psychiatry: Locator;
};

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
      typeOfVisitBtn: {
        medicalNow: this.page.locator("//input[@value='medical_now']"),
        talkNow: this.page.locator("//input[@value='therapy_now']"),
        counseling: this.page.locator("//input[@value='therapy']"),
        healthCoaching: this.page.locator("//input[@value='hc']"),
        medical: this.page.locator("//input[@value='medical']"),
        psychiatry: this.page.locator("//input[@value='psychiatry']")
      } as TypeOfVisitLocators,
      toBeSeenForBtn: this.page.locator('(//fieldset/ul/li/input)[1]'),
      selectPharmacyBtn: this.page.locator('(//input[@class="peer flex-none radio"])[1]'),
      paymentRequiredCloseBtn: this.page.locator('//button[@class="btn btn-neutral"]'),
      selectCardBtn: this.page.locator('(//input[@name="payment-card"])[1]'),

      visitCardScheduledBtn: this.page.locator("//div[h2[contains(text(), 'Visits')]]/div/div/div/button"),
      visitCardOnDemandBtn: this.page.locator("//div[h2[contains(text(), 'Visits')]]/div/button"),
      cancelVisitBtn: this.page.locator('//button[contains(text(), "Cancel Visit")]'),
      noLongerNeededBtn: this.page.getByLabel('No longer needed'),
      yesCancelVisitBtn: this.page.getByLabel('Yes, Cancel Visit'),
  
      yesJoinVisitBtn: this.page.getByRole('button', { name: 'YES, JOIN VISIT' }),
      skipRateBtn : this.page.getByRole('button', { name: 'Skip' }),
      joinVisitBtn: this.page.locator('(//button[contains(text(), "Join Visit")])[1]'),

      feetHeightSelect: this.page.getByTestId('medical-general-height-feet'),
      feet5SelectOption: this.page.getByRole('option', { name: '5 Feet' }),
      inchesHeightSelect: this.page.getByTestId('medical-general-height-inches'),
      inches5SelectOption: this.page.getByRole('option', { name: '5 Inches' }),
      weightInPoundsInput: this.page.getByTestId('medical-general-weight'),
      smokeTobacoNo: this.page.getByTestId('medical-lifestyle-smoke').getByLabel('No'),
      vapingNo: this.page.getByTestId('medical-lifestyle-vape').getByLabel('No'),
      drinkAlcoholNo: this.page.getByTestId('medical-lifestyle-drink').getByLabel('No'),
      sexualActiveNo: this.page.getByTestId('medical-lifestyle-sexually-active').getByLabel('No'),

      addPharmacyBtn: this.page.getByTestId('new-visit-pharmacy-new--input'),
      pharmacyNameInput: this.page.getByTestId('new-visit-pharmacyName--input'),
      cityNameInput: this.page.getByTestId('new-visit-pharmacyCity--input'),
      stateSelect: this.page.getByTestId('new-visit-pharmacyState--input'),
      stateNoneOption: this.page.getByRole('option', { name: 'None' }),
      searchPharmacyBtn: this.page.getByTestId('new-visit-search-pharmacy--button'),
      addFirstPharmacyBtn: this.page.getByTestId('new-visit-add-pharmacy-0--button'),

      availableProviderBtn: this.page.getByLabel('Jen Roboto, MD, LPC, ProviderTimelyMD'),
      availableTimeBtn: this.page.getByTestId('new-visit-slot-time-0--button').locator('div').first(),
    }
  }

  async newUserGetCare(){
    await this.getCateFirstSteps();
    await this.locators.typeOfVisitBtn['medicalNow'].click()
    await this.locators.nextBtn.click()
    await this.page.waitForLoadState("load")
    await this.createHealthProfile()
    await this.page.waitForLoadState("load")
    await this.locators.toBeSeenForBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.nextBtn.click()
    await this.page.waitForLoadState("load")
    await this.addPharmacy()
    await this.page.waitForLoadState("load")
    await this.locators.selectPharmacyBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.nextBtn.click()
    await expect(this.locators.visitCardOnDemandBtn).toBeVisible()
  }

  async e2egetCareFlowMedicalNow(){
    await this.getCateFirstSteps();
    await this.locators.typeOfVisitBtn['medicalNow'].click()
    await this.locators.nextBtn.click()
    await this.locators.toBeSeenForBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.selectPharmacyBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.nextBtn.click()
    await expect(this.locators.visitCardOnDemandBtn).toBeVisible()
  }

  async e2egetCareFlowTalkNow(){
    await this.getCateFirstSteps();
    await this.locators.typeOfVisitBtn['talkNow'].click()
    await this.locators.nextBtn.click()
    await this.locators.toBeSeenForBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.paymentRequiredCloseBtn.click()
    await this.locators.selectCardBtn.click()
    await this.locators.nextBtn.click()
    await this.waitAndClickElement(this.locators.nextBtn,2000)
    await this.waitAndClickElement(this.locators.nextBtn,2000)
    await expect(this.locators.visitCardOnDemandBtn).toBeVisible()
  }

  async e2eGetCareFlowCounseling(){
    await this.getCateFirstSteps();
    await this.locators.typeOfVisitBtn['counseling'].click()
    await this.locators.nextBtn.click()
    await this.locators.toBeSeenForBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.availableProviderBtn.click()
    await this.locators.nextBtn.click()

    const elementText = await this.page.innerText('//td[@aria-selected="true"]');
    const date = elementText.trim();

    const text = await this.locators.availableTimeBtn.innerText();
    const timeV = text.trim();

    await this.locators.availableTimeBtn.click()
    await this.locators.nextBtn.click()
    await this.locators.nextBtn.click()

    await expect(this.locators.visitCardScheduledBtn).toBeVisible()
    return [date,parseDate(timeV)]
  }

   async getCateFirstSteps() {
    await this.locators.getCareBtn.click();
    await this.locators.provideCareBtn.click();
    await this.locators.nextBtn.click();
    await this.locators.locationBtn.click();
    await this.locators.nextBtn.click();
    await this.locators.nextBtn.click();
  }

  async deleteCard(){
    await this.locators.visitCardOnDemandBtn.click()
    await this.locators.cancelVisitBtn.click()
    await this.locators.noLongerNeededBtn.click()
    await this.locators.yesCancelVisitBtn.click()
    await this.page.waitForLoadState("load")
    await expect(this.locators.visitCardOnDemandBtn).not.toBeVisible()
  }

  async acceptVisit(){
    if(await this.isMyElementVisible(this.locators.yesJoinVisitBtn)){
      await this.locators.yesJoinVisitBtn.click()
      await this.page.waitForLoadState("load")
    }else{
      await this.locators.joinVisitBtn.click()
      await this.page.waitForLoadState("load")
    }
  }

  async skipRates(){
    while(await this.locators.skipRateBtn.isVisible()){
      await this.locators.skipRateBtn.click();
      await this.page.waitForLoadState("load")
    }
  }

  async createHealthProfile(){
    await this.waitAndClickElement(this.locators.nextBtn,1000)
    
    await this.locators.feetHeightSelect.click()
    await this.locators.feet5SelectOption.click()
    await this.locators.inchesHeightSelect.click()
    await this.locators.inches5SelectOption.click()
    await this.locators.weightInPoundsInput.pressSequentially("70")
    await this.locators.nextBtn.click()

    await this.locators.smokeTobacoNo.click()
    await this.locators.vapingNo.click()
    await this.locators.drinkAlcoholNo.click()
    await this.locators.sexualActiveNo.click()
  
    await this.waitAndClickElement(this.locators.nextBtn,2000)
    await this.waitAndClickElement(this.locators.nextBtn,2000)
    await this.waitAndClickElement(this.locators.nextBtn,2000)
    await this.waitAndClickElement(this.locators.nextBtn,2000)
    await this.waitAndClickElement(this.locators.nextBtn,2000)
    await this.waitAndClickElement(this.locators.nextBtn,2000)
    await this.waitAndClickElement(this.locators.nextBtn,2000)
  }

  async addPharmacy(){
    await this.locators.addPharmacyBtn.click()
    await this.locators.pharmacyNameInput.pressSequentially("CVS Pharmacy")
    await this.locators.cityNameInput.fill("")
    await this.locators.stateSelect.click()
    await this.locators.stateNoneOption.click()
    await this.locators.searchPharmacyBtn.click()
    await this.locators.addFirstPharmacyBtn.click()
  }



}
