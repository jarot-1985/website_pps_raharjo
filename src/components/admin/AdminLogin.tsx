import React from "react";
import { Lock } from "lucide-react";
import type { RpsUnit } from "../../types";

interface AdminLoginProps {
  selectedRole: RpsUnit;
  setSelectedRole: (role: RpsUnit) => void;
  password: string;
  setPassword: (pwd: string) => void;
  loginError: string;
  onLogin: (e: React.FormEvent) => void;
}

export function AdminLogin({
  selectedRole,
  setSelectedRole,
  password,
  setPassword,
  loginError,
  onLogin
}: AdminLoginProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in font-serif" id="admin-login-screen">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Lock className="w-12 h-12 text-slate-900 mx-auto" />
          <h2 className="text-2xl font-serif font-bold text-neutral-900 tracking-tight">Admin Portal PPS Raharjo</h2>
          <p className="text-xs text-slate-500 uppercase tracking-widest">Kelola Halaman Publik & Konten</p>
        </div>

        <form onSubmit={onLogin} className="bg-white border-2 border-neutral-200 rounded-3xl p-8 space-y-5 shadow-md">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Role Admin</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as RpsUnit)}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="PPS">Admin PPS Raharjo (PPS)</option>
              <option value="Pamardi Siwi">Admin RPS Pamardi Siwi (Anak)</option>
              <option value="Mojomulyo">Admin RPS Mojomulyo (Lansia)</option>
              <option value="Gondang">Admin RPS Gondang (PMKS)</option>
              <option value="PPS_Raharjo">Admin PPS Raharjo (Disabilitas Intelektual)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password Admin</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Petunjuk: adminraharjo"
            />
            {loginError && (
              <p className="text-xs text-rose-600 font-bold mt-2">{loginError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-xs font-sans font-black uppercase tracking-widest transition cursor-pointer rounded-xl shadow-lg active:scale-95"
          >
            Masuk Sekarang
          </button>
        </form>

        <div className="text-center text-[10px] text-slate-400 font-mono">
          Demo login: <strong>adminraharjo</strong>
        </div>
      </div>
    </div>
  );
}
