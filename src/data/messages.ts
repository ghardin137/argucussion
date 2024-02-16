import { Message, MessageType, ResponseMessage, StatType } from '../types';

const message1a: Message = {
    id: 'message1a',
    parentId: 'message1',
    type: MessageType.Question,
    primaryStat: StatType.Intuition,
    text: 'Intuition Question',
    response: {
        success: [
            'success1a', 'success1b', 'success1c', 'success1d', 'success1e'
        ],
        failure: [
            'failure1a', 'failure1b', 'failure1c'
        ],
    },
    children: [],
    strength: 30,
}

const message1b: Message = {
    id: 'message1a',
    parentId: 'message1',
    type: MessageType.Question,
    primaryStat: StatType.Intuition,
    text: 'Intuition Question',
    response: {
        success: [
            'success1a', 'success1b', 'success1c', 'success1d', 'success1e'
        ],
        failure: [
            'failure1a', 'failure1b', 'failure1c'
        ],
    },
    children: [],
    strength: 7,
}

const message1: Message = {
    id: 'message1',
    type: MessageType.Question,
    primaryStat: StatType.Intuition,
    text: 'Intuition Question',
    response: {
        success: [
            'success1a', 'success1b', 'success1c', 'success1d', 'success1e'
        ],
        failure: [
            'failure1a', 'failure1b', 'failure1c'
        ],
    },
    children: [
        'message1a', 'message1b'
    ],
    strength: 6,
}

const message2: Message = {
    id: 'message2',
    type: MessageType.Question,
    primaryStat: StatType.Wit,
    text: 'Wit Question',
    response: {
        success: [
            "success2a",
            "success2b",
            "success2c",
            "success2d",
            "success2e",
        ],
        failure: [
            'failure2a',
            'failure2b',
            'failure2c',
        ],
    },
    children: [],
    strength: 8,
}

export const messages: Record<string, Message | ResponseMessage> = {
    message1,
    'success1a': { id: 'success1a', type: MessageType.Response, text: "Barely Successful Intuition", strength: 1 },
    'success1b': { id: 'success1b', type: MessageType.Response, text: "Kinda Successful Intuition", strength: 2 },
    'success1c': { id: 'success1c', type: MessageType.Response, text: "Successful Intuition", strength: 3 },
    'success1d': { id: 'success1d', type: MessageType.Response, text: "Decently Successful Intuition", strength: 4 },
    'success1e': { id: 'success1e', type: MessageType.Response, text: "Very Successful Intuition", strength: 5 },
    'failure1a': { id: 'failure1a', type: MessageType.Response, text: "Barely Failed Intuition", strength: 1 },
    'failure1b': { id: 'failure1b', type: MessageType.Response, text: "Failed Intuition", strength: 3 },
    'failure1c': { id: 'failure1c', type: MessageType.Response, text: "Very Failed Intuition", strength: 5 },
    message1a,
    message1b,
    message2,
    "success2a": { id: 'success2a', type: MessageType.Response, text: "Barely Successful Wit", strength: 1 },
    "success2b": { id: 'success2b', type: MessageType.Response, text: "Kinda Successful Wit", strength: 2 },
    "success2c": { id: 'success2c', type: MessageType.Response, text: "Successful Wit", strength: 3 },
    "success2d": { id: 'success2d', type: MessageType.Response, text: "Decently Successful Wit", strength: 4 },
    "success2e": { id: 'success2e', type: MessageType.Response, text: "Very Successful Wit", strength: 5 },
    'failure2a': { id: 'failure2a', type: MessageType.Response, text: "Barely Failed Wit", strength: 1 },
    'failure2b': { id: 'failure2b', type: MessageType.Response, text: "Failed Wit", strength: 3 },
    'failure2c': { id: 'failure2c', type: MessageType.Response, text: "Very Failed Wit", strength: 5 },
}

export const messageOrder: string[] = [
    "message1",
    "message2",
]

