export function linkRenderer(
  href: string,
  title: string | null | undefined,
  text: string,
): string {
  const isEmptyLink = !href || href === '#';
  const isExternalLink = href?.startsWith('http') || href?.startsWith('https');
  return `<a ${isEmptyLink ? 'disabled' : `href="${href}"`} ${title ? `title="${title}"` : ''} ${isExternalLink ? 'target="_blank" class="external-link"' : ''}>${text}</a>`;
}
