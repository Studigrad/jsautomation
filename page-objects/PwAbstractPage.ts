// @ts-check
import { Locator, Page, expect } from "@playwright/test";

export class PwAbstractPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // async goTo(url: string){
  //   this.page.goto(url)
  // }

  async waitForPageToLoad(){
    await this.page.waitForLoadState('domcontentloaded')
  }

  async waitAndClickElement(element: Locator,time: number){
    await this.wait(time*1000)
    await element.click()
  }

  async click(element: Locator) {
    const visible = await element.isVisible();
    if (visible) {
      await element.click();
    }
  }

  async type(element: Locator, text: string) {
    const visible = await element.isVisible();
    if (visible) {
      await element.pressSequentially(text);
    }
  }

  async fillField(element: Locator, text: string) {
    const visible = await element.isVisible();
    if (visible) {
      await element.fill(text);
    }
  }

  async verifyElementDisplayed(element: Locator) {
      await element.waitFor({ state: "visible" });
      expect(await element.isVisible()).toBe(true);
  }
  
  async isMyElementVisible(element: Locator) {
    try{
      await element.waitFor({ state: "visible" });
      return await element.isVisible();
    }catch(e){
      return false
    }
  }

  async isMyElementHidden(element: Locator) {
    try{
      await element.waitFor({ state: "hidden" });
      return await element.isHidden();
    }catch(e){
      return false
    }
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time);
  }
}
