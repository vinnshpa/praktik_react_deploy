import { Key, User, Lock, Coins, ChevronRight } from 'lucide-react';

const inp = 'w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-base sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-pink-500 transition-colors';

export default function LoginForm({ username, password, onUser, onPass, onCoin, onSubmit }) {
  return (
    <div className="w-full max-w-sm bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <Key className="w-5 h-5 text-pink-400" />
          <h3 className="font-bold text-sm text-slate-200">QUICK LOGIN FORM</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">USER ID / USERNAME</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" value={username} onChange={(e) => onUser(e.target.value)} placeholder="e.g. Calvin" className={inp} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">PASSWORD / PIN (CREDITS)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="password" value={password} onChange={(e) => onPass(e.target.value)} placeholder="••••••••" className={inp} />
            </div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div className="text-[11px] font-bold text-slate-400 mb-2 flex justify-between items-center">
              <span>CREDIT WALLET</span><span className="text-yellow-400 font-extrabold">¤100 CHIPS</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((c) => (
                <button key={c} type="button" onClick={onCoin} className="flex-1 py-2 rounded-lg bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 border border-yellow-200 text-amber-950 font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1">
                  <Coins className="w-3.5 h-3.5" /> 100
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button type="button" onClick={onSubmit} className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:opacity-90 font-bold text-sm text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all">
        <span>LOGIN & DISPENSE</span><ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
