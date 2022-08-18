import { convertFromHTML, ContentState, convertToRaw } from "draft-js";
import type * as Koa from "koa";
import type Router from "@koa/router";

type Ctx = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext
& Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>, any>;

export default async function(ctx: Ctx, next: Koa.Next) {
  const { text } = ctx.request.body;

  if (typeof text === "undefined") {
    ctx.throw('Not enough params', 400);
  }

  const converted = convertFromHTML(text);

  const draftState = ContentState.createFromBlockArray(
    converted.contentBlocks,
    converted.entityMap,
  );

  ctx.body = {
    text: JSON.stringify(convertToRaw(draftState)),
  };

  await next();
}
