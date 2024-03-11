type GameStateProps = {
    time: number;
}
import './game-state.css';

export function GameState({ time} : GameStateProps) {
    return (
        <div className="app__container__game-state">
            <div className={`app__container__game-state__time ${time < 45 && time > 15 ? "low" : ""}${time <= 15 ? "danger" : ""}`}>{time}</div>
            <div className="app__container__game-state__spacer" />
        </div>
    );
}
