// @ts-check
import { test, expect, chromium, BrowserContext } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import {type Page } from '@playwright/test';
import api from '../../page-objects/components/api';
import dotenv from 'dotenv';;
import 'dotenv/config'
import { ProviderHomePage } from '../../page-objects/ProviderHomePage';
dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe("Playwright - Member creation and provider completion for scheduled Counseling therapy", () => {
  test.describe.configure({ mode: 'serial' });
  let context: BrowserContext;
  let page1: Page;
  let page2: Page;

  let loginPageMember: LoginPage;
  let loginPageProvider: LoginPage;

  let homePageMember: HomePage;
  let providerPage: ProviderHomePage;

  let date: string;
  let time: string;

  test.beforeAll(async ({browser}) => {
    context = await browser.newContext()
    await context.grantPermissions(['microphone','camera']);
    page1 = await context.newPage();
    page2 = await context.newPage();

    loginPageMember = new LoginPage(page1)
    homePageMember = new HomePage(page1)

    loginPageProvider = new LoginPage(page2)
    providerPage = new ProviderHomePage(page2)
  });

  test.afterAll(async () => {
    await context.close();
  });

  test("Login as a member ...",async()=>{
    await loginPageMember.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
  })

  test("Create new Counselling therapy visit as member", async () => {
    [date,time] = await homePageMember.e2eGetCareFlowCounselingOrCoaching("counseling")
    let memberData = await api.returnMemberObject(process.env.MEMBER_ACCOUNT_1, process.env.MEMBER_PASSWORD_1);
    let providerData = await api.loginProvider(process.env.PROVIDER_ACCOUNT_1, process.env.PROVIDER_PASSWORD_1);
    let createCurrentVisit = await api.scheduleCurrentVisit(
      memberData,
      providerData,
      "counseling",
      "Paranoia, Food/Body Image Issues, Mood Issues",
    );
  });

  test("Login as a provider ...", async () => {
    await loginPageProvider.loginAsProvider(process.env.PROVIDER_ACCOUNT_1 || email,process.env.PROVIDER_PASSWORD_1 || pass)
  });

  test("Start a Counselling therapy visit ...",async()=>{
    await providerPage.startScheduledTherapy(date,time)
  })

  test("Accept Counselling visit as a member",async()=>{
    await homePageMember.deleteCard("scheduled")
  })

  // test("End therapy visit",async()=>{
  //   await providerPage.endTalklNowTherapy()
  // })

  // test("Member rate skipping",async()=>{
  //   await homePageMember.skipRates()
  // })

});
