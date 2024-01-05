// @ts-check
import { expect, type Locator, type Page } from "@playwright/test";
import { PwAbstractPage } from "./PwAbstractPage";
import { IntakeForm } from "./components/IntakeForm";

export class ProviderHomePage extends PwAbstractPage {
  readonly locators: Record<string, Locator>;
  readonly page: Page;
  readonly intakeForm: IntakeForm

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.intakeForm = new IntakeForm(page)
    this.locators = {
      queueTab: this.page.getByRole('button', { name: 'Queue' }),
      scheduleTab: this.page.getByRole('button', { name: 'Schedule' }),
      claimPatientBtn: this.page.getByRole('button', { name: 'Claim Patient' }),
      confirmClaimBtn: this.page.getByRole('button', { name: 'Confirm Patient claim' }),
      openVisitBtn: this.page.getByRole('button', { name: 'Open Visit' }),
      startVisitBtn: this.page.getByTestId('te'),
      endVisitBtn: this.page.locator('(//span[contains(@class, "MuiBadge-root")])[5]/div'),
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
      patientReferalRadioBtn: this.page.locator('//input[@value="false"]'),
      submitAndCompleteVisitBtn: this.page.getByRole('button', { name: 'Submit and complete visit' }),
      activeVisitBtn: this.page.locator("//h4[contains(text(),'Active Visit')]/ancestor::div[3]//button"),
      cancelVisitBtn: this.page.getByRole('button', { name: 'Cancel visit' }),
      memberNotShowRadioBtn: this.page.getByLabel('Member no show'),
      moreInformationTextBox: this.page.getByRole('textbox'),
      yesCancelVisitBtn: this.page.getByRole('button', { name: 'Yes, cancel visit' }),
      editIntakeBtn: this.page.getByRole('button', { name: 'Edit intake' }),
      editNotesBtn: this.page.getByRole('button', { name: 'Edit Notes' }),
      visitNotesInputField: this.page.getByPlaceholder('Visit notes are visible to'),
      selectScheduledVistiBtn: this.page.locator("(//table/tr)[1]"),
      goToVisitBtn: this.page.getByRole('button', { name: 'Go to visit' })
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

  async startScheduledTherapy(date: any,time: any){
    await this.locators.scheduleTab.click()
    await this.page.getByText(`${date}${time}`).click()
    // if(await this.isMyElementVisible(this.locators.selectScheduledVistiBtn)){
    //   await this.locators.selectScheduledVistiBtn.click()
    // }
    await this.locators.goToVisitBtn.click()
    await this.page.waitForLoadState();
  }

  async endMedicalNowTherapy() {
    await this.finishTherapy();

    await this.fillDiagnosisForm();
    await this.page.waitForLoadState();

    await this.fillDischargeForm();
    await this.page.waitForLoadState();

    await this.locators.submitAndCompleteVisitBtn.click();
    await this.page.waitForLoadState();
  }

  async endTalklNowTherapy() {
    await this.finishTherapy();

    await this.fillIntakeForm()
    await this.page.waitForLoadState();

    await this.fillNotesForm()
    await this.page.waitForLoadState();

    await this.fillDischargeForm();
    await this.page.waitForLoadState();

    await this.locators.submitAndCompleteVisitBtn.click();
    await this.page.waitForLoadState();
  }

  private async finishTherapy() {
    await this.locators.endVisitBtn.click();
    await this.locators.yesEndVisitBtn.click();
    await this.locators.finishVisitBtn.click();
    await this.page.waitForLoadState();
  }

  async fillNotesForm(){
    await this.locators.editNotesBtn.click()
    await this.locators.visitNotesInputField.pressSequentially("test")
    await this.locators.finishVisitBtn.click()
  }

  async fillIntakeForm(){
    await this.locators.editIntakeBtn.click()
    await this.page.waitForLoadState();
    await this.intakeForm.fillForm()
    await this.locators.finishVisitBtn.click()
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


  async closeExistingVisit(){
    await this.locators.activeVisitBtn.click()
    if(await this.isMyElementVisible(this.locators.cancelVisitBtn)){
      await this.locators.cancelVisitBtn.click()
    }else{
      await this.locators.startVisitBtn.click()
      await this.locators.cancelVisitBtn.click()
    }
    await this.locators.memberNotShowRadioBtn.click()
    await this.locators.moreInformationTextBox.pressSequentially("test")
    await this.locators.yesCancelVisitBtn.click()
  }

}
