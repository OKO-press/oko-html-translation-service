import { ContentState, convertToRaw, DefaultDraftBlockRenderMap } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import Immutable from "immutable";
import { widgetConverter, horizontalLineConverter } from "./converters";
import { entityFixer } from "./entityFixer";
import { Ctx, Next } from "./types";
import { isProperTranslateBody } from "./helpers";

// Custom render map
const blockRenderMap = Immutable.Map({
  atomic: {
    element: "widget",
  },
});

DefaultDraftBlockRenderMap.merge(blockRenderMap);

export default async function(ctx: Ctx, next: Next) {
  const { body } = ctx.request;

  if (!isProperTranslateBody(body)) {
    ctx.throw(400, "Not enough params");
  }

  // @ts-ignore
  const converted = htmlToDraft(body.text, (nodeName, node) => {
    switch (nodeName) {
      case "widget":
        return widgetConverter(node);
      case "hr":
        return horizontalLineConverter(node);
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
