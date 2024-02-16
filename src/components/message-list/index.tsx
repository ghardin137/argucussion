import { Message } from '../../types';
import './message-list.css';

type MessageListProps = { 
    messages: Message[]; 
    chooseMessage: (id: string) => void;
    selectedMessage: string; 
    showBack?: boolean;
    className: string; 
}

export function MessageList({ messages, chooseMessage, selectedMessage, showBack = true, className }: MessageListProps) {
    return <ul className={`app__container__messages ${className}`}>
        {messages.map(message => (
            <li key={message.id} onClick={() => chooseMessage(message.id)} className={`app__container__messages_message ${selectedMessage === message.id ? 'app__container__messages_message-selected' : ''}`}>
                {message.text} {message.primaryStat && '(' + message.primaryStat?.slice(0, 1).toUpperCase() + message.primaryStat?.slice(1) + ')'}
            </li>
        ))}
        {!!selectedMessage && showBack && (
            <li onClick={() => chooseMessage('')} className={`app__container__messages_message`}>
                &laquo; Back
            </li>
        )}
    </ul>
}