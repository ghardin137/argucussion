import { StatType } from './character.ts';

export enum MessageType {
    Question,
    Response,
}

export type Message = {
    id: string;
    parentId?: string;
    type: MessageType;
    primaryStat: StatType;
    text: string;
    response: {
        success: string[];
        failure: string[];
    };
    children: string[];
    strength: number;
}

export type ResponseMessage = Omit<Message, "primaryStat" | "response" | "children">