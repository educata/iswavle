export function tableRenderer(header: string, body: string): string {
  return `<div class="table-wrapper"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
}
