import fs from "fs";
import * as puppeteerService from "../helpers/puppeteer";
import { parse } from "node-html-parser";
import { transform } from "./transform";

export const executeCrawling = async () => {
  try {
    const url = "https://www.target.com";

    let { result } = await puppeteerService.getFromBrowser({
      crawlSteps: [
        puppeteerService.goToUrl(`${url}/store-locator/find-stores`),
        puppeteerService.waitForSelector(
          'div[data-test="@store-locator/StoreCardGrid"] > * > div > div'
        ),
        puppeteerService.wait(5),
        puppeteerService.getElements(
          "result",
          'div[data-test="@store-locator/StoreCardGrid"] > * > div > div'
        ),
      ],
      headless: true,
    });

    result = result.map((str: string) => transform(parse(str))).filter(Boolean);

    fs.writeFile("stores.json", JSON.stringify(result), (err) => {
      if (err) {
        throw new Error(err as any);
      }
    });

    return {
      status: true,
      data: result,
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      data: null,
    };
  }
};
