export type Combatant = {
  name: string;
  strength: number;
  defense: number;
  agility: number;
  speed: number;
  critChance: number;
  critDamage: number;
  hp: number;
};

export type CombatRound = {
  attacker: string;
  defender: string;
  baseDamage: number;
  crit: boolean;
  finalDamage: number;
};

export type CombatResult = {
  winner: string;
  rounds: CombatRound[];
};

const variance = () => 0.9 + Math.random() * 0.2;

const computeDamage = (attacker: Combatant, defender: Combatant) => {
  const attackScore = attacker.strength * 1.4 + attacker.agility * 0.6;
  const defenseScore = defender.defense * 1.2 + defender.agility * 0.4;
  const raw = Math.max(5, attackScore - defenseScore * 0.7);
  const crit = Math.random() < attacker.critChance + attacker.speed * 0.002;
  const damage = raw * (crit ? attacker.critDamage : 1) * variance();
  return { damage: Math.round(damage), crit, baseDamage: Math.round(raw) };
};

export const simulateAutoBattle = (a: Combatant, b: Combatant): CombatResult => {
  const rounds: CombatRound[] = [];
  let attacker = { ...a };
  let defender = { ...b };
  let initiative = attacker.speed >= defender.speed ? 0 : 1;

  while (attacker.hp > 0 && defender.hp > 0 && rounds.length < 30) {
    const act = initiative === 0 ? attacker : defender;
    const def = initiative === 0 ? defender : attacker;
    const { damage, crit, baseDamage } = computeDamage(act, def);
    def.hp = Math.max(0, def.hp - damage);
    rounds.push({
      attacker: act.name,
      defender: def.name,
      baseDamage,
      crit,
      finalDamage: damage
    });
    initiative = initiative === 0 ? 1 : 0;
  }

  const winner = attacker.hp > defender.hp ? attacker.name : defender.name;
  return { winner, rounds };
};
