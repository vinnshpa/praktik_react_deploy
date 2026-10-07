import { useState } from 'react';
import { Check, Coffee, LogOut } from 'lucide-react';

export default function Dashboard({ drink, username, coins, sip, onSip, onLogout }) {
  const [receipt] = useState(() => Math.floor(1000 + Math.random() * 9000));
  return (
    <div className="w-full max-w-lg bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-indigo-950/50 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-pink-500/30">{drink.icon}</div>
          <div>
            <div className="text-xs text-pink-400 font-semibold tracking-wider">ACCESS GRANTED</div>
            <h2 className="text-xl font-bold text-white">{username || 'Unknown User'}</h2>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
          <Check className="w-3 h-3" /> AUTHENTICATED
        </span>
      </div>

      <div className="my-6 p-5 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 flex flex-col items-center text-center">
        <div className="text-xs text-slate-400 mb-2">SERVED BEVERAGE</div>
        <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">{drink.name}</div>
        <div className="text-xs text-slate-400 mb-4">{drink.type}</div>

        <div onClick={onSip} className="cursor-pointer group relative w-24 h-40 my-2 rounded-xl bg-gradient-to-b from-amber-600 via-amber-800 to-zinc-900 border-2 border-amber-400/50 flex flex-col items-center justify-between p-2 shadow-xl shadow-amber-900/40 hover:scale-105 transition-transform">
          <div className="w-12 h-2 rounded-full bg-slate-300 border border-slate-400 shadow-inner" />
          <div className="text-3xl my-auto group-hover:rotate-12 transition-transform">{drink.icon}</div>
          <div className="text-[10px] font-bold text-amber-200 tracking-tighter">CLICK TO SIP</div>
          <div className="absolute bottom-0 inset-x-0 bg-amber-500/20 rounded-b-lg transition-all duration-300 pointer-events-none" style={{ height: `${sip}%` }} />
        </div>

        <div className="w-full max-w-xs mt-3">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1"><span>Beverage Remaining</span><span>{sip}%</span></div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
            <div className="bg-gradient-to-r from-pink-500 to-cyan-400 h-full transition-all duration-300" style={{ width: `${sip}%` }} />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-xs space-y-2 mb-6">
        {[
          ['RECEIPT NO:', `#NEON-${receipt}`, 'text-slate-200'],
          ['CREDITS SPENT:', `¤${coins * 100 || drink.price}`, 'text-yellow-400'],
          ['NET REWARD POINTS:', '+150 PTS', 'text-cyan-400'],
        ].map(([k, v, c]) => (
          <div key={k} className="flex justify-between text-slate-400"><span>{k}</span><span className={c}>{v}</span></div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onSip} className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 font-bold text-sm shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all">
          <Coffee className="w-4 h-4" /> DRINK/MINUM
        </button>
        <button onClick={onLogout} className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-xs text-slate-300 flex items-center gap-1.5 active:scale-95 transition-all">
          <LogOut className="w-4 h-4" /> BUANG
        </button>
      </div>
    </div>
  );
}
