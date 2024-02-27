import { PlayerType, NPCType, CharacterType, Race } from '../types'

export const Player: PlayerType = {
    name: "Player",
    type: CharacterType.Player,
    race: Race.Human,
    charm: 5 + Math.floor(Math.random() * 3),
    imagery: 5 + Math.floor(Math.random() * 3),
    insight: 5 + Math.floor(Math.random() * 3),
    intuition: 5 + Math.floor(Math.random() * 3),
    observation: 5 + Math.floor(Math.random() * 3),
    wit: 5 + Math.floor(Math.random() * 3),
    health: 100,
}

export const NPC: NPCType = {
    name: "NPC",
    type: CharacterType.NPC,
    race: Race.Goblin,
    charm: 5 + Math.floor(Math.random() * 3),
    imagery: 5 + Math.floor(Math.random() * 3),
    insight: 5 + Math.floor(Math.random() * 3),
    intuition: 5 + Math.floor(Math.random() * 3),
    observation: 5 + Math.floor(Math.random() * 3),
    wit: 5 + Math.floor(Math.random() * 3),
    health: 100,
}


