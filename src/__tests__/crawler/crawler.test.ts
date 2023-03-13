import { executeCrawling } from "@helpers/executecrawling";
import mockPuppeteer from "puppeteer";
import { stubBrowser, stubPage } from "../mockPuppeteer";

jest.mock("puppeteer", () => ({
  launch() {
    return stubBrowser;
  },
}));

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Crawler", () => {

  test('that page.goto is called with "https://www.target.com/store-locator/find-stores"', async () => {
    const gotoSpy = jest.spyOn(stubPage, "goto");

    await executeCrawling();

    expect(gotoSpy).toHaveBeenCalledWith(
      "https://www.target.com/store-locator/find-stores"
    );
  });

  test("that puppeteer.launch is called once", async () => {
    const launchSpy = jest.spyOn(mockPuppeteer, "launch");

    await executeCrawling();

    expect(launchSpy).toHaveBeenCalledTimes(1);
  });

  test("that puppeteer.launch is called once second time", async () => {
    const launchSpy = jest.spyOn(mockPuppeteer, "launch");

    await executeCrawling();

    expect(launchSpy).toHaveBeenCalledTimes(1);
  });

  test("that browser.newPage is called once", async () => {
    const browserNewPageSpy = jest.spyOn(stubBrowser, "newPage");

    await executeCrawling();

    expect(browserNewPageSpy).toHaveBeenCalledTimes(1);
  });

  test("that browser.close is called once", async () => {
    const browserCloseSpy = jest.spyOn(stubBrowser, "close");

    await executeCrawling();

    expect(browserCloseSpy).toHaveBeenCalledTimes(1);
  });
});
