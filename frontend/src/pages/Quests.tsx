import SidebarMenu from "../components/SidebarMenu";

const Quests = () => {
  return (
    <div className="min-h-screen bg-nebula-900 px-6 py-8">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[280px_1fr]">
        <SidebarMenu />
        <div className="glow-card p-6 space-y-4">
          <h1 className="text-2xl font-bold">Quests & Eventos</h1>
          <p className="text-nebula-200 text-sm">
            Missões diárias, semanais e repetíveis com reset automático.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="rounded-xl bg-nebula-700/60 p-4">Ronda de Energia · +120 XP</li>
            <li className="rounded-xl bg-nebula-700/60 p-4">Coleta de Núcleos · +180 Zeni</li>
            <li className="rounded-xl bg-nebula-700/60 p-4">Duelo de Arena · +1 Gema</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Quests;
