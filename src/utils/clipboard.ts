export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

/**
 * Copy HTML as rich text so it pastes as formatted content in Outlook, Gmail, etc.
 * Falls back to selecting a rendered div and using execCommand('copy') for older browsers.
 */
export async function copyRichTextToClipboard(html: string, plainText: string): Promise<void> {
  // Modern API: ClipboardItem with text/html + text/plain
  if (navigator.clipboard?.write && typeof ClipboardItem !== 'undefined') {
    const htmlBlob = new Blob([html], { type: 'text/html' });
    const textBlob = new Blob([plainText], { type: 'text/plain' });
    await navigator.clipboard.write([
      new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob }),
    ]);
    return;
  }
  // Fallback: render into a hidden div, select it, execCommand('copy')
  const el = document.createElement('div');
  el.innerHTML = html;
  el.style.position = 'fixed';
  el.style.left = '-9999px';
  el.style.top = '0';
  el.contentEditable = 'true';
  document.body.appendChild(el);
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
  document.execCommand('copy');
  sel?.removeAllRanges();
  document.body.removeChild(el);
}
