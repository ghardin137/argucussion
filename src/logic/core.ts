import { Player, NPC, GiantNPC, messages, Stats, conversation } from '../data';
import { Character, Message, ResponseMessage, MessageType } from '../types';


export type CoreState = {
    player: Character;
    npc: Character;
    playerQuestions: Message[];
    npcResponse?: ResponseMessage;
    selectedMessage: string;
    gameState?: "win" | "lose";
    time: number;
    started: boolean;
}

export const initialState: CoreState = {
    player: Player,
    npc: Math.round(Math.random()) ? NPC : GiantNPC,
    playerQuestions: conversation.questions.map((id) => messages[id] as Message),
    selectedMessage: '',
    npcResponse: { id: 'start', type: MessageType.Response, text: "Can I help you?" },
    gameState: undefined,
    time: 99,
    started: false,
}

enum ActionType {
    CHANGE_TIME = "CHANGE_TIME",
    QUESTION_CHOSEN = "QUESTION_CHOSEN",
    RESET_GAME = "RESET_GAME",
    START_GAME = "START_GAME",
}

type Action = { type: ActionType.CHANGE_TIME } | { type: ActionType.QUESTION_CHOSEN, payload: { id: string } } | { type: ActionType.RESET_GAME } | { type: ActionType.START_GAME };

const statModifier = (stat: number) => {
    return Math.floor((stat - 5) / 2);
}

const determineHit = (state: CoreState, id: string) => {
    const message = messages[id] as Message;
    const { primaryStat } = message;
    const counterStat = Stats[primaryStat].counter;
    const playerStat = state.player[primaryStat];
    const npcStat = state.npc[counterStat];
    const playerRoll = Math.ceil(Math.random() * 20) + statModifier(playerStat);
    const npcRoll = Math.ceil(Math.random() * 20) + statModifier(npcStat);
    return playerRoll > npcRoll;
}

const damageModifier = (stat: number) => {
    return Math.floor(Math.pow((stat / 3), 2));
}

const determineHitStrength = (state: CoreState, hit: boolean, id: string) => {
    const message = messages[id] as Message;
    const { primaryStat } = message;
    const counterStat = Stats[primaryStat].counter;
    const playerStat = state.player[primaryStat];
    const npcStat = state.npc[counterStat];

    let strength = Math.round(Math.random() * npcStat) + damageModifier(npcStat);

    if (hit) {
        strength = Math.round(Math.random() * playerStat) + damageModifier(playerStat);
    }

    return strength;
}

const changeTimeReducer = (state: CoreState): CoreState => {
    let gameState: "win" | "lose" | undefined;
    let npcResponse;
    if (state.time - 1 === 0) {
        gameState = state.player.health <= state.npc.health ? 'lose' as const : 'win' as const;
        npcResponse = gameState === 'win' ? conversation.successMessage : conversation.failMessage;
    }
    return {
        ...state,
        time: state.time > 0 ? state.time - 1 : 0,
        gameState,
        npcResponse: npcResponse || state.npcResponse,
    };
}

const resetGameReducer = (): CoreState => {
    return {
        player: Player,
        npc: Math.round(Math.random()) ? NPC : GiantNPC,
        playerQuestions: conversation.questions.map((id) => messages[id] as Message),
        npcResponse: { id: 'start', type: MessageType.Response, text: "Can I help you?" },
        gameState: undefined,
        selectedMessage: '',
        time: 99,
        started: true,
    }
}

const questionChosenReducer = (state: CoreState, id: string): CoreState => {
    const message = messages[id] as Message;
    let order = conversation.questions;

    if (message) {
        order = message.children;
    }

    let playerQuestions = order.map((id) => messages[id] as Message);

    if (!id) {
        const selectedMessage = messages[state.selectedMessage].parentId || '';
        if (selectedMessage) {
            playerQuestions = (messages[selectedMessage] as Message).children.map((id) => messages[id] as Message);
        }
        return {
            ...state,
            playerQuestions,
            selectedMessage,
        };
    }

    const hit = determineHit(state, id);
    const strength = determineHitStrength(state, hit, id);

    let npcResponse;
    let gameState;
    if (hit) {
        npcResponse = messages[message.response.success[Math.floor(Math.random() * message.response.success.length)]] as ResponseMessage;
        const npc = {
            ...state.npc,
            health: state.npc.health - strength > 0 ? state.npc.health - strength : 0,
        };

        if(npc.health <= 0) {
            gameState = "win" as const;
            npcResponse = conversation.successMessage;
        }

        if (order.length === 0) {
            playerQuestions = conversation.questions.map((id) => messages[id] as Message);
        }
        
        return {
            ...state,
            npc,
            playerQuestions,
            npcResponse,
            selectedMessage: id,
            gameState,
        }

    } else {
        npcResponse = messages[message.response.failure[Math.floor(Math.random() * message.response.failure.length)]] as ResponseMessage;
        const player = {
            ...state.player,
            health: state.player.health - strength > 0 ? state.player.health - strength : 0,
        };
        if(player.health <= 0) {
            gameState = "lose" as const;
            npcResponse = conversation.failMessage;
        }
        return {
            ...state,
            player,
            npcResponse,
            gameState,
        }
    }
}

const startGameReducer = (state: CoreState) => {
    return {...state, started: true };
}


export const coreReducer = (state: CoreState, action: Action): CoreState => {
    switch (action.type) {
        case ActionType.CHANGE_TIME:
            return changeTimeReducer(state);

        case ActionType.QUESTION_CHOSEN:
            return questionChosenReducer(state, action.payload.id);

        case ActionType.RESET_GAME:
            return resetGameReducer();

        case ActionType.START_GAME: 
            return startGameReducer(state);

        default:
            return state;
    }
}

export const ChangeTimeAction = () => {
    return { type: ActionType.CHANGE_TIME as const };
}

export const QuestionChosenAction = (id: string) => {
    return { type: ActionType.QUESTION_CHOSEN as const, payload: { id } };
}

export const ResetGameAction = () => {
    return { type: ActionType.RESET_GAME as const };
}

export const StartGameAction = () => {
    return { type: ActionType.START_GAME as const };
}