import Koa from "koa";
import Router from "@koa/router";

const PORT = 6660;

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = `OKO HTML → DraftJS translation at your service 🦾`;
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(6660);
console.log(`Listening on ${PORT}`);
