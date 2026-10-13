const frame = document.querySelector('.iam-anatomy-frame');
window.addEventListener('message', (event) => {
  if (!frame || event.source !== frame.contentWindow || event.origin !== window.location.origin) return;
  if (event.data?.type !== 'iam-anatomy-height' || !Number.isFinite(event.data.height)) return;
  frame.style.height = `${Math.max(400, Math.min(15000, event.data.height + 8))}px`;
});
