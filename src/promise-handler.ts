import { Ctx, Next } from "./types";
import path from "path";
import { parseHrtimeToSeconds } from "./profiling";
import { createPage } from "./browser";
import { css } from "./constants";

export default async function (ctx: Ctx, next: Next) {
  const { url, filename } = ctx.request.body;

  if (!url || !filename) {
    ctx.throw("Not enough params", 400);
  }

  const startTime = process.hrtime();

  const page = await createPage({url});
  await page.addStyleTag({ content: css });
  await page.waitForSelector(".layout-block");

  const element = await page.$(".layout-block");
  await element.screenshot({
    path: path.join(__dirname, "..", "storage", `${filename}.png`),
  });

  await page.close();

  ctx.body = {
    text: "OK",
    url,
    elapsedTime: parseHrtimeToSeconds(process.hrtime(startTime)),
  };

  await next();
}
