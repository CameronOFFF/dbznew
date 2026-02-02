import { PrismaClient, ItemCategory, QuestType, SagaDifficulty } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const raceClasses = [
    {
      name: "Aurion",
      description: "Guerreiros de plasma que absorvem luz estelar para ataques explosivos.",
      baseStrength: 7,
      baseDefense: 5,
      baseResilience: 6,
      baseAgility: 5,
      baseSpeed: 4,
      baseEnergy: 120
    },
    {
      name: "Nyxari",
      description: "Assassinos místicos que manipulam sombras e velocidade crítica.",
      baseStrength: 5,
      baseDefense: 4,
      baseResilience: 5,
      baseAgility: 8,
      baseSpeed: 8,
      baseEnergy: 90
    },
    {
      name: "Terrakai",
      description: "Titãs ancestrais com resistência elevada e golpes pesados.",
      baseStrength: 8,
      baseDefense: 8,
      baseResilience: 7,
      baseAgility: 3,
      baseSpeed: 3,
      baseEnergy: 80
    }
  ];

  for (const race of raceClasses) {
    await prisma.raceClass.upsert({
      where: { name: race.name },
      update: {},
      create: race
    });
  }

  const items = [
    {
      name: "Essência Prismática",
      description: "Restaura 30 de KI.",
      category: ItemCategory.CONSUMABLE,
      rarity: "Comum",
      effectJson: { ki: 30 }
    },
    {
      name: "Manopla de Aether",
      description: "Aumenta força em 2.",
      category: ItemCategory.EQUIPMENT,
      rarity: "Raro",
      effectJson: { strength: 2 }
    },
    {
      name: "Fragmento Arcano",
      description: "Material para crafting de armas.",
      category: ItemCategory.MATERIAL,
      rarity: "Comum",
      effectJson: { craft: true }
    }
  ];

  for (const item of items) {
    await prisma.item.create({ data: item });
  }

  await prisma.quest.create({
    data: {
      title: "Ronda de Energia",
      description: "Conclua 1 treino para estabilizar seu KI.",
      questType: QuestType.DAILY,
      objectives: { type: "training", count: 1 },
      rewards: { xp: 120, zeni: 50 }
    }
  });

  await prisma.quest.create({
    data: {
      title: "Coleta de Núcleos",
      description: "Obtenha 3 itens de material.",
      questType: QuestType.WEEKLY,
      objectives: { type: "collect", itemCategory: "MATERIAL", count: 3 },
      rewards: { xp: 450, zeni: 180 }
    }
  });

  await prisma.quest.create({
    data: {
      title: "Duelo de Arena",
      description: "Participe de 1 batalha de arena.",
      questType: QuestType.REPEATABLE,
      objectives: { type: "arena", count: 1 },
      rewards: { xp: 200, gemas: 1 }
    }
  });

  await prisma.sagaChapter.createMany({
    data: [
      {
        title: "Sussurros de Vortex",
        synopsis: "A cidade flutuante perde energia. Você enfrenta os Sentinelas Ônix.",
        minLevel: 1,
        energyCost: 10,
        difficulty: SagaDifficulty.NORMAL,
        rewards: { xp: 200, zeni: 100, item: "Essência Prismática" }
      },
      {
        title: "Coração do Desfiladeiro",
        synopsis: "Um núcleo instável ameaça romper a terra. Derrote o Guardião Terrakai.",
        minLevel: 3,
        energyCost: 15,
        difficulty: SagaDifficulty.NORMAL,
        rewards: { xp: 320, zeni: 140 }
      },
      {
        title: "Prisma Quebrado",
        synopsis: "Sombras Nyxari invadem o conselho. Enfrente a Lâmina Eclipse.",
        minLevel: 5,
        energyCost: 20,
        difficulty: SagaDifficulty.HARD,
        rewards: { xp: 550, gemas: 2 }
      }
    ]
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
