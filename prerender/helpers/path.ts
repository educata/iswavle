export function normalizePath(path: string): string {
  return path
    .replaceAll('\\', '/')
    .replaceAll('src/assets', 'doc')
    .replaceAll('.md', '');
}
