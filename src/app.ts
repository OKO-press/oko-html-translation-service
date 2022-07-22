import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";

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
  console.log(ctx.request.body?.text);
  ctx.body = {
    hello: ctx.request.body?.text
  };
});

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

app.listen(6660);
console.log(`Listening on ${PORT}`);
