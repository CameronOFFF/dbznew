import SidebarMenu from "../components/SidebarMenu";

const Sagas = () => {
  return (
    <div className="min-h-screen bg-nebula-900 px-6 py-8">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[280px_1fr]">
        <SidebarMenu />
        <div className="glow-card p-6 space-y-4">
          <h1 className="text-2xl font-bold">Sagas Originais</h1>
          <p className="text-nebula-200 text-sm">
            Capítulos narrativos com cutscenes curtas e chefes exclusivos.
          </p>
          <div className="grid gap-3">
            <div className="rounded-xl bg-nebula-700/60 p-4">
              <h2 className="font-semibold">Sussurros de Vortex</h2>
              <p className="text-xs text-nebula-300">Requisito: nível 1 · Dificuldade normal</p>
            </div>
            <div className="rounded-xl bg-nebula-700/60 p-4">
              <h2 className="font-semibold">Coração do Desfiladeiro</h2>
              <p className="text-xs text-nebula-300">Requisito: nível 3 · Dificuldade normal</p>
            </div>
            <div className="rounded-xl bg-nebula-700/60 p-4">
              <h2 className="font-semibold">Prisma Quebrado</h2>
              <p className="text-xs text-nebula-300">Requisito: nível 5 · Dificuldade difícil</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sagas;
