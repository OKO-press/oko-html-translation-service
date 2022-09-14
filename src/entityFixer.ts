import { getInternalLinkSlug } from "./helpers";
import type  { RawDraftContentState } from "draft-js";

interface Data {
  [name: string]: string
}

export const entityFixer = (json: RawDraftContentState):  RawDraftContentState => {
  const {entityMap} = json;

  Object.keys(entityMap).forEach(function(key, index) {
    const {type} = entityMap[key];

    switch(type) {
      case "LINK":
        entityMap[key].data = fixLink(entityMap[key].data);
    }
  });

  return json;
}


const fixLink = (data: Data): Data => {
  const {url} = data;
  const newData = {} as Data;

  const slug = getInternalLinkSlug(url);

  if (typeof slug == "string") {
    newData.type = "LEGACY_INTERNAL";
    newData.slug = slug;
    newData.target = "_blank";
  } else {
    newData.type = "EXTERNAL";
    newData.href = url;
    newData.target = "_blank";
    newData.rel = "nofollow";
  }

  return newData;
}
