import { BrowserContext, Page } from "@playwright/test";

export function parseDate(inputString) {
  const match = inputString.match(/(\d{1,2}:\d{2})\s[APMapm]{2}/);
  if (match) {
    const parsedTime = match[1];
    const match2 = parsedTime.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      const hours = match2[1].padStart(2, '0'); // Add leading zero if needed
      const minutes = match2[2];
      const res = `${hours}:${minutes}`;
      return res;
    } else {
      return parsedTime
    }
  } else {
    console.log("No match found");
    return 0;
  }
}

const getErrorMessage = (obj: any, keys: any[]) =>
    keys.reduce(
        (obj: { [x: string]: any; }, key: string | number) => (typeof obj == "object" ? obj[key] : undefined),
        obj
    );

export async function setTestStatus(testInfo, pages: Page[]) {
  const testStatus = {
    action: "setTestStatus",
    arguments: {
      status: testInfo.status,
      remark: getErrorMessage(testInfo, ["error", "message"]),
    },
  };
  await pages[0].evaluate(() => { }, `lambdatest_action: ${JSON.stringify(testStatus)}`);
  pages.forEach(async(element) => {
    await element.close();
  });
  //await browserContext.close();
}
