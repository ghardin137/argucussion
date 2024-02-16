import { Character } from '../../types';
import './character-display.css';

export function CharacterDisplay({ player, className }: {player: Character, className: string }) {
    return <div className={`character-display ${className}`}>
        <h2>{player.name}</h2>
        <ul className="app__container__character">
            <li className="app__container__character-health">Health: {player.health}</li>
            <li className="app__container__character-stat">Charm: {player.charm}</li>
            <li className="app__container__character-stat">Imagery: {player.imagery}</li>
            <li className="app__container__character-stat">Insight: {player.insight}</li>
            <li className="app__container__character-stat">Intuition: {player.intuition}</li>
            <li className="app__container__character-stat">Observation: {player.observation}</li>
            <li className="app__container__character-stat">Wit: {player.wit}</li>
        </ul>
    </div>
}

