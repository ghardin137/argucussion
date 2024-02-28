import { Message, MessageType, ResponseMessage, StatType, Conversation } from '../types';

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
}

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
}

const message1b: Message = {
    id: 'message1b',
    parentId: 'message1',
    type: MessageType.Question,
    primaryStat: StatType.Charm,
    text: 'Charm Question',
    response: {
        success: [
            'success1a', 'success1b', 'success1c', 'success1d', 'success1e'
        ],
        failure: [
            'failure1a', 'failure1b', 'failure1c'
        ],
    },
    children: [],
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
}

export const messages: Record<string, Message | ResponseMessage> = {
    message1,
    'success1a': { id: 'success1a', type: MessageType.Response, text: "Barely Successful Intuition" },
    'success1b': { id: 'success1b', type: MessageType.Response, text: "Kinda Successful Intuition" },
    'success1c': { id: 'success1c', type: MessageType.Response, text: "Successful Intuition" },
    'success1d': { id: 'success1d', type: MessageType.Response, text: "Decently Successful Intuition" },
    'success1e': { id: 'success1e', type: MessageType.Response, text: "Very Successful Intuition" },
    'failure1a': { id: 'failure1a', type: MessageType.Response, text: "Barely Failed Intuition" },
    'failure1b': { id: 'failure1b', type: MessageType.Response, text: "Failed Intuition" },
    'failure1c': { id: 'failure1c', type: MessageType.Response, text: "Very Failed Intuition" },
    message1a,
    message1b,
    message2,
    "success2a": { id: 'success2a', type: MessageType.Response, text: "Barely Successful Wit" },
    "success2b": { id: 'success2b', type: MessageType.Response, text: "Kinda Successful Wit" },
    "success2c": { id: 'success2c', type: MessageType.Response, text: "Successful Wit" },
    "success2d": { id: 'success2d', type: MessageType.Response, text: "Decently Successful Wit" },
    "success2e": { id: 'success2e', type: MessageType.Response, text: "Very Successful Wit" },
    'failure2a': { id: 'failure2a', type: MessageType.Response, text: "Barely Failed Wit" },
    'failure2b': { id: 'failure2b', type: MessageType.Response, text: "Failed Wit" },
    'failure2c': { id: 'failure2c', type: MessageType.Response, text: "Very Failed Wit" },
}

export const conversation: Conversation = {
    id: "conv1",
    successMessage: { id: 'win', type: MessageType.Response, text: "I'll tell ya what you wanna know copper" },
    failMessage: { id: 'lose', type: MessageType.Response, text: "I ain't talkin!" },
    questions: [
        "message1",
        "message2",
    ]
}
