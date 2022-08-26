import { convertFromHTML, ContentState, convertToRaw, DefaultDraftBlockRenderMap } from "draft-js";
import htmlToDraft from "html-to-draftjs";
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

  // @ts-ignore
  const converted = htmlToDraft(text, (nodeName, node) => {
    if (nodeName === 'widget') {

      const attrs = new Map();

      for (const attr of node.attributes) {
        attrs.set(attr.name, attr.value)
      }

      return {
        type: 'atomic',
        // mutability: 'MUTABLE',
        data: Object.fromEntries(attrs.entries())
      };
    }
  });

  const draftState = ContentState.createFromBlockArray(
    converted.contentBlocks,
    converted.entityMap,
  );

  ctx.body = {
    text: JSON.stringify(convertToRaw(draftState)),
  };

  await next();
}
