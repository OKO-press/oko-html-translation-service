import { TranslationRequest } from "./types";

export const getInternalLinkSlug = (href: string): boolean | string => {
  const match = href.match(/^https?:\/\/oko.press\/(?<slug>(\/?[\w-]+)+)/iu);
  return match == null ? false : match.groups.slug;
};

export const hasFileExtension = (href: string) =>
  !!href.match(/\.(\w{3,4})$/iu);

export const isProperTranslateBody = (body: any): body is TranslationRequest =>
  "text" in body;
