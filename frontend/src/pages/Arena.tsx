import SidebarMenu from "../components/SidebarMenu";

const Arena = () => {
  return (
    <div className="min-h-screen bg-nebula-900 px-6 py-8">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[280px_1fr]">
        <SidebarMenu />
        <div className="glow-card p-6 space-y-4">
          <h1 className="text-2xl font-bold">Arena Prisma</h1>
          <p className="text-nebula-200 text-sm">
            PvP assíncrono com snapshots de status, ELO sazonal e proteção anti-farm.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-nebula-700/60 p-4">
              <p className="text-sm">Cooldown de desafios: 15 min</p>
              <p className="text-xs text-nebula-300">Proteção contra ataques repetidos.</p>
            </div>
            <div className="rounded-xl bg-nebula-700/60 p-4">
              <p className="text-sm">Top 5 Atual</p>
              <p className="text-xs text-nebula-300">Lyra Nova · 1720 ELO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;
