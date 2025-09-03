function registerCustomBlocks(text: string) {
  const block = text.split('\n')[0].replace(':::', '') || '';

  switch (block.toLocaleLowerCase()) {
    case 'success': {
      return `<div class="note ant-alert ant-alert-success">${text.slice(11, -4)}</div>`;
    }
    case 'warning': {
      return `<div class="note ant-alert ant-alert-warning">${text.slice(11, -4)}</div>`;
    }
    case 'error': {
      return `<div class="note ant-alert ant-alert-error">${text.slice(9, -4)}</div>`;
    }
    case 'info': {
      return `<div class="note ant-alert ant-alert-info">${text.slice(8, -4)}</div>`;
    }
    case '': {
      return `<div class="note ant-alert ant-alert-info">${text.slice(4, -4)}</div>`;
    }
  }

  return text;
}

export function paragraphRenderer(text: string): string {
  if (text.startsWith(':::') && text.endsWith(':::')) {
    return registerCustomBlocks(text);
  }
  return `<p>${text}</p>`;
}
