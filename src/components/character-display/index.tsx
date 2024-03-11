import { useState } from 'react';
import { Character } from '../../types';
import './character-display.css';

export function CharacterDisplay({ character, className }: { character: Character, className: string }) {
    const [showStats, setShowStats] = useState(false);

    return <div className={`character-display ${className}`}>
        <h2 onMouseOver={() => setShowStats(true)} onMouseOut={() => setShowStats(false)}>{character.name}</h2>
        <div className="character-display__health-bar">
            <div className="character-display__health-bar__full" style={{ flexGrow: character.health }}/>
            <div className="character-display__health-bar__empty" style={{ flexGrow: character.maxHealth - character.health }}/>
        </div>
        {showStats &&
            <ul className="character-display__character-stats">
                <li className="character-display__character-stat">Charm: {character.charm}</li>
                <li className="character-display__character-stat">Imagery: {character.imagery}</li>
                <li className="character-display__character-stat">Insight: {character.insight}</li>
                <li className="character-display__character-stat">Intuition: {character.intuition}</li>
                <li className="character-display__character-stat">Observation: {character.observation}</li>
                <li className="character-display__character-stat">Wit: {character.wit}</li>
            </ul>
        }
    </div>
}

