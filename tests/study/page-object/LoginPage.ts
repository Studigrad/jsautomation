import { Locator, Page } from "@playwright/test";

export class LoginPage{
    readonly emailField: Locator;
    readonly passField: Locator;
    readonly submitBtn: Locator;
    constructor(page: Page){
        this.emailField = page.locator("//input[@type='email']")
        this.passField = page.locator("//input[@type='password']")
        this.submitBtn = page.locator("//button[@type='submit']")
    }

    async login(){
        await this.emailField.fill("1337ilysha@gmail.com")
        await this.emailField.fill("Test12345")
        await this.submitBtn.click()
    }

}
