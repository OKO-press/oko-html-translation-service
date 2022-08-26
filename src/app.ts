import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import "global-jsdom/register";
import simpleHandler from "./simple-handler";
import advancedHandler from "./advanced-handler";
import cors from "@koa/cors";

const PORT = 6660;

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = `OKO HTML → DraftJS translation at your service 🦾`;
});

/**
 * HTML to simple DraftJS
 */
router.post("/translate/simple", simpleHandler);

/**
 * HTML to advanced DraftJS
 */
 router.post("/translate/advanced", advancedHandler);

/**
 * Ping tgo check if service is alive.
 */
router.get("/ping", async (ctx, next) => {
  ctx.body = {
    status: true
  }

  await next();
});

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods()).use(cors());

app.listen(6660);
console.log(`Listening on ${PORT}`);
