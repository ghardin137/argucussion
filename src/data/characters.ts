import { PlayerType, NPCType, CharacterType, Race } from '../types'
import playerImage from '../assets/main_player_demo.png';
import npcImage from '../assets/goblin-banker.png';

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
    image: playerImage,
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
    image: npcImage,
}


