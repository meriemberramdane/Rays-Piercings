import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth";
import { RingMark } from "../components/RingMark";

export function AdminLogin() {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(password);
    if (!ok) {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <RingMark size={36} className="mb-4" />
          <h1 className="font-display text-2xl text-white">Rays Piercing</h1>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone-faint mt-2">
            Espace admin
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-ink-card border border-white/[0.06] p-7"
        >
          <label className="block mb-5">
            <span className="block font-mono text-[10px] uppercase tracking-widest2 text-bone-faint mb-2">
              Mot de passe
            </span>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-bone-faint"
              />
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full rounded-xl bg-ink-soft border border-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder:text-bone-faint focus:border-silver/50 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </label>

          {error && (
            <p className="text-xs text-red-400 mb-4 -mt-2">
              Mot de passe incorrect.
            </p>
          )}

          <button
            type="submit"
            className="w-full px-5 py-3 rounded-full bg-white text-ink text-sm font-medium hover:bg-silver-light transition-colors"
          >
            Se connecter
          </button>
        </form>
      </motion.div>
    </div>
  );
}
