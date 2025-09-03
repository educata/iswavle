export function headingRenderer(
  text: string,
  level: number,
  raw: string,
): string {
  return `
    <h${level} id="${raw.trim().split(' ').join('_')}">${text}</h${level}>
  `;
}
