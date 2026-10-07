import { Sparkles } from 'lucide-react';

export default function CanModal({ drink, username, opened, onOpen }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 overflow-y-auto animate-[fadeIn_0.3s_ease-out]">
      <div className="text-center mb-6">
        <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold tracking-widest">YOUR DRINK IS READY!</span>
        <h2 className="text-2xl font-black text-white mt-2">WELCOME BACK, {username || 'USER'}!</h2>
      </div>

      <div onClick={onOpen} className={`cursor-pointer relative w-40 h-72 sm:w-48 sm:h-80 shrink-0 mt-10 rounded-3xl bg-gradient-to-b ${drink.color} border-4 border-amber-300/80 p-4 flex flex-col items-center justify-between shadow-[0_0_80px_rgba(236,72,153,0.5)] transition-all transform hover:scale-105 active:scale-95 ${opened ? 'animate-[bounce_0.5s_infinite]' : ''}`}>
        <div className="w-24 h-4 rounded-full bg-slate-300 border-2 border-slate-400 flex items-center justify-center shadow-inner">
          <div className={`w-6 h-1.5 rounded-full ${opened ? 'bg-amber-900' : 'bg-slate-500'}`} />
        </div>
        <div className="text-center my-auto">
          <div className="text-6xl mb-2">{drink.icon}</div>
          <div className="text-xl font-extrabold text-white tracking-widest">{drink.name}</div>
          <div className="text-xs text-amber-200 mt-1 font-bold">LIMITED EDITION</div>
        </div>
        <div className="w-full py-1.5 bg-black/40 backdrop-blur-sm rounded-xl border border-white/20 text-center text-xs font-bold text-yellow-300 tracking-wider">★ WELCOME BACK ★</div>
        {opened && (
          <div className="absolute -top-12 inset-x-0 flex justify-center gap-2 pointer-events-none">
            <Sparkles className="w-8 h-8 text-cyan-300 animate-bounce" />
            <Sparkles className="w-10 h-10 text-pink-300 animate-pulse" />
            <Sparkles className="w-8 h-8 text-yellow-300 animate-bounce" />
          </div>
        )}
      </div>

      <button onClick={onOpen} className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 font-extrabold text-sm text-white shadow-xl shadow-pink-500/30 flex items-center gap-2 hover:scale-105 transition-all">
        <Sparkles className="w-4 h-4" /> CLICK TO OPEN CAN 🥤
      </button>
    </div>
  );
}
