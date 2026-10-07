import { Coins, Flame, RefreshCw, Zap } from 'lucide-react';
import { DRINKS, KEYS } from '../data';

export default function VendingMachine({ m }) {
  const { drink, tab, username, password, coins, coinAnim, error, appState } = m;
  const busy = appState === 'dispensing';
  const tabBtn = (id, label) => (
    <button type="button" onClick={() => { m.fx('keypad'); m.setTab(id); }}
      className={`py-2 sm:py-1 text-[10px] sm:text-[9px] font-bold rounded ${tab === id ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-white'}`}>{label}</button>
  );

  return (
    <div className={`relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-zinc-950 border-4 border-slate-700 rounded-3xl p-3 sm:p-5 shadow-[0_0_50px_rgba(15,23,42,0.9)] ${busy ? 'animate-[bounce_0.2s_infinite]' : ''}`}>
      {/* Canopy */}
      <div className="relative mb-4 p-3 rounded-2xl bg-gradient-to-r from-pink-900/60 via-purple-900/60 to-cyan-900/60 border border-slate-600 flex items-center justify-between overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-transparent to-cyan-500/20 animate-pulse" />
        <div className="relative z-10 flex items-center gap-2">
          <Flame className="w-5 h-5 text-pink-400 animate-bounce" />
          <div>
            <div className="text-xs font-black tracking-widest text-pink-300">COLD • HOT</div>
            <div className="text-[10px] text-cyan-300">NEON DRINKS VENDING</div>
          </div>
        </div>
        <span className="relative z-10 px-2 py-0.5 bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 text-[10px] rounded font-bold">¤100 CHIP OK</span>
      </div>

      {/* Shelf */}
      <div className="relative mb-4 p-3 bg-slate-950/90 border-2 border-slate-800 rounded-xl shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-xl" />
        <div className="text-[10px] text-slate-500 mb-2 font-bold tracking-wider flex justify-between">
          <span>SELECT DRINK</span><span className="text-pink-400">PILIH MINUMAN</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {DRINKS.map((d) => {
            const sel = drink.id === d.id;
            return (
              <button key={d.id} type="button" onClick={() => { m.fx('keypad'); m.setDrink(d); }}
                className={`relative flex flex-col items-center p-1 sm:p-1.5 rounded-lg border transition-all ${sel ? 'bg-slate-800/90 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)] scale-105' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}>
                <div className={`w-8 h-12 rounded bg-gradient-to-b ${d.color} border border-white/20 flex flex-col items-center justify-between p-0.5 shadow-md`}>
                  <div className="text-[8px] text-white font-black">{d.id}</div>
                  <div className="text-sm">{d.icon}</div>
                  <div className="w-full h-1 bg-white/30 rounded-full" />
                </div>
                <div className="mt-1.5 text-center">
                  <span className={`text-[8px] px-1 rounded font-bold ${d.badge === 'HOT' ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-300'}`}>{d.badge}</span>
                  <div className="text-[10px] font-extrabold text-amber-300 mt-0.5">¤{d.price}</div>
                </div>
                {sel && <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-pink-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">✓</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* LCD + Keypad */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-4">
        <div className="sm:col-span-7 bg-emerald-950/40 border-2 border-emerald-600/40 rounded-xl p-3 shadow-[0_0_15px_rgba(16,185,129,0.15)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-[10px] text-emerald-400 font-bold border-b border-emerald-800/60 pb-1 mb-2">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> LCD DISPLAY</span>
              <span>SYSTEM READY</span>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] text-emerald-600">{tab === 'username' ? '> ENTER USER ID:' : '> INSERT CHIPS / PIN:'}</div>
              <div className="bg-black/60 p-1.5 rounded border border-emerald-800/80 text-xs text-emerald-300 min-h-[28px] break-all flex items-center">
                {tab === 'username'
                  ? username || <span className="animate-pulse text-emerald-700">_Type_Username</span>
                  : password ? '•'.repeat(password.length) : <span className="animate-pulse text-emerald-700">_Insert_Chips</span>}
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px]">
            {error
              ? <span className="text-red-400 font-bold bg-red-950/60 px-1.5 py-0.5 rounded border border-red-500/40 animate-bounce block text-center">⚠️ {error}</span>
              : <span className="text-emerald-500/80">SELECTED: {drink.name} (¤{drink.price})</span>}
          </div>
        </div>

        <div className="sm:col-span-5 bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            {tabBtn('username', 'USER ID')}{tabBtn('password', 'CHIP/PIN')}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {KEYS.map((k) => (
              <button key={k} type="button" onClick={() => m.press(k)}
                className={`py-2.5 sm:py-1.5 text-xs sm:text-[10px] font-bold rounded border shadow transition-all active:scale-90 ${k === 'CLR' || k === 'DEL' ? 'bg-rose-950/60 border-rose-800 text-rose-300 hover:bg-rose-900' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-500'}`}>{k}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Chip slot */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-slate-950/90 border border-slate-800 rounded-2xl p-3">
        <div className="sm:col-span-6 flex items-center gap-2 sm:border-r border-slate-800 sm:pr-2">
          <div onClick={m.coinClick} className="cursor-pointer group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 p-2 rounded-xl border border-slate-700 transition-all hover:border-yellow-500/50">
            <div className={`w-3 h-8 rounded-full border flex items-center justify-center transition-all ${coinAnim ? 'bg-yellow-400 border-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.8)]' : 'bg-slate-800 border-slate-600'}`}>
              <div className="w-1 h-5 bg-black rounded-full" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-300 group-hover:text-yellow-400 flex items-center gap-1"><Coins className="w-3 h-3 text-yellow-400" /> CHIP SLOT</div>
              <div className="text-[9px] text-slate-500">TAP TO INSERT ¤100</div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-6 flex items-center justify-between pl-1">
          <div>
            <div className="text-[9px] text-slate-400">CREDITS DEPOSITED</div>
            <div className="text-sm font-black text-yellow-400">¤{coins * 100}</div>
          </div>
          <button type="button" onClick={m.returnCoins} title="Return Chips" className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tray */}
      <div className="mt-4">
        <div className="text-[9px] text-slate-500 mb-1 text-center font-bold tracking-widest">BEVERAGE RETRIEVAL TRAY</div>
        <div className="relative h-24 bg-zinc-950 border-2 border-slate-700 rounded-2xl p-2 flex items-center justify-center overflow-hidden shadow-inner">
          <div className="absolute inset-x-2 top-0 h-1 bg-slate-800" />
          {appState === 'idle' || busy ? (
            <button type="button" onClick={m.submit} disabled={busy}
              className={`w-full h-full rounded-xl border-2 font-black tracking-widest text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${busy ? 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse' : 'bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 border-pink-400 text-white hover:brightness-110 shadow-[0_0_20px_rgba(236,72,153,0.4)] active:scale-[0.98]'}`}>
              <Zap className="w-5 h-5 fill-current" /><span>{busy ? 'DISPENSING...' : 'PUSH'}</span>
            </button>
          ) : (
            <div onClick={m.retrieve} className="cursor-pointer group flex items-center gap-3 bg-slate-900/90 border border-pink-500/50 p-2 rounded-xl w-full h-full animate-[bounce_0.6s_ease-out] hover:border-pink-400">
              <div className={`w-10 h-16 rounded bg-gradient-to-b ${drink.color} border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                <span className="text-xl">{drink.icon}</span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-black text-pink-400 tracking-wider">CLUNK! CAN DROPPED</div>
                <div className="text-sm font-bold text-white">{drink.name}</div>
                <div className="text-[10px] text-cyan-300 animate-pulse">CLICK TO PICK UP 🥤</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
