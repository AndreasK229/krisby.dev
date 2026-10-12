// Only the sandboxed figure can request a height change; no tenant data is exchanged.
const frame = document.querySelector('.anatomy-frame');
window.addEventListener('message', (event) => {
  if (event.source !== frame?.contentWindow || event.data?.type !== 'anatomy-height') return;
  const height = event.data.height;
  if (Number.isFinite(height) && height >= 200 && height <= 1600) frame.style.height = `${height}px`;
});
