// @ts-check
import { expect, chromium, BrowserContext } from '@playwright/test';
import { test } from '../../fixture/lambdaFixtureConfig';
import { ProviderHomePage } from '../../page-objects/ProviderHomePage';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { setTestStatus } from "../../helpers/helpers";
import {type Page } from '@playwright/test';
import dotenv from 'dotenv';
import 'dotenv/config';
import setCurrentTestInfo from '@playwright/test';

dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe.skip("Playwright - Member creation and provider completion for scheduled therapy", () => {
  test.describe.configure({ mode: 'serial' });

  test("Create new therapy visit as member ...",async({loginPageMember,homePageMember})=>{
    await loginPageMember.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
    await homePageMember.e2egetCareFlowMedicalNow()
  })

  test("Start a therapy visit ...", async ({loginPageProvider,providerPage}) => {
    await loginPageProvider.loginAsProvider(process.env.PROVIDER_ACCOUNT_1 || email,process.env.PROVIDER_PASSWORD_1 || pass)
    await providerPage.startTherapy()
  });

  test("Accept visit as a member",async({loginPageMember,homePageMember})=>{
    await loginPageMember.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
    await homePageMember.acceptVisit()
  })

  test("End therapy visit",async({loginPageProvider,providerPage})=>{
    await loginPageProvider.loginAsProvider(process.env.PROVIDER_ACCOUNT_1 || email,process.env.PROVIDER_PASSWORD_1 || pass)
    await providerPage.endMedicalNowTherapy()
  })

  test("Member rate skipping",async({loginPageMember,homePageMember})=>{
    await loginPageMember.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
    await homePageMember.skipRates()
  })

});


//async scheduleCurrentVisit(memberData, providerData, visitType, reasonForVisit)
