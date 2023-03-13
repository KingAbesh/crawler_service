import puppeteer from "puppeteer-extra";
import PluginStealth from "puppeteer-extra-plugin-stealth";
import pluginUa from "puppeteer-extra-plugin-anonymize-ua";
import fs from "fs";
import util from "util";
import os from "os";
import path from "path";
import rimraf from "rimraf";
import treekill from "tree-kill";

puppeteer.use(pluginUa());

const pluginStealth = PluginStealth();
puppeteer.use(pluginStealth);

type PageElements = (p: any) => Promise<any | void>;
type MetaInfo = { id: string; name: string; affiliateUrl: string };

export const isMetaInfo = (
  data: {} | PageElements | MetaInfo
): data is MetaInfo => {
  return (data as MetaInfo).id !== undefined;
};

const mkdirAsync = util.promisify(fs.mkdir);
const setup = async () => {
  const dataDir = path.join(os.tmpdir(), `${Date.now()}`);
  await mkdirAsync(dataDir);
  return dataDir;
};

const cleanup = (dir) => rimraf(dir, () => {});

export const getFromBrowser = async (options: {
  crawlSteps: any[];
  headless: boolean;
}) => {
  const userDataDir = await setup();
  let results: any = {};

  const browser = await puppeteer.launch({
    headless: options.headless,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    userDataDir,
  });

  try {
    const page = await browser.newPage();

    for (const d of options.crawlSteps) {
      if (!d) continue;
      try {
        const res = await d(page);
        if (res && res.key) {
          results[res.key] = res.value;
        }
      } catch (err) {
        console.log(err);
      }
    }
  } catch (e) {
    console.log("---browser", e);
  } finally {
    await browser.close();
    cleanup(userDataDir);
    treekill(browser.process().pid, "SIGKILL");
  }
  return results;
};

export const goToUrl = (url: string) => async (page: any) => {
  await page.goto(url);
};

export const wait =
  (time: number = 1) =>
  async (page: any) => {
    await page.waitForTimeout(time * 1000);
  };


export const getElements =
  (key: string, selector: string) => async (page: any) => {
    const elements = await page.$$(selector);

    let res: any[] = [];
    for (const el of elements) {
      const val = await page.evaluate((element) => element.innerHTML, el);
      res.push(val);
    }
    return { key, value: res };
  };

export const waitForSelector = (selector: string) => async (page: any) => {
  await page.waitForSelector(selector);
};


