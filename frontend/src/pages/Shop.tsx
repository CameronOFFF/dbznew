import SidebarMenu from "../components/SidebarMenu";

const Shop = () => {
  return (
    <div className="min-h-screen bg-nebula-900 px-6 py-8">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[280px_1fr]">
        <SidebarMenu />
        <div className="glow-card p-6 space-y-4">
          <h1 className="text-2xl font-bold">Loja Estelar</h1>
          <p className="text-nebula-200 text-sm">
            Itens compráveis com Zeni e Gemas, incluindo cosméticos e pacotes.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-nebula-700/60 p-4">
              <h2 className="font-semibold">Essência Prismática</h2>
              <p className="text-xs text-nebula-300">Consumível · 200 Zeni</p>
            </div>
            <div className="rounded-xl bg-nebula-700/60 p-4">
              <h2 className="font-semibold">Manopla de Aether</h2>
              <p className="text-xs text-nebula-300">Equipamento · 4 Gemas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
