// @ts-check
import { test } from '../../fixture/lambdaConfig';
import { setTestStatus } from "../../helpers/helpers";
import dotenv from 'dotenv';
import 'dotenv/config';
import { Member } from '../../page-objects/Member';
import { Provider } from '../../page-objects/Provider';

dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe.skip("Playwright - Member creation and provider completion for scheduled therapy", () => {
  test.describe.configure({ mode: 'serial' });

  let member: Member;
  let provider: Provider;

  test.beforeAll(async ({page1,page2}) => {
    member = new Member(page1)
    provider = new Provider(page2)
  });

  test.afterAll(async ({},testInfo) => {
    await setTestStatus(testInfo, [member.page,provider.page]);
  });

  test("Playwright - Member creation and provider completion for scheduled therapy ...",async()=>{
    await member.page.bringToFront()
    await member.loginPage.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
  })

  test("Create new therapy visit as member", async () => {
    await member.homePage.e2egetCareFlowMedicalNow()
  });

  test("Login as a provider ...", async () => {
    await provider.page.bringToFront()
    await provider.loginPage.loginAsProvider(process.env.PROVIDER_ACCOUNT_1 || email,process.env.PROVIDER_PASSWORD_1 || pass)
  });

  test("Start a therapy visit ...",async()=>{
    await provider.homePage.startTherapy()
  })

  test("Accept visit as a member",async()=>{
    await member.page.bringToFront()
    await member.homePage.acceptVisit()
  })

  test("End therapy visit",async()=>{
    await provider.page.bringToFront()
    await provider.homePage.endMedicalNowTherapy()
  })

  test("Member rate skipping",async()=>{
    await member.page.bringToFront()
    await member.homePage.skipRates()
  })

});


//async scheduleCurrentVisit(memberData, providerData, visitType, reasonForVisit)
