import { useState } from 'react';
import { Volume2, VolumeX, Coffee, CloudRain } from 'lucide-react';
import { sfx } from './audio';
import { DRINKS } from './data';
import VendingMachine from './components/VendingMachine';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import CanModal from './components/CanModal';

const toggle = (on, c) => `p-2 rounded-lg border transition-all text-xs flex items-center gap-1.5 ${on ? c : 'border-slate-800 bg-slate-900/60 text-slate-500'}`;

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [drink, setDrink] = useState(DRINKS[0]);
  const [coins, setCoins] = useState(0);
  const [tab, setTab] = useState('username');
  const [appState, setAppState] = useState('idle'); // idle | dispensing | dropped | zoomed | opened | dashboard
  const [sound, setSound] = useState(true);
  const [rain, setRain] = useState(true);
  const [error, setError] = useState('');
  const [coinAnim, setCoinAnim] = useState(false);
  const [sip, setSip] = useState(100);

  const fx = (t) => sound && sfx[t]();

  const insertCoin = () => {
    fx('coin');
    setCoinAnim(true);
    setCoins((c) => c + 1);
    setTimeout(() => setCoinAnim(false), 400);
  };

  const press = (v) => {
    fx('keypad');
    setError('');
    const user = tab === 'username';
    const set = user ? setUsername : setPassword;
    const max = user ? 12 : 10;
    const cur = user ? username : password;
    if (v === 'DEL') set((p) => p.slice(0, -1));
    else if (v === 'CLR') set('');
    else if (cur.length < max) {
      set((p) => p + v);
      if (!user) insertCoin();
    }
  };

  const coinClick = () => {
    if (appState !== 'idle') return;
    insertCoin();
    if (password.length < 10) setPassword((p) => p + '•');
  };

  const submit = () => {
    if (!username.trim()) { setError('ENTER USERNAME / ID'); return fx('keypad'); }
    if (!password) { setError('INSERT CHIP OR PIN'); return fx('keypad'); }
    setError('');
    setAppState('dispensing');
    setTimeout(() => { fx('drop'); setAppState('dropped'); }, 1200);
  };

  const openCan = () => {
    fx('pop');
    setAppState('opened');
    setTimeout(() => setAppState('dashboard'), 1200);
  };

  const logout = () => {
    fx('keypad');
    setUsername(''); setPassword(''); setCoins(0); setSip(100);
    setAppState('idle');
  };

  const sipDrink = () => { fx('pop'); setSip((s) => Math.max(0, s - 25)); };

  const machine = {
    drink, setDrink, tab, setTab, username, password, coins, coinAnim, error, appState, fx,
    press, coinClick, submit, retrieve: () => setAppState('zoomed'),
    returnCoins: () => { fx('coin'); setCoins(0); setPassword(''); },

    // BARU: dipakai input di LCD (keyboard HP / desktop)
    onUser: (v) => { setError(''); setUsername(v.slice(0, 12)); },
    onPass: (v) => {
      setError('');
      if (v.length > password.length) insertCoin();
      setPassword(v.slice(0, 10));
    },
  };

  return (
    <div className="relative min-h-dvh bg-slate-950 text-slate-100 flex flex-col items-center justify-between font-mono overflow-x-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-black pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      {rain && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] bg-[length:2px_80px] animate-[rain_0.8s_linear_infinite]" />
        </div>
      )}

      <div className="absolute top-6 left-6 hidden lg:flex flex-col gap-3 pointer-events-none opacity-80">
        <div className="px-3 py-1.5 border border-pink-500/40 bg-pink-950/30 text-pink-400 font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(236,72,153,0.3)] rounded">VENDING UNIT • 24HR OPEN</div>
        <div className="px-3 py-1 border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-[10px] tracking-wider rounded">SECTOR 7 NIGHT ALLEY</div>
      </div>

      <header className="relative z-20 w-full max-w-5xl px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-violet-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400">NEONVEND LOGIN</h1>
            <p className="text-[10px] text-slate-400">AUTHENTICATION VENDING SYSTEM v3.0</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setRain(!rain)} title="Toggle Rain" className={toggle(rain, 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]')}>
            <CloudRain className="w-4 h-4" /><span className="hidden sm:inline">RAIN</span>
          </button>
          <button onClick={() => setSound(!sound)} title="Toggle SFX" className={toggle(sound, 'border-pink-500/50 bg-pink-950/40 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.2)]')}>
            {sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{sound ? 'SOUND ON' : 'MUTED'}</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 my-auto py-6 px-4 w-full flex flex-col items-center justify-center">
        {appState === 'dashboard' ? (
          <Dashboard drink={drink} username={username} coins={coins} sip={sip} onSip={sipDrink} onLogout={logout} />
        ) : (
          <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-6 items-center justify-center">
            <VendingMachine m={machine} />
            <LoginForm
              username={username} password={password}
              onUser={(v) => { setUsername(v); setTab('username'); }}
              onPass={(v) => { setTab('password'); if (v.length > password.length) insertCoin(); setPassword(v); }}
              onCoin={coinClick} onSubmit={submit}
            />
          </div>
        )}
      </main>

      {(appState === 'zoomed' || appState === 'opened') && (
        <CanModal drink={drink} username={username} opened={appState === 'opened'} onOpen={openCan} />
      )}

      <footer className="relative z-20 w-full max-w-5xl px-3 sm:px-6 py-3 border-t border-slate-900 text-center text-[11px] text-slate-500">
        NEONVEND AUTHENTICATION SYSTEM • CYBERPUNK EDITION • REACT + TAILWIND + CALVIN COPYRIGHT
      </footer>
    </div>
  );
}
