let ctx;
const ac = () => {
  ctx ||= new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
};

const blip = (oscs, dur, vol) => {
  const a = ac(), t = a.currentTime, g = a.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  g.connect(a.destination);
  oscs.forEach(([type, f0, f1]) => {
    const o = a.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    o.connect(g); o.start(); o.stop(t + dur);
  });
};

const hiss = () => {
  const a = ac(), t = a.currentTime, n = a.sampleRate * 0.35;
  const buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  const src = a.createBufferSource(); src.buffer = buf;
  const f = a.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 3200; f.Q.value = 2.5;
  const g = a.createGain();
  g.gain.setValueAtTime(0.35, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  src.connect(f); f.connect(g); g.connect(a.destination); src.start();
};

export const sfx = {
  keypad: () => blip([['sine', 900 + Math.random() * 150]], 0.06, 0.12),
  coin: () => blip([['sine', 2400, 1800], ['triangle', 3600, 2200]], 0.22, 0.25),
  drop: () => blip([['sawtooth', 160, 25]], 0.5, 0.5),
  pop: hiss,
};
