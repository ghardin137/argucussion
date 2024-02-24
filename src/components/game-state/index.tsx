type GameStateProps = {
    time: number;
}
import './game-state.css';

export function GameState({ time} : GameStateProps) {
    return (
        <div className="app__container__game-state">
            <div className="app__container__game-state__time">{time}</div>
            <div className="app__container__game-state__spacer" />
        </div>
    );
}
