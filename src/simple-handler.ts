import { convertFromHTML, ContentState, convertToRaw } from "draft-js";
import { Ctx, Next } from "./types";
import { isProperTranslateBody } from "./helpers";

export default async function (ctx: Ctx, next: Next) {
  const { body } = ctx.request;

  if (!isProperTranslateBody(body)) {
    ctx.throw(400, "Not enough params");
  }

  const converted = convertFromHTML(body.text);

  const draftState = ContentState.createFromBlockArray(
    converted.contentBlocks,
    converted.entityMap
  );

  ctx.body = {
    text: JSON.stringify(convertToRaw(draftState)),
  };

  await next();
}
