// @ts-check
import { expect, type Locator, type Page } from "@playwright/test";
import { PwAbstractPage } from "../PwAbstractPage";

export class IntakeForm extends PwAbstractPage {
  readonly locators: Record<string, Locator>;
  readonly page: Page;
  readonly inputQ5: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.inputQ5 = this.page.locator('//textarea[@id="intake-question:5"]'),
    this.locators = {
        intQ1Btn: this.page.locator('//input[@id="intake-question:1:1"]'),
        intQ2Btn: this.page.locator("//input[@id='intake-question:2:1']"),
        intQ4Btn: this.page.locator("//input[@id='intake-question:4:1']"),
        intQ6Btn: this.page.locator("//input[@id='intake-question:6:5']"),
        intQ8Btn: this.page.locator("//input[@id='intake-question:8:0']"),
        intQ10Btn: this.page.locator("//input[@id='intake-question:10:1']"),
        intQ11Btn: this.page.locator("//input[@id='intake-question:11:1']"),
        intQ12Btn: this.page.locator("//input[@id='intake-question:12:0']"),
        intQ16Btn: this.page.locator("//input[@id='intake-question:16:0']"),
        intQ18Btn: this.page.locator("//input[@id='intake-question:18:0']"),
        intQ23Btn: this.page.locator("//input[@id='intake-question:23:0']"),
        intQ29Btn: this.page.locator("//input[@id='intake-question:29:1']"),
        intQ30Btn: this.page.locator("//input[@id='intake-question:30:0']"),
        intQ60Btn: this.page.locator("//input[@id='intake-question:60:0']"),
        intQ62Btn: this.page.locator("//input[@id='intake-question:62:0']"),
        intQ64Btn: this.page.locator("//input[@id='intake-question:64:0']"),
        intQ66Btn: this.page.locator("//input[@id='intake-question:66:0']"),
        intQ67Btn: this.page.locator("//input[@id='intake-question:67:0']"),
    };
  }

  async fillForm(){
    await this.inputQ5.pressSequentially("test")
    for (const btn of Object.values(this.locators)) {
        await btn.click()
    }
  }

}
