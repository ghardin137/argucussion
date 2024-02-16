export enum Race {
    Human,
    Elf,
    Vampire,
    Werewolf,
    Giant, 
    Goblin,
    Merfolk,
    Orc,
    Dwarf,
    Fae,
    Dragon,
    Zombie,
    Golem,
    Ghost,
}

export type PlayerRace = Race.Human | Race.Elf | Race.Vampire | Race.Werewolf

export enum CharacterType {
    Player,
    NPC,
}

export enum StatType {
    Charm = "charm",
    Imagery = "imagery",
    Insight = "insight",
    Intuition = "intuition",
    Observation = "observation",
    Wit = "wit",
}

export type Stat = {
    type: StatType;
    counter: StatType;
    description: string;
}

export interface Character {
    name: string;
    charm: number;
    imagery: number;
    insight: number;
    intuition: number;
    observation: number;
    wit: number;
    health: number;
}

export interface PlayerType extends Character {
    type: CharacterType.Player;
    race: PlayerRace;
}

export interface NPCType extends Character {
    type: CharacterType.NPC;
    race: Race;
}