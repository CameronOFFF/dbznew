import { SparklesIcon } from "@heroicons/react/24/solid";

const PlayerCard = () => {
  return (
    <div className="glow-card p-5 space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-nebula-600 flex items-center justify-center">
          <SparklesIcon className="h-8 w-8 text-glow-400" />
        </div>
        <div>
          <p className="text-lg font-semibold">Kael Orion</p>
          <p className="text-sm text-nebula-200">Classe: Aurion · Nível 12</p>
        </div>
      </div>
      <div className="space-y-2 text-sm text-nebula-200">
        <div className="flex justify-between">
          <span>HP</span>
          <span>820 / 920</span>
        </div>
        <div className="flex justify-between">
          <span>KI</span>
          <span>300 / 420</span>
        </div>
        <div className="flex justify-between">
          <span>Stamina</span>
          <span>120 / 150</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <span>Força: 48</span>
          <span>Defesa: 34</span>
          <span>Velocidade: 29</span>
          <span>Resistência: 41</span>
        </div>
        <div className="flex justify-between text-xs text-glow-400">
          <span>Zeni: 12.450</span>
          <span>Gemas: 45</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
