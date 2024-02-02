import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
export class LoginPage extends BasePage{
    readonly emailField: any;
    readonly passwordField: any;
    readonly sumbitBtn: any
    readonly page: any
    constructor(page){
        super(page)
        this.page = page
        this.emailField = page.locator('//input[@type="email"]') 
        this.passwordField = page.locator('//input[@type="password"]')
        this.sumbitBtn = page.locator('//button[@type="submit"]')
        
    }
    
    async login(email = "1337ilysha@gmail.com",password = "Test12345@"){
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.sumbitBtn.click()

        await expect(this.page).toHaveURL("https://lms.ithillel.ua/");
    }
}
