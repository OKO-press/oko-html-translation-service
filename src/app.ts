import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import "global-jsdom/register";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";
import simpleHandler from "./simple-handler";

const PORT = 6660;

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = `OKO HTML → DraftJS translation at your service 🦾`;
});

/**
 * Simple HTML to DraftJS
 */
router.post("/translate/simple", simpleHandler);

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
