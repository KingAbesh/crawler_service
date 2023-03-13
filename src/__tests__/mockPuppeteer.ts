import { Browser, Page, ElementHandle } from "puppeteer";

export const stubPage = {
  goto(url: string) {
    return Promise.resolve(url);
  },
  $$(selector: string): Promise<ElementHandle[] | typeof selector> {
    return Promise.resolve([]);
  },
  $(selector: string) {
    return Promise.resolve(selector);
  },
  $eval(selector: string, pageFunction: any) {
    return Promise.resolve([selector, pageFunction]);
  },
  evaluate(pageFunction: any, element: ElementHandle) {
    return Promise.resolve([element, pageFunction]);
  },
  waitForSelector(
    selector: string
  ): Promise<ElementHandle[] | typeof selector> {
    return Promise.resolve([]);
  },
  wait(time: number) {
    return Promise.resolve(time);
  },
} as unknown as Page;

export const stubBrowser = {
  newPage() {
    return Promise.resolve(stubPage);
  },
  close() {
    return Promise.resolve();
  },
  on() {
    return Promise.resolve();
  },
} as unknown as Browser;

export const stubPuppeteer = {
  launch() {
    return Promise.resolve(stubBrowser);
  },
} as unknown as any;

export const stubElementHandle = {
  $eval() {
    console.log("stub element handle");
    return Promise.resolve();
  },
} as unknown as ElementHandle;
