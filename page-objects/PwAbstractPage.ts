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

  async clickElement(element: Locator,time: number = 0.5){
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
      await element.waitFor({ state: "visible",timeout:10000});
      expect(await element.isVisible()).toBe(true);
  }
  
  async isMyElementVisible(element: Locator) {
    try{
      await element.waitFor({ state: "visible",timeout:10000 });
      return await element.isVisible();
    }catch(e){
      return false
    }
  }

  async isMyElementHidden(element: Locator) {
    try{
      await element.waitFor({ state: "hidden",timeout:10000 });
      return await element.isHidden();
    }catch(e){
      return false
    }
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time);
  }
}
