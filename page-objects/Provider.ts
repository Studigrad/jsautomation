// @ts-check
import { expect, type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { CreateAccPage } from "./CreateAccPage";
import { ProviderHomePage } from "./ProviderHomePage";

export class Provider {
    readonly page: Page
    readonly loginPage: LoginPage
    readonly homePage: ProviderHomePage

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(page)
        this.homePage = new ProviderHomePage(page)
    }
}
