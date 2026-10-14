// Illustrative successful offboarding, with no connection to the lab tenant.
const diagram = document.querySelector('.compact-anatomy');
if (diagram) {
  const button = diagram.querySelector('button');
  const caption = diagram.querySelector('.compact-caption');
  const cards = [...diagram.querySelectorAll('.compact-machine')];
  const states = [...diagram.querySelectorAll('.compact-state')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const steps = [
    [0, '1 / 6 · HR records the departure.'],
    [0, '2 / 6 · The HR change and outbox event commit together.'],
    [1, '3 / 6 · Ascendra pulls the event over authenticated HTTP.'],
    [1, '4 / 6 · Its own database saves the identity and cursor.'],
    [2, '5 / 6 · Microsoft Graph disables the account and revokes sessions.'],
    [2, '6 / 6 · Sync results are recorded; reconciliation checks for drift.'],
  ];
  let step = 0;
  let playing = false;
  let elapsed = 0;
  let previous;
  let frame;

  function render() {
    cards.forEach((card, index) => card.classList.toggle('is-current', steps[step][0] === index));
    states[0].textContent = step >= 1 ? 'Terminated · outbox event retained' : 'Employee active · HR database';
    states[1].textContent = step >= 3 ? 'Deprovisioned · cursor advanced' : step === 2 ? 'Pulling the HR event feed' : 'Employee active · IGA database';
    states[2].textContent = step === 5 ? 'Account disabled · sessions revoked' : step === 4 ? 'Disable → revoke sessions' : 'Account enabled';
    caption.textContent = steps[step][1];
    diagram.dataset.step = String(step);
    button.textContent = playing ? 'Ⅱ Pause flow' : step === 5 ? '↻ Replay flow' : '▶ Play flow';
    button.setAttribute('aria-pressed', String(playing));
    diagram.classList.toggle('is-playing', playing);
  }

  function setPlaying(value) {
    playing = value;
    previous = undefined;
    cancelAnimationFrame(frame);
    render();
    if (playing) frame = requestAnimationFrame(tick);
  }

  function tick(time) {
    if (previous !== undefined) elapsed += Math.min(time - previous, 100);
    previous = time;
    if (elapsed >= 2800) {
      elapsed = 0;
      if (step === 5) { setPlaying(false); return; }
      step++;
      render();
    }
    diagram.style.setProperty('--packet-progress', String(motion.matches ? 0 : elapsed / 2800));
    frame = requestAnimationFrame(tick);
  }

  button.addEventListener('click', () => {
    if (!playing && step === 5) { step = 0; elapsed = 0; }
    setPlaying(!playing);
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) setPlaying(false); });
  motion.addEventListener('change', () => { setPlaying(false); diagram.style.setProperty('--packet-progress', '0'); });
  render();
}
