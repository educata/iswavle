export function removePreAndHtmlTags(content: string) {
  return content
    .replace(/<pre>.*?<\/pre>/gs, '')
    .replace(/<(\w+)([^>]*data-search-ignore[^>]*)>([\s\S]*?)<\/\1>/gi, '')
    .replace(/<\/?[^>]*>/g, '')
    .replace(/<[^>]*data-search-ignore[^>]*\s*\/?>/gi, '')
    .replaceAll('\n', ' ');
}
