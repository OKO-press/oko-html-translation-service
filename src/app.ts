import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import "global-jsdom/register";
import { convertFromHTML } from "draft-js";

const PORT = 6660;

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = `OKO HTML → DraftJS translation at your service 🦾`;
});

/**
 * Simple HTML to DraftJS
 */
router.post("/translate/simple", async (ctx, next) => {
  const { text } = ctx.request.body;

  if (typeof text === "undefined") {
    ctx.throw('Not enough params', 400);
  }

  const converted = convertFromHTML(text);

  ctx.body = {
    text: JSON.stringify(converted),
  };

  await next();
});

/**
 * Ping tgo check if service is alive.
 */
router.get("/ping", async (ctx, next) => {
  ctx.body = {
    status: true
  }

  await next();
});

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

app.listen(6660);
console.log(`Listening on ${PORT}`);
