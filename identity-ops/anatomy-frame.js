// Only the sandboxed figure can request a height change; no tenant data is exchanged.
const frames = [...document.querySelectorAll('.anatomy-frame')];
window.addEventListener('message', (event) => {
  const frame = frames.find((candidate) => candidate.contentWindow === event.source);
  if (!frame || event.data?.type !== 'anatomy-height') return;
  const height = event.data.height;
  if (Number.isFinite(height) && height >= 200 && height <= 1600) frame.style.height = `${height}px`;
});
