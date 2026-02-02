import SidebarMenu from "../components/SidebarMenu";
import PlayerCard from "../components/PlayerCard";
import SearchBar from "../components/SearchBar";
import TopRankWidget from "../components/TopRankWidget";
import ContentTabs from "../components/ContentTabs";

const activities = [
  {
    title: "Arena Prisma",
    description: "Desafios PvP assíncronos com ELO e temporadas.",
    tag: "PvP"
  },
  {
    title: "Missões Kairon",
    description: "Quests diárias e semanais com loot garantido.",
    tag: "Quests"
  },
  {
    title: "Treino AFK",
    description: "Treine KI em tempo real e ganhe bônus de atributo.",
    tag: "Treino"
  },
  {
    title: "Recompensa Diária",
    description: "Calendário de 30 dias com streaks e gemas.",
    tag: "Daily"
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-nebula-900 px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-nebula-300">Avisos da estação 03</p>
            <h2 className="text-2xl font-bold">Portal Estelar ativo por 02d 18h</h2>
          </div>
          <SearchBar />
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr_260px]">
          <div className="space-y-6">
            <div className="glow-card overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-nebula-600 via-nebula-800 to-nebula-900" />
              <div className="p-4">
                <p className="text-xs text-nebula-300">Planeta Vórtex</p>
                <p className="text-sm text-nebula-200">
                  Um mundo suspenso entre tempestades cósmicas e ruínas antigas.
                </p>
              </div>
            </div>
            <PlayerCard />
          </div>

          <main className="space-y-6">
            <ContentTabs />
            <div className="grid gap-4 md:grid-cols-2">
              {activities.map((activity) => (
                <div key={activity.title} className="glow-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{activity.title}</h3>
                    <span className="rounded-full bg-nebula-700 px-3 py-1 text-xs text-nebula-200">
                      {activity.tag}
                    </span>
                  </div>
                  <p className="text-sm text-nebula-200">{activity.description}</p>
                  <button className="rounded-xl bg-glow-400 px-4 py-2 text-xs font-semibold text-nebula-900">
                    Acessar
                  </button>
                </div>
              ))}
            </div>
          </main>

          <div className="space-y-6">
            <SidebarMenu />
            <TopRankWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
