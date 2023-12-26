import { expect, type Locator, type Page } from "@playwright/test";
import { PwAbstractPage } from "./PwAbstractPage";
import { LoadFnOutput } from "module";

export class ProviderHomePage extends PwAbstractPage {
  readonly locators: Record<string, Locator>;
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.locators = {
      queueTab: this.page.getByRole('button', { name: 'Queue' }),
      claimPatientBtn: this.page.getByRole('button', { name: 'Claim Patient' }),
      confirmClaimBtn: this.page.getByRole('button', { name: 'Confirm Patient claim' }),
      openVisitBtn: this.page.getByRole('button', { name: 'Open Visit' }),
      startVisitBtn: this.page.getByTestId('te'),
      endVisitBtn: this.page.locator('(//span[@class="MuiBadge-root jss936"])[5]'),
      yesEndVisitBtn: this.page.getByRole('button', { name: 'Yes, end visit' }),
      finishVisitBtn: this.page.getByTestId('tc'),
      editVisitSummaryBtn: this.page.getByRole('button', { name: 'Edit visit summary' }),
      icdSearch: this.page.getByLabel('ICD Search'),
      icdFindBtn: this.page.getByLabel('Open', { exact: true }),
      icdValue: this.page.getByRole('option', { name: '(S31.35XS) - Open bite of' }),
      historyNotesTextArea: this.page.getByPlaceholder('Historical notes are visible'),
      examNotesTextArea: this.page.getByPlaceholder('Examination notes are visible'),
      editDischargeBtn: this.page.getByRole('button', { name: 'Edit discharge' }),
      carePlanTextArea: this.page.getByPlaceholder('The Care Plan goes to the'),
      restrictionsChecksBtn: this.page.getByLabel('School'),
      patientReferalRadioBtn: this.page.locator('(//div[@class="flex gap-xs"]/label)[2]'),
      submitAndCompleteVisitBtn: this.page.getByRole('button', { name: 'Submit and complete visit' }),
    };
  }

  async startTherapy() {
    await this.locators.queueTab.click();
    await this.locators.claimPatientBtn.click();
    await this.locators.confirmClaimBtn.click();
    await this.locators.openVisitBtn.click();
    await this.locators.startVisitBtn.click();
    await this.page.waitForLoadState();
  }

  async endTherapy() {
    await this.locators.endVisitBtn.click();
    await this.locators.yesEndVisitBtn.click();
    await this.locators.finishVisitBtn.click();
    await this.page.waitForLoadState();

    await this.fillDiagnosisForm();
    await this.page.waitForLoadState();

    await this.fillDischargeForm();
    await this.page.waitForLoadState();

    await this.locators.submitAndCompleteVisitBtn.click();
    await this.page.waitForLoadState();
  }

  async fillDiagnosisForm() {
    await this.locators.editVisitSummaryBtn.click();
    await this.locators.icdSearch.pressSequentially("test");
    await this.locators.icdFindBtn.click();
    await this.locators.icdValue.click();
    await this.locators.historyNotesTextArea.pressSequentially("test");
    await this.locators.examNotesTextArea.pressSequentially("test");
    await this.locators.finishVisitBtn.click();
  }

  async fillDischargeForm() {
    await this.locators.editDischargeBtn.click();
    await this.locators.carePlanTextArea.pressSequentially("test");
    await this.locators.restrictionsChecksBtn.click();
    await this.locators.patientReferalRadioBtn.click();
    await this.locators.finishVisitBtn.click();
  }

}
