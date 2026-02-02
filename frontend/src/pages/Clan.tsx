import SidebarMenu from "../components/SidebarMenu";

const Clan = () => {
  return (
    <div className="min-h-screen bg-nebula-900 px-6 py-8">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[280px_1fr]">
        <SidebarMenu />
        <div className="glow-card p-6 space-y-4">
          <h1 className="text-2xl font-bold">Clãs</h1>
          <p className="text-nebula-200 text-sm">
            Crie clãs, convide aliados e acumule benefícios de equipe.
          </p>
          <div className="rounded-xl bg-nebula-700/60 p-4 text-sm">
            Banco do clã disponível para doações e upgrade de buffs.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clan;
