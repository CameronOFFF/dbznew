import SidebarMenu from "../components/SidebarMenu";

const Admin = () => {
  return (
    <div className="min-h-screen bg-nebula-900 px-6 py-8">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[280px_1fr]">
        <SidebarMenu />
        <div className="glow-card p-6 space-y-4">
          <h1 className="text-2xl font-bold">Painel Admin</h1>
          <p className="text-nebula-200 text-sm">
            Controle de usuários, itens, quests e auditoria completa.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-nebula-700/60 p-4 text-sm">
              Ações rápidas: ban, mute, reset stamina.
            </div>
            <div className="rounded-xl bg-nebula-700/60 p-4 text-sm">
              Logs filtráveis por usuário e período.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
