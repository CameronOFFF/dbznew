import { useState } from "react";

const tabs = ["Arena", "Quests", "Sagas"];

const ContentTabs = () => {
  const [active, setActive] = useState(tabs[0]);
  return (
    <div className="glow-card p-5 space-y-4">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`rounded-full px-4 py-1 text-xs uppercase tracking-widest transition ${
              active === tab ? "bg-glow-400 text-nebula-900" : "bg-nebula-700 text-nebula-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="text-sm text-nebula-200">
        {active === "Arena" && "Entre na Arena Prisma e desafie rivais com recompensas sazonais."}
        {active === "Quests" && "Complete missões diárias, semanais e repetíveis para evoluir."}
        {active === "Sagas" && "Avance por capítulos originais com cutscenes e chefes únicos."}
      </div>
    </div>
  );
};

export default ContentTabs;
