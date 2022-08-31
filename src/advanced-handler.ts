import { ContentState, convertToRaw, DefaultDraftBlockRenderMap } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import Immutable from "immutable";
import { widgetConverter } from "./converters";
import { entityFixer } from "./entityFixer";
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

  // @ts-ignore
  const converted = htmlToDraft(text, (nodeName, node) => {
    switch (nodeName) {
      case "widget":
        return widgetConverter(node);
      default:
        return false;
    }
  });

  const draftState = ContentState.createFromBlockArray(
    converted.contentBlocks,
    converted.entityMap,
  );

  ctx.body = {
    text: JSON.stringify(entityFixer(convertToRaw(draftState))),
  };

  await next();
}
