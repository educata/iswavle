import frontMatter from 'front-matter';

import { marked } from 'marked';

export async function renderMarkdownFile<T>(markdown: string): Promise<{
  content: string;
  frontMatter: T;
}> {
  const parsedMarkdown = await marked.parse(
    markdown.replace(/^---$.*^---$/ms, ''),
  );
  const data = frontMatter<T>(markdown);
  return {
    content: parsedMarkdown,
    frontMatter: data.attributes,
  };
}
