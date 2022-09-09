import puppeteer from "puppeteer";

let browser: puppeteer.Browser | undefined;

interface Params {
  url: string
}

const createPage = async ({ url }: Params) => {
  if (!browser) browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 720,
    deviceScaleFactor: 2
  });
  await page.goto(url);
  return page;
}

export { createPage };
