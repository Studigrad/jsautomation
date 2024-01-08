// @ts-check
import { expect, type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { CreateAccPage } from "./CreateAccPage";

export class Member {
    readonly page: Page;
    readonly loginPage: LoginPage
    readonly homePage: HomePage
    readonly createAccPage: CreateAccPage

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(page)
        this.homePage = new HomePage(page)
        this.createAccPage = new CreateAccPage(page)
    }
  }
