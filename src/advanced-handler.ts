import { convertFromHTML, ContentState, convertToRaw, DefaultDraftBlockRenderMap } from "draft-js";
import Immutable from "immutable";
import { Ctx, Next } from "./types";

// Custom render map
const blockRenderMap = Immutable.Map({
  atomic: {
    element: "widget",
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export default async function(ctx: Ctx, next: Next) {
  const { text } = ctx.request.body;

  if (typeof text === "undefined") {
    ctx.throw('Not enough params', 400);
  }

  const converted = convertFromHTML(text, undefined, extendedBlockRenderMap);

  const draftState = ContentState.createFromBlockArray(
    converted.contentBlocks,
    converted.entityMap,
  );

  ctx.body = {
    text: JSON.stringify(convertToRaw(draftState)),
  };

  await next();
}
