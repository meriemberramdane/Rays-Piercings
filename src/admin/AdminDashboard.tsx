import { useState } from "react";
import { LogOut, ExternalLink } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth";
import { RingMark } from "../components/RingMark";
import { AdminPiercings } from "./pages/AdminPiercings";
import { AdminProducts } from "./pages/AdminProducts";

type Tab = "piercings" | "products";

export function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [tab, setTab] = useState<Tab>("piercings");

  return (
    <div className="min-h-screen bg-ink">
      <header className="border-b border-white/[0.06] sticky top-0 z-20 bg-ink/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <RingMark size={22} />
            <span className="font-display italic text-base text-white">
              Rays Piercings
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-faint ml-1">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-bone-dim hover:text-white transition-colors"
            >
              Voir le site <ExternalLink size={13} />
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 text-xs text-white hover:border-silver/40 transition-colors"
            >
              <LogOut size={13} /> Déconnexion
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 flex gap-2 pb-3">
          <button
            onClick={() => setTab("piercings")}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              tab === "piercings"
                ? "bg-white text-ink"
                : "text-bone-dim hover:text-white"
            }`}
          >
            Piercings
          </button>
          <button
            onClick={() => setTab("products")}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              tab === "products"
                ? "bg-white text-ink"
                : "text-bone-dim hover:text-white"
            }`}
          >
            Boutique
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {tab === "piercings" ? <AdminPiercings /> : <AdminProducts />}
      </main>
    </div>
  );
}
