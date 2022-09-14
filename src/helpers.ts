export const getInternalLinkSlug = (href: string): boolean|string => {
  const match = href.match(/^https?:\/\/oko.press\/(?<slug>[\w\/-]+)?/ui);
  return match == null ? false : match.groups.slug;
};
