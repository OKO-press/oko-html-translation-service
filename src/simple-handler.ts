import { convertFromHTML, ContentState, convertToRaw } from "draft-js";
import { Ctx, Next } from "./types";

export default async function(ctx: Ctx, next: Next) {
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
