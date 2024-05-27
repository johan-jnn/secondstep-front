export function getContentOfFirstParagraph(dom: string) {
  const content = /<(?<tag>p).*?>(?<content>.*?)<\/\k<tag>>/.exec(dom)?.groups
    ?.content;
  if (!content) return null;

  return content;
}
