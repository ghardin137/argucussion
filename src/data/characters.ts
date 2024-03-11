import { PlayerType, NPCType, CharacterType, Race } from '../types'
import playerImage from '../assets/main_player_demo.png';
import npcImage from '../assets/goblin-banker.png';
import orcImage from '../assets/orc_blacksmith.png';

export function generateModifier() { 
    let modifier = 0;
    const percentage = Math.round(Math.random() * 100);
    if(percentage < 3) {
        modifier = -2;
    } else if(percentage >= 3 && percentage < 16) {
        modifier = -1;
    } else if(percentage >= 84 && percentage < 98) {
        modifier = 1;
    } else if(percentage >= 98) {
        modifier = 2;
    }
    return modifier;
}

export const Player: PlayerType = {
    name: "Player",
    type: CharacterType.Player,
    race: Race.Human,
    charm: 5 + generateModifier(),
    imagery: 5 + generateModifier(),
    insight: 5 + generateModifier(),
    intuition: 5 + generateModifier(),
    observation: 5 + generateModifier(),
    wit: 5 + generateModifier(),
    health: 100,
    maxHealth: 100,
    image: playerImage,
}

export const NPC: NPCType = {
    name: "NPC",
    type: CharacterType.NPC,
    race: Race.Goblin,
    charm: 3 + generateModifier(),
    imagery: 5 + generateModifier(),
    insight: 8 + generateModifier(),
    intuition: 8 + generateModifier(),
    observation: 7 + generateModifier(),
    wit: 5 + generateModifier(),
    health: 100,
    maxHealth: 100,
    image: npcImage,
}

export const GiantNPC: NPCType = {
    name: "NPC",
    type: CharacterType.NPC,
    race: Race.Giant,
    charm: 3 + generateModifier(),
    imagery: 6 + generateModifier(),
    insight: 5 + generateModifier(),
    intuition: 6 + generateModifier(),
    observation: 8 + generateModifier(),
    wit: 4 + generateModifier(),
    health: 60,
    maxHealth: 60,
    image: orcImage,
}


