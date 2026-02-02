import { describe, expect, it } from "vitest";
import { simulateAutoBattle } from "../services/combat.js";

describe("simulateAutoBattle", () => {
  it("returns a winner and rounds", () => {
    const result = simulateAutoBattle(
      {
        name: "A",
        strength: 10,
        defense: 6,
        agility: 4,
        speed: 7,
        critChance: 0.2,
        critDamage: 1.5,
        hp: 100
      },
      {
        name: "B",
        strength: 8,
        defense: 8,
        agility: 6,
        speed: 5,
        critChance: 0.1,
        critDamage: 1.4,
        hp: 100
      }
    );

    expect(result.winner).toBeDefined();
    expect(result.rounds.length).toBeGreaterThan(0);
  });
});
